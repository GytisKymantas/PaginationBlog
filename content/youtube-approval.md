---
title: 'How to Request Additional Quota for your YouTube API Project'
date: '2020-10-16'
slug: '/youtube-quota-request-201016'
category: 'Code'
description: 'How to calculate your YouTube API quota cost and request Google to increase the Quota Limits of your YouTube application.'
tags:
  - 'YouTube'
  - 'Google Apps Script'
---

A UK based organization recently organized an online conference with 300+ participants and each of the attendees were asked to upload a video to a common YouTube channel post the event. The organizers created a [YouTube uploader](/internet/youtube-uploader/29161/) to make it easy for attendees to submit videos but soon ran into the quota issue with YouTube.

Let me explain.

The YouTube API website says that **1600 quota units** are required to upload a single video to the YouTube website through the `videos.insert` method of the YouTube API. Thus, for instance, if you are expecting users to upload 100 videos to your YouTube channel in a single day, your Google Cloud project should have a quota of at least `1600 * 100 = 160,000` units.

The quota limits reset every 24 hours. New Google Cloud projects have lower quota and you'll have to request YouTube to increase your quota if you are expecting higher number of videos.

## Increase your YouTube API Quota

Here's step by step guide that will help you get your [YouTube video uploader](https://digitalinspiration.com/product/youtube-video-uploader), or any other Google Apps Project, approved for higher quota.

### Configure Google Cloud Project

**1.** Go to [console.cloud.google.com/projectcreate](https://console.cloud.google.com/projectcreate) to create a new Google Cloud Project.

**2.** From the menu, go to `APIs and Services` and chose `OAuth Consent Screen`. Set the type as `External` and click the `Create` button.

**3.** Give your application a name, then click the `Add Scope` button and specify the list of OAuth Scopes that your Google Cloud project will require. For the uploader, we require the following Google APIs:

```html
https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.upload
https://www.googleapis.com/auth/script.external_request
https://www.googleapis.com/auth/script.send_mail https://www.googleapis.com/auth/userinfo.email
```

**4.** Inside the `API and Services` section, choose Library, search for the YouTube Data API library and click `Enable` to enable the library for your project.

**5.** Click the 3-dot menu in the upper right, choose Project Settings and make a note of the project number of your Google Cloud Project.

### Configure Google Apps Script

**1.** Open your Google Script, go to the Resources menu, choose Cloud Platform project and enter the project number that you have copied in the previous step.

Click the "Set Project" button to link your Google Cloud Project to your Google Apps Script Project.

**2.** Go back to the Google Cloud project, click the `API and Services` section, choose Credentials and copy the OAuth client ID to the clipboard.

### Request YouTube to Increase Quota

Now that you have all the necessary data, it is time to submit your YouTube project to Google for increasing your API quota. Open this [request
form](https://support.google.com/youtube/contact/yt_api_form?hl=en) and fill the required details.

The API client is the same as the OAuth Client ID that you copied in the previous step. The project number is the same as your Google Cloud Project number. For the "Where can we find the API client" question, you need to provide the link of your YouTube uploader form.

Submit the form and you'll receive a response from Google Compliance team saying they are conducting an audit.

```html
Thanks for your response to the Quota Request. We will conduct our audit based on the information
you provided. We will notify you if additional information is needed or when we’ve completed our
review. Thank you for your cooperation.
```

They may have some follow-up questions and once they grant the quota (usual takes 3-4 days), you'll receive a confirmation.

```html
Your quota extension request has been approved based on the information you provided and your
representation that your use of YouTube API Service are in full compliance with the YouTube API
Services Terms of Service. The total quota for project 123 is now 500,000 units / day. Please note
that the quota extension has been granted ONLY for the use-case mentioned in your quota extension
request application and we may change your quota based on your actual quota usage as well as on your
continued compliance with the YouTube API Services Terms of Service at any time.
```
