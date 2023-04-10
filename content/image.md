---
title: 'How to Embed Images from Google Drive on your Website'
date: '2022-05-15'
slug: '/google-drive-image-hosting-220515'
category: 'Internet'
description: 'This tutorial describes how you can display images stored in your Google Drive on your website or emails. All image files on Drive have a high-resolution thumbnail that you can embed into any webpage.'
tags:
  - 'Google Drive'
  - 'Archives'
---

Looking for a place to host images so you can embed them on to your website? The most popular image hosting services are `imgur.com` and `imgbb.com` but did you know that you can also use Google Drive to host images.

It works something like this. You upload an image file to Google Drive and make that file public. Google Drive will now generate a high-resolution thumbnail image of the uploaded file that you can directly embed on your website or emails.

## Generate Google Drive Image Links

### 1. Share File

Go to Google Drive and upload the image that you wish to embed in your website. Next, right-click the image and choose `Get link` to get the shareable link of the uploaded file.

### 2. Change Permissions

Inside the share dialog, choose the permissions drop-down and select `Anyone with a link`. This will make the file visible to anyone on the internet who has access to the share link. The file will be available to even users who do not have a Google account.

Click the `Copy link` button to copy the file's link to your clipboard.

### 3. Generate Link

Next, open the [Google Drive Embed](/embed/google/drive/) page and paste the file link in the input text box. Click the `Generate` button to grab the direct link of the image that you can place in your website or emails.

## How Drive Image Links are Generated

Internally, the tool takes the public link of the image on your Google Drive and grabs the [Open Graph image](/create-open-graph-images-220131) from the HTML. It then changes the `s` parameter of the OG image to switch to a high resolution thumbnail. It is a similar technique that we use to get direct links for [Google Drive photos](/embed/google/photos).

## Alternate Approach

If you prefer mangling URLs on your own, here's an alternate approach that will help you generate direct links for your drive images.

Make the image file in your Google Drive public as described earlier and grab the file link of the public image. The URL will be something like this:

```html
https://drive.google.com/file/d/13XE4Ah1aK5kSGniMbeard9DJ1iuroR_K/view
```

The part `13XE4Ah1aK5kSGniMbeard9DJ1iuroR_K` in the Google Drive link is the unique ID of the file. Take that File ID and replace it in the URL below:

```html
<img src="https://drive.google.com/uc?id=DRIVE_FILE_ID" alt="Google Drive Image" />
```

You can use this link to easily [embed images into Google Sheets](/internet/images-in-google-spreadsheet/18167/). The only downside of this approach is that you do not have control over the size of the image that is generated. In the previous example, you can easily change the width parameter to generate images of any specific size.

Also see: [Google Drive URL Tricks](/internet/direct-links-for-google-drive/28356/)
