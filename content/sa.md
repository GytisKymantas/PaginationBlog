---
title: 'How to Upload Files to Google Drive with a Service Account'
date: '2022-04-04'
slug: '/google-api-service-account-220404'
category: 'Code'
description: 'This tutorial explains how you can connect to Google Drive or any other Google API from a service account without user authentication.'
tags:
  - 'Google Drive'
  - 'Javascript'
  - 'Archives'
---

This step by step guide will guide you on how to upload files to Google Drive with a service account using `Node.js`. For this example, we have a folder on your local hard drive containing multiple files and we are required to upload these files to a specific folder in Google Drive.

## 1. Create a Google Cloud Project

Go to `cloud.google.com` and create a new Google Cloud project. Give your project a name, change the project ID and click the `Create` button.

## 2. Enable Google APIs

Choose `APIs & Services` from the left menu and click on `Enable APIs and Services` to enable the various Google APIs. If you planning to upload files to Google Drive then you will need to enable Drive API. If you wish to use the Google Cloud Storage API then you will need to enable Storage API.

## 3. Create a Service Account

In the `APIs & Services` section, click on `Credentials` and click on `Create credentials` to create a service account.

### 3a. Describe the Service Account

Give your service account a name and a service account ID. This is like an email address and will be used to identify your service account in the future. Click `Done` to finish creating the service account.

### 3b. Create a Key File

In the Cloud Console, go to IAM and Admin > Service accounts page. Click the email address of the service account that you want to create a key for. Click the `Keys` tab. Click the `Add key` drop-down menu, then select `Create new key`.

Select `JSON` as the Key type and then click Create. This will download a JSON file that will contain your private key. Do not commit this file to the Github repository.

## 4. Share a Drive Folder

For this example, we are looking to upload files from a local folder to a specific folder in Google Drive.

Go to your Google Drive and create a new folder. Right-click the folder, choose Share and add the email address of the service account you created in step 3 as an editor to this folder.

Thus your Node.js application will be able to access this folder and upload files to it. The application will not have access to any other resources on your Google Drive.

> Tip: If you are working with the Google Calendar API, you can also share the Google calendar with the service account to have read and write access to the calendar events.

## 5. Configure Node.js App

Now that the service account is setup, we need to setup a Node.js app that will upload files to Google Drive. We will run this app from the command line but you can also convert it to a web app with Google Cloud Run and Docker.

### 5a. Create an Authorized OAuth2 Client

Replace `service.json` with the name of your service account key file that you created in step 3b.

```js
// service.js
const { google } = require('googleapis');
const path = require('path');

const getDriveService = () => {
  const KEYFILEPATH = path.join(__dirname, 'service.json');
  const SCOPES = ['https://www.googleapis.com/auth/drive'];

  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });
  const driveService = google.drive({ version: 'v3', auth });
  return driveService;
};

module.exports = getDriveService;
```

### 5b. Write File Uploader

Replace parent folder with the folder ID of the Google Drive folder you want to upload to. After the file is uploaded, we'll move the local file to trash as well.

```js
// upload.js
const fs = require('fs');
const getInvoiceFolder = require('./folder');
const drive = require('./service');

const uploadSingleFile = async (fileName, filePath) => {
  const folderId = 'DRIVE_FOLDER_ID';
  const { data: { id, name } = {} } = await drive.files.create({
    resource: {
      name: fileName,
      parents: [folderId],
    },
    media: {
      mimeType: 'application/pdf',
      body: fs.createReadStream(filePath),
    },
    fields: 'id,name',
  });
  console.log('File Uploaded', name, id);
};

const scanFolderForFiles = async (folderPath) => {
  const folder = await fs.promises.opendir(folderPath);
  for await (const dirent of folder) {
    if (dirent.isFile() && dirent.name.endsWith('.pdf')) {
      await uploadSingleFile(dirent.name, path.join(folderPath, dirent.name));
      await fs.promises.rm(filePath);
    }
  }
};

module.exports = scanFolderForFiles;
```

## 6. Run File Uploader

Now that everything is setup, create an `index.js` file and run the `node index.js` command to upload files to Google Drive.

```js
// index.js
const scanFolderForFiles = require('./scan');

scanFolderForFiles('local-folder').then(() => {
  console.log('🔥 All files have been uploaded to Google Drive successfully!');
});
```

> You may consider using the `https://www.googleapis.com/auth/drive.file` scope instead of the much broader `https://www.googleapis.com/auth/drive` scope. In that case, the initial parent folder should also be created with the same app else it will not have permission to write to the folder.
