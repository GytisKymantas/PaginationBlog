---
title: 'How to Extract Text from PDF Files with Google Apps Script'
date: '2022-04-22T01:37:48.000Z'
slug: '/extract-text-from-pdf-220422'
description: 'This tutorial explains how you can parse and extract text elements from invoices, expense receipts and other PDF documents with the help of Apps Script.'
category: 'Software'
tags:
  - 'Archives'
  - 'Google Apps Script'
  - 'Google Drive'
  - 'PDF'
---

An external accounting system generates paper receipts for its customers which are then scanned as PDF files and uploaded to a folder in Google Drive. These PDF invoices have to be parsed and specific information, like the invoice number, the invoice date and the buyer's email address, needs to be extracted and saved into a Google Spreadsheet.

Here's a sample [PDF invoice](https://drive.google.com/file/d/18FaqtRcgCozTi0IyQFQbIvdgqaO_UpjW/view) that we'll use in this example.

Our PDF extractor script will read the file from Google Drive and use Google Drive API to convert to a text file. We can then [use RegEx](/internet/learn-regular-expressions/28841/) to parse this text file and write the extracted information into a Google Sheet.

Let's get started.

### Step 1. Convert PDF to Text

Assuming that the PDF files is already in our Google Drive, we'll write a little function that will convert the PDF file to text. Please ensure the Advanced Drive API as describes in [this tutorial](/shared-drives-google-script-220128).

```js
/*
 * Convert PDF file to text
 * @param {string} fileId - The Google Drive ID of the PDF
 * @param {string} language - The language of the PDF text to use for OCR
 * return {string} - The extracted text of the PDF file
 */

const convertPDFToText = (fileId, language) => {
  fileId = fileId || '18FaqtRcgCozTi0IyQFQbIvdgqaO_UpjW'; // Sample PDF file
  language = language || 'en'; // English

  // Read the PDF file in Google Drive
  const pdfDocument = DriveApp.getFileById(fileId);

  // Use OCR to convert PDF to a temporary Google Document
  // Restrict the response to include file Id and Title fields only
  const { id, title } = Drive.Files.insert(
    {
      title: pdfDocument.getName().replace(/\.pdf$/, ''),
      mimeType: pdfDocument.getMimeType() || 'application/pdf',
    },
    pdfDocument.getBlob(),
    {
      ocr: true,
      ocrLanguage: language,
      fields: 'id,title',
    }
  );

  // Use the Document API to extract text from the Google Document
  const textContent = DocumentApp.openById(id).getBody().getText();

  // Delete the temporary Google Document since it is no longer needed
  DriveApp.getFileById(id).setTrashed(true);

  // (optional) Save the text content to another text file in Google Drive
  const textFile = DriveApp.createFile(`${title}.txt`, textContent, 'text/plain');
  return textContent;
};
```

### Step 2: Extract Information from Text

Now that we have the text content of the PDF file, we can use RegEx to extract the information we need. I've highlighted the text elements that we need to save in the Google Sheet and the RegEx pattern that will help us extract the required information.

```js
const extractInformationFromPDFText = (textContent) => {
  const pattern = /Invoice\sDate\s(.+?)\sInvoice\sNumber\s(.+?)\s/;
  const matches = textContent.replace(/\n/g, ' ').match(pattern) || [];
  const [, invoiceDate, invoiceNumber] = matches;
  return { invoiceDate, invoiceNumber };
};
```

You may have to tweak the RegEx pattern based on the unique structure of your PDF file.

### Step 3: Save Information to Google Sheet

This is the easiest part. We can use the Google Sheets API to easily write the extracted information into a Google Sheet.

```js
const writeToGoogleSheet = ({ invoiceDate, invoiceNumber }) => {
  const spreadsheetId = '<<Google Spreadsheet ID>>';
  const sheetName = '<<Sheet Name>>';
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Invoice Date', 'Invoice Number']);
  }
  sheet.appendRow([invoiceDate, invoiceNumber]);
  SpreadsheetApp.flush();
};
```

If you a more complex PDF, you may consider using a commercial API that use Machine Learning to analyze the layout of documents and extract specific information at scale
Some popular web services for extracting PDF data include [Amazon Textract](https://aws.amazon.com/textract/), Adobe's [Extract API](https://developer.adobe.com/document-services/apis/pdf-extract/) and Google's own [Vision AI](https://cloud.google.com/vision/).They all offer generous free tiers for small-scale use.
