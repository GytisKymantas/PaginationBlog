---
title: 'How to Convert Column Number (e.g. 28) to Column Letter (e.g. AB) in Google Sheets'
date: '2021-06-01T01:10:10.000Z'
slug: '/convert-column-a1-notation-210601'
category: 'Code'
description: 'Convert column letters (AA) to corresponding numbers, or covert column numbers to A1 notation cell references in Google Sheets and Microsoft Excel.'
tags:
  - 'Google Sheets'
  - 'Google Apps Script'
  - 'Archives'
---

Google Sheets includes built-in functions for converting cell references in A1 notation to row and column numbers and another function for converting column alphabets (like AA) into the column index (26 in this case).

`=ADDRESS(23, 28, 4)` - Returns the A1 style notation of the cell whose row number is 23 and column number is 28.

`=COLUMN(C9)` - Returns the column number of a specified cell C9 where column A corresponds to 1 and column AA corresponds to 27.

## Get A1 Notation with JavaScript

If you are working with the Google Sheets API, you may sometimes needs to calculate the A1 notation style reference of a cell whose row and column numbers are known in the JSON data of the sheet.

For container bound Google Sheets, the `getA1Notation()` method can return the range address in A1 Notation.

```js
const sheet = SpreadsheetApp.getActiveSheet();
const range = sheet.getRange(1, 2);
Logger.log(range.getA1Notation());
```

If you are not using the Spreadsheet service, you can also compute the A1 notation reference of a cell using simple JavaScript.

```js
/**
 *
 * @param {number} row - The row number of the cell reference. Row 1 is row number 0.
 * @param {number} column - The column number of the cell reference. A is column number 0.
 * @returns {string} Returns a cell reference as a string using A1 Notation
 *
 * @example
 *
 *   getA1Notation(2, 4) returns "E3"
 *   getA1Notation(2, 4) returns "E3"
 *
 */
const getA1Notation = (row, column) => {
  const a1Notation = [`${row + 1}`];
  const totalAlphabets = 'Z'.charCodeAt() - 'A'.charCodeAt() + 1;
  let block = column;
  while (block >= 0) {
    a1Notation.unshift(String.fromCharCode((block % totalAlphabets) + 'A'.charCodeAt()));
    block = Math.floor(block / totalAlphabets) - 1;
  }
  return a1Notation.join('');
};
```

This is equivalent to `=ADDRESS()` function of Google Sheets.

## Get Column Number from A1 Notation

The next function takes the cell reference in A1 notation and returns the column number and row number of any cell in the spreadsheet.

```js
/**
 *
 * @param {string} cell -  The cell address in A1 notation
 * @returns {object} The row number and column number of the cell (0-based)
 *
 * @example
 *
 *   fromA1Notation("A2") returns {row: 1, column: 3}
 *
 */

const fromA1Notation = (cell) => {
  const [, columnName, row] = cell.toUpperCase().match(/([A-Z]+)([0-9]+)/);
  const characters = 'Z'.charCodeAt() - 'A'.charCodeAt() + 1;

  let column = 0;
  columnName.split('').forEach((char) => {
    column *= characters;
    column += char.charCodeAt() - 'A'.charCodeAt() + 1;
  });

  return { row, column };
};
```

This is equivalent to the `=ROW()` and `=COLUMN()` functions available in Google Sheets.
