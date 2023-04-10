---
title: 'How to Move Files Uploads from Google Forms to a Specific Folder in Google Drive'
date: '2020-12-26'
slug: '/file-uploads-folder-google-forms-201226'
category: 'Internet'
description: 'Learn how to organize file uploads and attachments from Google Forms and move files to a specific folder in Google Drive.'
tags:
  - 'Google Forms'
  - 'Google Drive'
  - 'Google Apps Script'
  - 'Archives'
---

The [File Upload](/internet/file-upload-google-forms/29170/) feature of Google Forms lets you receive files from form respondents directly in your Google Drive. You may add the File Upload question in your Google Form to receive PDF assignments from students, résumé applications, portfolio images from contestants, and so on.

When a respondent uploads a file through Google Forms, the file are stored in a fixed folder of your Google Drive. All files are uploaded in the same folder and, thus looking at the file in your Google Drive, it is difficult to determine which respondent has uploaded which set of files.

We can however use Google Apps Script with Google Form triggers to instantly organize files in Google Drive as soon as they are uploaded by the form respondent. You can change the destination folder where files are stored or create custom folders based on the form response.

## Organiza File Uploads in Google Drive

In the following example, we will create a parent folder in Google Drive to house all the uploaded files. Each form response will have its own subfolder and all files for that specific form entry will go in the same folder.

### Create Parent Folder

To get started, go to your Google Drive and create a new folder (or use an existing folder). Open the folder and grab the ID of the folder from the browser's address bar as shown in the screenshot.

### Add the Google Script

Next, go to your Google Form that is accepting File Uploads and choose Script Editor from the 3-dot menu.

Inside the script editor, remove all the existing code and copy-paste the following snippet. Remember to replace the Folder Id in line #1 with the Id of the folder that you've created in the previous step.

```js
const PARENT_FOLDER_ID = '<<Folder ID here>>';

const initialize = () => {
  const form = FormApp.getActiveForm();
  ScriptApp.newTrigger('onFormSubmit').forForm(form).onFormSubmit().create();
};

const onFormSubmit = ({ response } = {}) => {
  try {
    // Get a list of all files uploaded with the response
    const files = response
      .getItemResponses()
      // We are only interested in File Upload type of questions
      .filter((itemResponse) => itemResponse.getItem().getType().toString() === 'FILE_UPLOAD')
      .map((itemResponse) => itemResponse.getResponse())
      // The response includes the file ids in an array that we can flatten
      .reduce((a, b) => [...a, ...b], []);

    if (files.length > 0) {
      // Each form response has a unique Id
      const subfolderName = response.getId();
      const parentFolder = DriveApp.getFolderById(PARENT_FOLDER_ID);
      const subfolder = parentFolder.createFolder(subfolderName);
      files.forEach((fileId) => {
        // Move each file into the custom folder
        DriveApp.getFileById(fileId).moveTo(subfolder);
      });
    }
  } catch (f) {
    Logger.log(f);
  }
};
```

Tip: The script can also be enhanced to create custom folder names based on the user's answers in the form response.

### Create OnFormSubmit Trigger

Inside the script editor, select `initialize` from the function drop-down and click the `Run` button to create the `OnFormSubmit` trigger for your current Google Form.

This will essentially run the Apps Script code whenever someone submits a new form entry and upload files to a specific folder in Google Drive.

That's it. Go to your Google Form and submit a new test entry. You should now see all the uploaded files neatly organized in a custom folder under the parent folder. The name of the custom folder is the unique Response Id that Google Forms automatically assigns to every form submission.

PS: You can combine File Uploads in Google Forms with [Document Studio](https://gsuite.google.com/marketplace/app/document_studio/429444628321) to generate customized PDFs (certificates, employee ID cards, etc) from the uploaded images
