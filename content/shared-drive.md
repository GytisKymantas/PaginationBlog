---
title: 'Manage Shared Drives in Google Drive with Google Apps Script'
date: '2022-01-28'
slug: '/shared-drives-google-script-220128'
category: 'Code'
tags:
  - 'Google Apps Script'
  - 'Google Drive'
---

These code samples show how you can use Google Apps Script to manage and search through the content of shared drives in Google Drive using the Drive API.

To get started, click the `+` icon in the Services section to add the Drive API search to your Google project. Google Apps Script currently supports Drive API v2 though the latest version is v3.

Once the Drive API service is enabled, you can use the Drive API to search through the content of shared drives.

## Create a Shared Drive

```js
function createSharedDrive() {
  const driveName = 'Digital Inspiration';
  const sharedDrive = Drive.Drives.insert({ name: driveName }, Utilities.getUuid());
  console.log('Shared Drive created', sharedDrive.id);
}
```

## Share a Shared Drive with a User

```js
function shareSharedDriveWithUser({ driveId, role, email }) {
  // role can be writer, reader, organizaer or commenter
  const response = Drive.Permissions.insert(
    {
      role: role,
      type: 'user',
      value: email,
    },
    driveId,
    {
      supportsAllDrives: true,
      sendNotificationEmails: true,
      fields: 'emailAddress,role',
    }
  );
  console.log('Shared Drive shared with %s', response.emailAddress);
}
```

> Please note that you can only share Shared Drive with Google accounts.
> The API will not throw an exception if you try share a Shared drive with a non-Google account.

## List all Shared Drives

Print a list of all Shared Drives that are accessible to the current user.

```js
function listSharedDrives() {
  let pageToken = null;
  const response = [];

  do {
    const { items = [], nextPageToken = null } = Drive.Drives.list({
      pageToken,
      maxResults: 50,
      orderBy: 'name',
      fields: 'nextPageToken, items(id, name)',
    });
    items.forEach((item) => response.push(item));
    pageToken = nextPageToken;
  } while (pageToken !== null);

  console.log(response);
}
```

## List Files in a Shared Drive

In the next example, we'll print a list of all files contained in a specific Shared Drive identified by its drive ID that we retrieved in the previous example.

```js
function listFilesInSharedDrive(teamDriveId) {
  let pageToken = null;
  const response = [];

  do {
    const { items = [], nextPageToken = null } = Drive.Files.list({
      pageToken,
      maxResults: 50,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
      q: `'${teamDriveId}' in parents and trashed = false and mimeType != 'application/vnd.google-apps.folder'`,
      fields: 'nextPageToken, items(id,title,mimeType)',
    });
    items.forEach((item) => response.push(item));
    pageToken = nextPageToken;
  } while (pageToken !== null);

  console.log(response);
}
```

## Move Files in Shared Drives

Files contained in a specific Shared Drive can be moved to another Shared Drive or to another folder in the same Shared Drive depending on permissions.

```js
function moveFilesBetweenSharedDrives({ parentFolderId, destinationFolderId, fileId }) {
  const data = Drive.Files.update({}, fileId, null, {
    addParents: destinationFolderId,
    removeParents: parentFolderId,
    supportsAllDrives: true,
    fields: 'title,embedLink',
  });
  console.log('File Moved', data.title, data.embedLink);
}
```

The `getCanMoveItemOutOfDrive()` method can be used to determine whether the current user can move this item outside of this drive by changing its parent.

## Copy Files in Shared Drives

The next snippet illustrates how you can copy files from one Shared Drive to another or between folders of the same Drive. The `destinationFolerId` is the ID of the folder where the file will be copied to.

```js
function copyFilesInSharedDrives({ title, destinationFolderId, fileId }) {
  const data = Drive.Files.copy({ parents: [{ id: destinationFolderId }], title }, fileId, {
    supportsAllDrives: true,
    fields: 'title,embedLink',
  });
  console.log('File Copied', data.title, data.embedLink);
}
```
