---
title: 'This YouTube Video Has n Views - How the Video Title Updates Itself'
date: '2020-08-18'
slug: '/update-youtube-title-200818'
category: 'Internet'
description: 'How to automatically update the title of your YouTube video to accurately reflect the views and comment count in the title.'
tags:
  - 'YouTube'
  - 'Google Apps Script'
  - 'Archives'
---

If I were to pick a YouTube video with the most accurate and most up-to-date title, this [video](https://www.youtube.com/watch?v=BxV14h0kFs0) by Tom Scott will probably take the top spot. The title of the video says "This video has n views' and this title updates automatically as the number of views change over time.

Little wonder, the world of YouTube is fascinated with this "magic" title and the video has garnered over 20 million views so far.

If you are left wondering how this is done, here's the secret sauce - the YouTube API. We create a background cron job that runs, say, every 5 minutes and gets the current number of views for the specified video. If the number of views has increased since the last run, we update the video title with, you got it right, the YouTube API.

### Make your own "This Video has n Views" title

Like to build something similar for a video on your own YouTube channel? Well, there's always [Google Apps Script](/topic/google-apps-script) to the rescue.

1. Make a copy of this [Google Script](https://script.google.com/d/1BdIVA7grLIpTCndhAM1wRV7bD1Ix8X5WvIWD1nT1A99jrcxW3ZEwPw4C/edit?newcopy=true) in your Google Drive.

2. Replace `<<VIDEO ID>>` with the video id of the YouTube video that you would like to use for this experiment. If the video URL is `youtube.com/watch?v=abc`, the video id is `abc`.

3. Go to the Run menu inside the Apps Script editor, choose Run and select `updateYouTubeVideo`. Allow the script to manage your YouTube account and that's it.

The script will run every five minutes and update the title of your YouTube video auto-magically. Simple!

```javascript
const updateYouTubeVideo = (e = null) => {
  const id = '<<VIDEO ID>>';
  const template = 'This video has VIEWCOUNT views and COMMENTCOUNT comments';

  // The cron job is created only when the script is run manually
  if (e === null) {
    const triggerName = 'updateYouTubeVideo';
    const triggers = ScriptApp.getProjectTriggers().filter((trigger) => {
      return trigger.getHandlerFunction() === triggerName;
    });

    // If time based trigger doesn't exist, create one that runs every 5 minutes
    if (triggers.length === 0) {
      ScriptApp.newTrigger(triggerName).timeBased().everyMinutes(5).create();
    }
  }

  // Get the watch statistics of the video
  const { items: [video = {}] = [] } = YouTube.Videos.list('snippet,statistics', { id });

  // Parse the YouTube API response to get views and comment count
  const {
    snippet: { title: oldTitle, categoryId } = {},
    statistics: { viewCount, commentCount } = {},
  } = video;

  if (viewCount && commentCount) {
    const newTitle = template.replace('VIEWCOUNT', viewCount).replace('COMMENTCOUNT', commentCount);

    // If the video title has not changed, skip this step
    if (oldTitle !== newTitle) {
      YouTube.Videos.update({ id, snippet: { title: newTitle, categoryId } }, 'snippet');
    }
  }
};
```

### How to Stop the YouTube Google Script

Go to script.google.com and search for the YouTube script in the My Projects dashboard. Go to the triggers menu and remove the trigger. The script will stop updating the video title in the background.

You can also find this Google Script on my [Github page](https://github.com/labnol/code/tree/master/google-apps-script/youtube-views).
