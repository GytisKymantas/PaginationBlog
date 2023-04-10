---
title: 'Automating the Creation of Multiple Folders in Google Drive'
date: '2023-03-27'
slug: '/create-bulk-folders-230327'
category: 'Internet'
description: 'Effortlessly create multiple folders in Google Drive for your classroom students with Apps Script'
tags:
  - 'Google Drive'
  - 'Google Apps Script'
  - 'Archives'
---

A teacher may want to create folders in Google Drive for each of their students and share those folders with the students. This can be a tedious task if you have a large number of students but there's a way to automate the process - you may either use an add-on or write an Apps Script to generate the folder structure.

### Prepare the Students' Data in Google Sheets

We've prepared a Google Sheet with the names of students, their corresponding classes and email addresses. The first row of the sheet displays the column titles, while the student data starts from row two onwards.

The folder structure in Google Drive would be as follows - the parent folder would have sub-folders for each class and each class folder would have sub-folders for each student. The student folders would be shared with the student's email addresses where students can upload their work.

### Bulk Create Folders in Google Drive

Install the [Document Studio](https://workspace.google.com/marketplace/app/document_studio/429444628321) add-on for Google Sheets. Open the spreadsheet with the student data and click on Extensions > Document Studio > Open to launch the add-on.

Create a new workflow inside Document studio, give it a descriptive name like `Create Student Folders` and click on the `Continue` button to add a task.

Choose the `Google Drive` task and then select `Create Folder` from the dropdown menu. Next, select the parent folder in Google Drive where the student folders should be created. You may even [create folders](https://digitalinspiration.com/docs/document-studio/apps/google-drive) inside Shared Drives

For the `Subfolder Name` field, select the column in the spreadsheet that contains the student names and their class names. Enclose the column titles within double curly braces and they are replaced with the actual values from the spreadsheet.

You can put the `{{Email Address}}` column in the `Editors` field to share the student folders with their email addresses automatically when the folder is created in Google Drive.

Now that workflow is ready, choose the `Save and Run` option to create the folders in Google Drive. The folders would be created and a link to the folder would be placed in the spreadsheet itself. If a folder already exists, the link to the existing folder is placed in the spreadsheet.

### Create Multiple Folders in Google Drive in Apps Script

If you prefer to write code, you can use the following Apps Script to create folders in Google Drive for students and share those folders with their email addresses based on data from a Google Sheet.

Go to Google Sheets, and choose Extensions > Apps Script to open the script editor. Create a new script and add the following code:

A. Create a folder in Google Drive only if it doesn't already exist.

```js
function createFolderIfNotExists(folderName, parentFolder) {
  const folders = parentFolder.getFoldersByName(folderName);
  return folders.hasNext() ? folders.next() : parentFolder.createFolder(folderName);
}
```

B. Get the student data from the spreadsheet and return an array of objects with the student data.

```js
function getStudentData(sheet) {
  const [header, ...rows] = sheet.getDataRange().getDisplayValues();
  return rows.map((row, rowIndex) => {
    const student = {};
    row.forEach((cell, i) => {
      student[header[i]] = cell;
    });
    return { ...student, rowIndex: rowIndex + 2 };
  });
}
```

C. Create the folders in Google Drive and share them with the students.

```js
function createStudentFoldersInGoogleDrive() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const studentData = getStudentData(sheet);
  const rootFolder = DriveApp.getRootFolder();
  const parentFolder = createFolderIfNotExists('Classroom', rootFolder);
  for (let i = 0; i < studentData.length; i++) {
    const student = studentData[i];
    const classFolder = createFolderIfNotExists(student['Class'], parentFolder);
    const studentFolder = createFolderIfNotExists(student['Student Name'], classFolder);
    studentFolder.addEditor(student['Email Address']);
    const folderUrl = studentFolder.getUrl();
    sheet.getRange(student['rowIndex'], 5).setValue(folderUrl);
  }
  SpreadsheetApp.flush();
}
```

You may want to change the column titles and indices in the code to match the ones in your data spreadsheet. Also, you may want to use the Advanced Drive API service to create folders in Shared Drive.

Also see: [Create Folders in Google Drive for Google Form responses](https://digitalinspiration.com/docs/document-studio/google-forms/create-folder-in-google-drive)
