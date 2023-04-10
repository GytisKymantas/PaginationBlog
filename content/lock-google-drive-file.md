---
title: 'How to Make your Documents Read-only in Google Drive'
date: '2020-10-11'
slug: '/code/read-only-google-drive-file-201011'
category: 'Code'
description: 'Your documents and files in Google Drive can be modified by anyone who has edit access to the file. Learn how to freeze a document and prevent anyone from editing your files.'
tags:
  - 'Google Apps Script'
  - 'Google Drive'
  - 'Archives'
---

The files in your Google Drive are private by default and only the owner has initial permissions to view, edit or delete their files. If you choose to share a file with other people, you can decide whether others have read-only access to your files or if they are allowed to edit and comment on your files.

You can always remove external collaborators from your documents to prevent them from editing your files but how do you prevent yourself (the owner) from accidentally editing your own files in Google Drive?

### How to Prevent Document Edits in Google Drive

Google Drive now has a new [Locking API](http://docs.google.com/document/d/1PoE922Ozgdn7wSOg7j4S8U84FK3y9aLxyt12bNcdQ-4/export?format=pdf) to help [developers](/internet/google-apps-script-developers/32305/) easily add content restrictions on documents, spreadsheets, presentations, PDF and any other file in Google Drive.

When you lock a file, no one (including the owner) can make edits to the file, the file title cannot be changed and also lose the option of commenting inside files.

Google Drive doesn't have a simple button (yet) for locking files so here's a little Google Script that can help you make any file in your Google Drive read-only.

**1.** Open Google Drive and right-click any file that you wish to make a read-only file. Click the Share Link menu and copy the file link to the clipboard.

```html
https://docs.google.com/spreadsheets/d/12345_abcdef-123/edit?usp=sharing
```

**2.** Type `script.new` in the browser to open a new Google Apps Script project and copy-paste this [snippet](https://github.com/labnol/code/tree/master/google-apps-script/drive-lock) in the code editor.

```javascript
/**
 *  Make Google Drive files Read only
 *  Author: amit@labnol.org
 *  Web: https://digitalinspiration.com/
 *  MIT License
 **/
const makeFileReadyOnly = () => {
  const fileUrl = '<<FILE URL>>';
  const [fileId] = fileUrl.split('/').filter((e) => /[_-\w]{25,}/.test(e));
  UrlFetchApp.fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'PATCH',
    contentType: 'application/json',
    headers: {
      Authorization: `Bearer ${ScriptApp.getOAuthToken()}`,
    },
    payload: JSON.stringify({
      contentRestrictions: [
        {
          readOnly: true,
          reason: 'Prevent accidental editing',
        },
      ],
    }),
  });
  // For requesting correct scope, do not delete
  // var file = DriveApp.getFileById().setName()
};
```

**3.** Replace the `FILE URL` in line #2 with the URL of the Drive file that you copied in the previous step.

**4.** Go to the Run menu, choose Run function > `makeFileReadyOnly`. Accept the permissions and your file will restricted from editing by anyone including yourself.

If you would like to remove the file lock and allow editing, open Google Drive, right click the same file and choose "Unlock file" from the menu to restore the editing behavior.

Also see: [URL Tricks for Google Drive](/internet/direct-links-for-google-drive/28356/)

Please do note that when you freeze a document with the Google Drive Lock API, even [Google Scripts](/topic/google-apps-script) and [Google Workspace add-ons](https://digitalinspiration.com/) are blocked from editing the file.
