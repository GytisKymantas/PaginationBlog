---
title: 'How to Add Options in Google Forms Questions from Google Sheets'
date: '2021-04-28'
slug: '/code/google-forms-choices-from-sheets-200630'
description: 'Learn how to bulk add options in dropdown lists and multiple-choice questions in Google Form using values from Google Sheets'
category: 'Code'
tags:
  - 'Google Apps Script'
  - 'Google Sheets'
  - 'Google Forms'
  - 'Archives'
---

An international school is building a Google Form where students can register their details. The form would have a drop-down list of countries, the names of class teachers as a multiple choice question and a checkbox style question where students can pick one or more of their favorite subjects.

## Adding Bulk Questions in Google Forms

It is easy to create such a form inside Google Forms - here's a [sample form](https://docs.google.com/forms/d/e/1FAIpQLSeZ-tCvRRPa7vk9Zt3bbii_id1NoOaQUQGT83dwmv-TiTB9hw/viewform) - but there are two issues:

1. There’s too much data to enter and type in the form. For instance, the country down-down alone has a list of 250 countries and it would take some work for the form editor to manually type each choice in the question.
2. The question choices in the form may change with time. In the previous example, some teachers may move out, new teachers may join in and the drop-down list in the form has to be updated manually every time there’s a change in the staff.

## Auto-Populate Questions in Google Forms with Google Sheets

As with everything else in the world of Google Forms and Google Sheets, we can easily automate the process of adding question choices in Google Forms in bulk with the help of, you guessed it right, Google Apps Script.

`video: https://www.youtube.com/watch?v=Z-gCwZ0lXd8`

The idea is simple. We’ll have a Google Sheet that will be the data source and have all the answer choices for various questions in the Google Form.

The app will read the data from this Google Sheet and auto-populate the choices in the form with one click. You can even create a time-trigger that runs every hour, day or month to dynamically update your form using the most current data available in the spreadsheet.

### Add Options in Dropdown Lists & Multiple Choice Questions

Create a Google Spreadsheet and add the question titles in the first row of the sheet, one per column. Next, write down all the options or choices that should be available per question.

Here’s how your spreadsheet structure would look like:

The important thing to note here is that your column headings in the spreadsheet should exactly match the form field labels of the Google Form. The Google Script can bulk add answers in multiple-choice questions with a single answer, drop-down lists and checkbox with multiple options.

#### Bulk Add Question Choices in Google Forms

Open the Google Sheet that has the question choices, go to the Tools menu and choose Script Editor. Replace the default code in the script editor with the Google Script below. Please watch the [video tutorial](https://www.youtube.com/watch?v=Z-gCwZ0lXd8) to know in more detail how this code works.

```javascript
/**
 * Auto-populate Question options in Google Forms
 * from values in Google Spreadsheet
 *
 * Written by Amit Agarwal (MIT License)
 *
 **/

const populateGoogleForms = () => {
  const GOOGLE_SHEET_NAME = '<<Put the name of Google sheet here>>';
  const GOOGLE_FORM_ID = '<<Put your Google Form ID here>>';

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const [header, ...data] = ss.getSheetByName(GOOGLE_SHEET_NAME).getDataRange().getDisplayValues();

  const choices = {};
  header.forEach((title, i) => {
    choices[title] = data.map((d) => d[i]).filter((e) => e);
  });

  FormApp.openById(GOOGLE_FORM_ID)
    .getItems()
    .map((item) => ({
      item,
      values: choices[item.getTitle()],
    }))
    .filter(({ values }) => values)
    .forEach(({ item, values }) => {
      switch (item.getType()) {
        case FormApp.ItemType.CHECKBOX:
          item.asCheckboxItem().setChoiceValues(values);
          break;
        case FormApp.ItemType.LIST:
          item.asListItem().setChoiceValues(values);
          break;
        case FormApp.ItemType.MULTIPLE_CHOICE:
          item.asMultipleChoiceItem().setChoiceValues(values);
          break;
        default:
        // ignore item
      }
    });
  ss.toast('Google Form Updated !!');
};
```

You need to replace the `GOOGLE_SHEET_NAME` and the `GOOGLE_FORM_ID` with your own values. Go to the Run menu inside the Script editor, choose `populateGoogleForms` function and it should instantly choices for all the specified questions in the Google Form.

#### Dynamically Update Answers in Google Forms

Going forward, whenever you need to update the answer choices in Google Forms, you can simply update the values inside the spreadsheet and run the same auto-populate function from the Script editor.

Or, to make things even more simple, you can add a button on the spreadsheet page that, when clicked, will automatically update the answers in Google Forms for you.

Go to the Insert menu in Google Sheets, choose drawing and pick any shape. You can also add overlay text to the shape. Once the shape is placed on the spreadsheet canvas, click the menu, choose assign script and type `populateGoogleForms`.

That’s it. You can click this button to update your Google Forms right within Google sheets. Do note that the script will not append choices, it will replace all existing choices with the ones that are available in your Google Sheet.

Also see: [Send Pre-filled Google Forms via Email](https://www.labnol.org/prefilled-google-forms-200601)
