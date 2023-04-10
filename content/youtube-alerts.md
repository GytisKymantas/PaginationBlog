---
title: 'YouTube Email Alerts - Monitor Videos around your favorite Topics'
date: '2020-12-19'
slug: '/youtube-email-alerts-201219'
category: 'Internet'
description: 'Learn how to setup email alerts for YouTube videos and get daily automatically notification when new videos are uploaded that match your search topics.'
tags:
  - 'Google Apps Script'
  - 'YouTube'
  - 'Archives'
---

The Google Alerts service makes it easy for you to monitor brand mentions and your favorite topics on the Internet. Just specify one or more keywords and Google will send an email notification when new web pages matching your search keywords are found on the web.

The YouTube Email Alerts service is similar to Google Alerts but instead of scanning the whole worldwide web, it limits the searches to videos uploaded on the YouTube website. It then sends automatic email notifications when new videos are uploaded on YouTube around your topics of interest.

Here's a sample [email notification](/youtube-email-alerts.pdf) sent by the YouTube Alert system that, in this example, is configured to track new video uploads around three topics - Tesla Model Y, The Queen's Gambit, and Minecraft tutorials.

## Setup YouTube Email Alerts

Here's a step by step guide on how to set up your own YouTube email alert system for monitoring videos around your topics of interest.

1. [Click here](https://script.google.com/d/1fpHox2f1s6OPDj3_9ltF3KULr--hmb6nJ3jWVBiFgITk5mlpQ0Wc8tIM/edit?newcopy=true&source=labnol.org) to make a copy of the YouTube alert script in your Google Account.

2. Inside the Google Script, go to line #12 and update the default configuration. You need to specify the email address where the alerts should arrive, the topic or keywords that you wish to track, and the list of negative words. If a matching video contains any of the negative words, they'll be filtered out of the email notification.

3. Go to the Run menu and choose the `initialize` option. Authorize the Google Script and your email system is deployed instantly. Go to your Gmail sent items and you should see an email alert with the matching videos.

The system is now deployed and it will send one email digest per day with a list of matching videos. The email is sent around 11 AM GMT but you can change this time by updating the value of the `emailAlertHour` property in the configuration.

### How YouTube Email Alerts Work

The alert system is built using the official YouTube API with Google Apps Script. You can find the complete [source code on Github](https://github.com/labnol/code/tree/master/google-apps-script/youtube-alerts).

When you run the `initialize` function, it creates a cron job that will automatically run once per day around the specified hour. It then uses the YouTube API to find all matching videos that have been uploaded on YouTube since the last execution of the script. It takes the 10 most relevant videos and adds them to the notification email.

```js
const fetchYouTubeVideos = (query = 'cats') => {
  const date = new Date();
  date.setDate(date.getDate() - 3);
  const dateFormat = "yyyy-MM-dd'T'HH:mm:ss'Z'";
  const publishedAfter = Utilities.formatDate(date, 'UTC', dateFormat);
  const { items = [] } = YouTube.Search.list(['snippet'], {
    maxResults: 10,
    regionCode: 'US',
    publishedAfter: publishedAfter,
    relevanceLanguage: 'en',
    q: query,
    type: ['video'],
    fields: 'items(id(videoId),snippet(title, channelTitle, channelId))',
  });
  return items.map((item) => {
    const {
      id: { videoId },
      snippet: { title, channelTitle, channelId },
    } = item;
    return { videoId, title, channelTitle, channelId };
  });
};
```

The `preferredLanguage` parameter in the configuration is, by default, set to `en` (English) and instructs YouTube to return videos that are most relevant to the specified language. You can use your two-letter language ISO code (like fr from French or hi for Hindi) here.

Similarly, the `regionCode` parameter (default is US) helps you restrict search results to videos that can be viewed in your country.

Also see: [Google Drive File Monitor](/google-drive-monitor-201026)
