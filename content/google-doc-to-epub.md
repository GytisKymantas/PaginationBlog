---
title: 'Convert a Google Document into an EPUB File'
date: '2021-11-14'
slug: '/code/convert-google-doc-epub-200114'
category: 'Code'
tags:
  - 'Google Apps Script'
  - 'Google Docs'
  - 'epub'
---

With Google Documents, you can easily [save any document](/internet/convert-docs-to-epub-ebooks/29103/) into an ePub file in the browser. Just open any document inside the Google Documents web editor and choose `File > Download > EPUB` from the menu to convert the file.

If you have bunch of documents in your Google Drive, converting them to EPUB format manually would be a tedious task and that's where Apps Script can help.

```javascript
function convertDocToEPUB() {
  // Get the currently opened document
  var document = DocumentApp.getActiveDocument();

  // Get the EPUB export link
  var mimeType = 'application/epub+zip';
  var exportLink = Drive.Files.get(document.getId()).exportLinks[mimeType];

  // Get the blob of the epub exported file
  var response = UrlFetchApp.fetch(exportLink, {
    headers: {
      Authorization: 'Bearer ' + ScriptApp.getOAuthToken(),
    },
  });

  // Save the EPUB file in the Google Drive root folder
  var file = DriveApp.createFile(response.getBlob());
  // Set the file name same as the document name
  file.setName(document.getName() + '.epub');

  // Return the file URL from Drive
  return file.getUrl();
}
```

We use the Google Drive Advanced Service of Apps Script to get get the export link for the EPUB MIME Type. Next, the `URLFetchApp` service exports the Google Doc to the requested MIME type and returns the exported content as a blob.

The blog is saved to Google Drive and the file URL is returned.

A similar technique is used by [Document Studio](https://digitalinspiration.com/docs/document-studio) to convert merged documents into EPUB ebooks.
