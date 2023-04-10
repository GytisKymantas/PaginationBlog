---
title: 'How to Play an MP3 File in Google Sheets'
date: '2022-05-04'
slug: '/play-mp3-google-sheets-220504'
category: 'Code'
description: 'This tutorial explains how to embed an audio file in Google Sheets and play the MP3 audio when you click the Play button.'
tags:
  - 'Google Sheets'
  - 'Embed'
  - 'Google Apps Script'
  - 'Archives'
---

You can put the link of any MP3 audio file in Google Sheets but when you click the file link, the audio would not play. You can however add a button in your Google Sheet that, when clicked, will play the MP3 file in a modal window.

Here's a demo:

The audio files are hosted on Google Drive and when the `Play` button is clicked, the app will open a modal window with the audio player.

## Add the Audio Player Button

To get started, create a new Google Sheet, go to the Insert menu and select the `Create a New Drawing` option. Select `Beveled Rectangle` from the list of shapes, add some inline text and click `Save` to insert the button to your active Google Sheet.

## Add the Player Script

Next, inside the Extension menu of Google Sheets, go to Script Editor and paste the following script.

```js
const openAudioPlayer = () => {
  const cell = SpreadsheetApp.getActiveSheet().getActiveCell().getValue();
  const html = `<iframe src="${cell}" width="480" height="180" frameborder="0" scrolling="no"></iframe>`;
  const dialog = HtmlService.createHtmlOutput(html).setTitle('Play').setWidth(500).setHeight(200);
  SpreadsheetApp.getUi().showModelessDialog(dialog, 'Play Audio');
};
```

Switch to the Google Sheet you created, right-click the `Play` button and assign the `openAudioPlayer` script to the button.

Click `OK` to save your changes. Now play the URL of any MP3 file in any Google Sheet cell, click the `Play` button and the audio will play in a modal window.

Please ensure that the cell containing the audio file link is active when you click the `Play` button.

Also, if you are hosting the sound files in your Google Drive, the format of the link should be `https://drive.google.com/file/d/<file-id>/preview`.
