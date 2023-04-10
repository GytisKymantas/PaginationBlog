---
title: 'How to Play YouTube Videos at Custom Speed'
date: '2020-11-24'
slug: '/youtube-custom-speed-201125'
category: 'Internet'
description: 'Learn how to watch any YouTube video at 4x, 8x or any custom playback speed.'
tags:
  - 'YouTube'
  - 'Google Chrome'
  - 'Archives'
---

The settings pane in the YouTube video player lets you quickly change the default playback speed of the current video. You may go as high as 2x that will play the video at twice the normal speed. The lower limit is 0.25 that will slow down the video to one-fourth the original speed.

## Watch YouTube at Custom Speed

YouTube allows you to play videos at 2x the original speed but what if you want to speed up and watch videos at an even higher speed - like 4x or 10x the normal speed?

That's where [Chrome Developer Tools](/software/chrome-dev-tools-tutorial/28131/) can help.

Open any [YouTube video](https://www.youtube.com/watch?v=eoTTbxaPw08) inside Google Chrome and launch the JavaScript console from the Chrome menu bar. Go to the View menu, choose Developer, and select `JavaScript console` from the sub-menu.

Inside the console window, type the following command and it will instantly change the playback speed of the current video to 8x the normal speed.

```js
$('video').playbackRate = 8;
```

If you want to slow down a video, try a value lower than 1 as:

```js
$('video').playbackRate = 0.125;
```

You may set the playback speed to any value between 0.0625 and 16. This is the [allowed range](https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/html/media/html_media_element.h;l=96;drc=766ee21e0edf91981f68067fd070cd322b3a9f40?q=minplayback&ss=chromium%2Fchromium%2Fsrc) of media playback rate in Chrome.

`video: https://www.youtube.com/watch?v=eoTTbxaPw08`

Also see: [Embed Lightweight YouTube Player](/internet/light-youtube-embeds/27941/)
