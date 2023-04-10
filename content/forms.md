---
title: 'How to Auto Format Google Form Responses in Google Sheets'
date: '2022-06-01T01:01:01.010Z'
slug: '/auto-format-google-form-responses-220601'
category: 'Internet'
description: 'Learn how to automatically preserve the formatting in Google Sheet when new Google Form responses are submitted.'
tags:
  - 'Google Apps Script'
  - 'Archives'
  - 'Google Sheets'
  - 'Google Forms'
---

When you submit a Google Form, it stores a copy of the form response as a new row in the Google Sheet. The only problem here is that Google Forms will not add any formatting or styles to the new row that you may have applied to the previous rows of the sheet. Let me illustrate this with a small example.

Here's a Google Sheet that is storing Google Form responses. I've changed the default font family to `Droid Sans`, center-aligned the Country and Age column and also applied a different [date format](/date-formats-google-sheets-211015) to the `Date of Birth` column.

Everything looks good but as soon as a new form submissions is made, the new row appended to the Google Sheet via Google Forms will lose all the formatting.

The cell alignment is not preserved, the custom date formats are ignored and so is the default font size and font family. Here's a screenshot of the same sheet but with a new row added through Google Forms.

Also see: [Automate Google Forms through Workflows](https://digitalinspiration.com/docs/document-studio/google-forms)

## Auto Format New Rows in Google Sheets

Since there's no way for us to override this Google Forms behavior, we can take the help of Google Apps Script to automatically format new rows in Google Sheets that are added through Google Forms.

The idea is simple. We'll create an `onFormSubmit` trigger inside the Google Sheet that will be executed whenever a new form is submitted. This trigger will take whatever formatting that has been applied to the previous row and apply to the current row.

To get started, open the Google Sheet and format the last row with the styles that you would like to apply to incoming form responses.

Next, go to Extensions > Apps Script menu and copy-paste the Google Script below. Run the `createTrigger` and you are good to go!

```js
/**
 * @OnlyCurrentDoc
 */

const createTrigger = () => {
  ScriptApp.getProjectTriggers().forEach((trigger) => {
    ScriptApp.deleteTrigger(trigger);
  });
  ScriptApp.newTrigger('formRowOnFormSubmit')
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onFormSubmit()
    .create();
};

const formRowOnFormSubmit = (e) => {
  if (!e) {
    throw new Error('Please do not run this function manually!');
  }
  const { range } = e;
  const row = range.getRowIndex();
  if (row > 2) {
    const sheet = range.getSheet();
    // Select the previous row range
    const sourceRange = sheet.getRange(`${row - 1}:${row - 1}`);
    // Get the recently added row
    const targetRange = sheet.getRange(`${row}:${row}`);
    // Copy the format only from the previous row to the current row
    sourceRange.copyTo(targetRange, SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false);
  }
};
```

### Conditional Formatting in Google Sheets

Learn more about [conditional formatting in Google Sheets](/conditional-formatting-google-sheets-220415) that allows you to apply automatic formatting to cells in spreadsheets that meet certain criteria.
