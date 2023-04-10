---
title: 'Find Google Sheets Linked to your Google Forms'
date: '2021-04-29'
slug: '/code/google-forms-response-sheet-210429'
description: 'How to find the destination Google Spreadsheet and Sheet that is storing responses of the current Google Form with Google Apps Script'
category: 'Code'
tags:
  - 'Google Apps Script'
  - 'Google Forms'
---

When a user submits your Google Form, the response can be either saved in the Google Form itself or it can be written as a new row in a Google Spreadsheet. Multiple Google Forms can be associated with a single spreadsheet and their responses will be stored in separate sheets of the same spreadsheet.

If you have multiple Google Forms in your Drive that are writing response data to the same Google Sheet, you can use Google Scripts to determine the name of the spreadsheet and the sheet where that form is storing their responses.

Open the Google Script editor, replace the `formId` with the Id of your Google Form and run the script to get the name of the associated sheet.

```javascript
function getResponseSheetForGoogleForm() {
  const formId = '<<Google Form Id>>';

  // Open an existing Google Form by Id
  const form = FormApp.openById(formId);

  // Are the form responses stored in Google Sheets
  const destinationType = form.getDestinationType();

  if (destinationType !== FormApp.DestinationType.SPREADSHEET) {
    Logger.log('This form is not saving responses in Google Sheets');
  } else {
    // Get the Id of the response spreadsheet
    const destinationId = form.getDestinationId();

    // Open the Google Workbook and iterate through each sheet
    const formSpreadsheet = SpreadsheetApp.openById(destinationId);

    const [formSheet] = formSpreadsheet.getSheets().filter((sheet) => {
      // Returns the URL of the associated Google form
      // that is sending its user responses to this sheet
      const associatedFormUrl = sheet.getFormUrl();
      return associatedFormUrl && associatedFormUrl.indexOf(formId) !== -1;
    });

    Logger.log(`The form responses are stored in ${formSheet.getName()}`);
  }
}
```

Also see: [Add Form Response URL in Google Sheets](/code/20540-edit-form-response-spreadsheet-url)
