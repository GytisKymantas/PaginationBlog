---
title: 'How to Auto-Download Podcasts to Google Drive with Google Sheets'
date: '2022-05-03'
slug: '/auto-download-podcasts-google-drive-220503'
category: 'Internet'
description: 'You use Google Sheets as your own Podcast Manager that will automatically download your favorite podcasts to Google Drive and instantly sync across all your devices.'
tags:
  - 'Google Drive'
  - 'Google Sheets'
  - 'Google Apps Script'
  - 'Podcasts'
  - 'Archives'
---

This tutorial describes how you can use Google Sheets to build your own podcast manager. You can specify a list of your favorite podcast shows in Google Sheets and it will automatically download new episodes to your Google Drive in neatly organized folders.

The setup is very simple, the app is completely open-source and you need no programming language.

## How the Drive Podcast Manager Works?

You have to place the links of your favorite podcasts in column A of the Google Sheet as shown in the screenshot below.

The app will automatically download the latest episodes of each podcast to your Google Drive. You can open the MP3 files from your Google Drive or find them directly inside the same Google Sheet.

The app will create a new folder, titled `Podcasts` in your Google Drive. Inside this folder, it will create sub-folders for each podcast show with the folder name same as the title of the podcast.

## Download Podcasts to Google Drive

Here's how you can build your own podcast manager with Google Sheets and Google Drive.

1. [Click here](https://docs.google.com/spreadsheets/d/1AHS6LBRjudNtWi7SviaGuA2aFUIDchRCCPlcyg4j47U/copy) to make a copy of the Google Sheet in your Google account.

2. Open the copied spreadsheet, switch to the `Subscriptions` sheet and enter the RSS feed links of your favorite podcasts in column A. You may use our [Apple Podcasts Lookup](/podcast/) utility to find the RSS feed of any podcast that is listed on Apple Podcasts.

3. Go to the Extensions menu and choose `Script Editor` to open the underlying Google Apps Script file.

4. Choose the `Install` function from the list of functions and click `Run` to install the app. You may have to authorize the app once since it needs permission to [save files to Google Drive](https://digitalinspiration.com/product/save-gmail-to-google-drive/) on your behalf.

That's it. The app will create a cron job that runs every few hours in the background and download the latest episodes of your favorite podcasts to your Google Drive.

We even have a built-in [MP3 player](/play-mp3-google-sheets-220504) embedded inside Google Sheets that will play the latest episode of each podcast when you click the `Play` button.

### The Technical Details

If you are curious to know how the whole thing works, here're the technical details.

The app uses the Spreadsheet API to read the list of podcasts from the Google Sheets. It then uses the XML service of Apps Script to [parse the RSS feed](/code/19733-parse-xml-rss-feeds-google-scripts) and extract new podcast episodes that have been published since the last check.

All podcast RSS feeds are required to have an `<item>` tag with a `<enclosure>` tag inside. The `<enclosure>` tag contains the URL of the MP3 file and this is what the app uses to get the download URL of the corresponding episode.

```js
const parseRSS = (xmlUrl, lastUpdatedTime) => {
  const feed = UrlFetchApp.fetch(xmlUrl).getContentText();
  const doc = XmlService.parse(feed);
  const root = doc.getRootElement();
  const channel = root.getChild('channel');
  const episodes = channel
    .getChildren('item')
    .map((item) => ({
      date: new Date(item.getChildText('pubDate')),
      title: item.getChildText('title'),
      enclosure: item.getChild('enclosure')?.getAttribute('url')?.getValue(),
    }))
    .filter(({ date }) => date > lastUpdatedTime)
    .filter(({ enclosure }) => enclosure);
  return { title: channel.getChildText('title'), episodes };
};
```

Once the app has a list of new episodes, it uses the [UrlFetch service](/urlfetch/) to download the podcasts and saves them to Google Drive in a folder specific to the podcast show.

The app then writes a new row to the Google Sheet with the link of the Google Drive file and a timestamp of when the episode was downloaded.

```js
const getPodcastFolder = (folderName) => {
  const parentFolder = DriveApp.getFoldersByName('Podcasts').next();
  const folders = parentFolder.getFoldersByName(folderName);
  if (folders.hasNext()) return folders.next();
  return parentFolder.createFolder(folderName);
};

const downloadPodcast = (podcastTitle, episodeUrl, episodeTitle) => {
  try {
    const blob = UrlFetchApp.fetch(episodeUrl).getBlob();
    const folder = getPodcastFolder(podcastTitle);
    const file = folder.createFile(blob);
    SpreadsheetApp.getActiveSheet().appendRow([
      new Date(),
      `=HYPERLINK("${episodeUrl}";"${episodeTitle}")`,
      `https://drive.google.com/file/d/${file.getId()}/view`,
    ]);
  } catch (f) {
    console.error(f);
  }
};
```
