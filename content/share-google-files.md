---
title: 'How to Share Files in Google Drive with Multiple Users'
date: '2021-08-26'
slug: '/code/google-drive-share-files-2108261'
category: 'Code'
tags:
  - 'Google Apps Script'
  - 'Google Drive'
  - 'Archives'
---

The Google Drive API makes it easy to share files and folders with other users programmatically with the help of Apps Script.

For instance, here's a snippet of code that will let you share the file with another Google Account user and provide them edit access to the file. Replace the role from `writer` to `reader` to give them [read-only access](/code/read-only-google-drive-file-201011).

```js
const shareFilesInGoogleDrive = (fileOrFolderId, emailAddress) => {
  Drive.Permissions.insert(
    {
      role: 'writer', // or "reader" or "commenter"
      value: emailAddress,
      type: 'user',
    },
    fileOrFolderId,
    {
      supportsAllDrives: true,
      sendNotificationEmails: true,
    }
  );
};
```

It is recommended that you set the [sendNotifications](/code/20101-share-files-google-drive-without-email-notifications) flag to `true` as it will send an email notification when the file is shared with a user who may not have a Google account.

## Share Files with Multiple Users

A limitation of the Drive API is that you can only share files with one user at a time. Google Apps Script is synchronous - it doesn't support the async/await pattern of JavaScript Promises and you therefore cannot run the code in parallel.

There's however a simple workaround to help you share a file or folder in Google Drive with multiple users in one go in parallel using the [UrlFetchApp](/urlfetch) service.

```js
const shareGoogleDriveFileWithMultipleUsers = () => {
  const fileId = '<Drive File Id>';
  const editors = ['angus@gmail.com', 'kiran@school.edu', 'jacob@corp.com'];

  const API = 'https://www.googleapis.com/drive/v3/files';
  const queryString = 'supportsAllDrives=true&sendNotifications=true';
  const accessToken = ScriptApp.getOAuthToken();

  const requests = editors.map((emailAddress) => ({
    url: `${API}/${fileId}/permissions?${queryString}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    muteHttpExceptions: true,
    payload: JSON.stringify({
      role: 'writer',
      type: 'user',
      emailAddress: emailAddress,
    }),
  }));

  UrlFetchApp.fetchAll(requests);
};
```

In the snippet above, we are directly invoking the Google Drive API (v3) instead of the DriveApp service of App Script. The `fetchAll` allows you make multiple HTTP requests in a single request and returns an array of responses.

Please ensure that the following scopes are added in your `appsscript.json` file:

```
  {
    ...
    "oauthScopes": [
      "https://www.googleapis.com/auth/script.external_request",
      "https://www.googleapis.com/auth/drive",
    ],
   ...
  }
```
