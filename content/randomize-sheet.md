---
title: 'Sort by Random - How to Randomize the Order of Rows in Google Sheets'
date: '2021-07-14T01:10:10.000Z'
slug: '/random-sort-sheet-rows-210714'
category: 'Code'
description: 'Learn how to sort your data in a Google Sheet in randomized order using Excel formulas and Google Apps Script.'
tags:
  - 'Google Sheets'
  - 'Google Apps Script'
  - 'Archives'
---

You have a workbook in Google Sheets that contains multiple rows of data and you are required to sort the list in a random order. For instance, your sheet may contain the names of your team members and you need to reshuffle the list before assigning tasks to each of the members randomly. Or your Google Sheet may have the email addresses of people who participated in a giveaway and you need to pick any three random entries in an unbiased manner for the prize.

There are multiple ways to randomize the data rows in Google Sheet. You can either use the built-in `SORT` function of Google Sheets or create a menu-based function that lets you randomize data with a click.

**Demo** - Make a copy of this [Google Sheet](https://docs.google.com/spreadsheets/d/1mQyK-RFVrSY3TnlQayawACgqb9SxpWfkTDjUvuYJ4pc/copy) to try random sort with your own data in sheets.

## Sort Google Sheets in Random Order

![](https://www.labnol.org/images/2023/125956.png)

Open your Google Sheet that contains the list of data and **create a new sheet**. Paste the following formula in A1 cell of this empty sheet.

```js
=SORT(Customers!A2:D50, RANDARRAY(ROWS(Customers!A2:A50), 1), FALSE)
```

The first argument of the `SORT` function specifies the range of data that needs to be sorted in [A1 Notation](/convert-column-a1-notation-210601), the second argument creates a virtual column of same dimension but filled with random numbers and third order specifies the sort order from smallest to largest.

You may also want to replace `Customers` in the formula with the exact name of your Google Sheet. If the sheet name contains spaces, enclose your sheet name in single as quotes like `'Employee List'!A2:D50`. We start with row 2 since the first row is assumed to contain the header (titles).

The advantage with this approach is that it doesn't alter the source of data as the randomized list of data appears in a new sheet.

## Sort a List Randomly in Google Sheets with Apps Script

If you prefer a more automated approach that doesn't require you to manually add formulas each time you need to perform a random sort, take the Apps Script route.

Open your Google Sheet, go to the Tools menu and choose Script editor. Copy-paste the following code in the editor and save. Reload the Google Sheet and you should see a new menu as shown in the screenshot above.

```js
/** @OnlyCurrentDoc */

// Sort data in random order
const sortRowsInRandomOrder = () => {
  // Get the current sheet that contains the list of data
  const sheet = SpreadsheetApp.getActiveSheet();

  // Get the first non-empty column
  const column = sheet.getLastColumn() + 1;

  // Add the RAND() formula to all rows in the new column
  sheet
    .getRange(1, column)
    .setFormula('=RAND()')
    .autoFillToNeighbor(SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);

  // Sort the entire range of data using the random values
  // Do not include the first row of data (header) for sort
  sheet.getDataRange().offset(1, 0).sort({ column });

  // Remove the temporary column from Google sheet
  sheet.deleteColumn(column);

  // Flush the changes
  SpreadsheetApp.flush();
};

// Add the menu to Google Sheets
const onOpen = () => {
  SpreadsheetApp.getUi()
    .createMenu('Randomize Rows')
    .addItem('Start', 'sortRowsInRandomOrder')
    .addToUi();
};
```

### Keep Shuffling Rows

Go to the Randomize Rows menu and choose Start. It creates a temporary column, fill the `RAND()` formula in the new column for the entire range of cells, sorts the sheet range by this data and then remove the temporary column automatically.

You can click the same menu item multiple times and it will keep shuffling the rows in random order.
