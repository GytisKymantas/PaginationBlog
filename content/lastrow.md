---
title: 'How to Get the Last Row in Google Sheets when using ArrayFormula'
date: '2022-03-22'
slug: '/sheets-lastrow-arrayformula-220322'
category: 'Code'
tags:
  - 'Google Apps Script'
  - 'Google Sheets'
---

Here we have an employee list spreadsheet with a column named `Employee Name` and a column named `Employee ID`.

As soon as you enter a new employee name in the `Employee Name` column, the `Employee ID` column will automatically be filled with the help of an [ARRAY FORMULA](/internet/arrayformula-copy-formulas-in-entire-column/29711/) provided below:

```js
=ARRAYFORMULA(IF(ROW(A:A)=1, "Employee ID",
  IF(NOT(ISBLANK(A:A)), ROW(A:A)-1, "")))
```

The formula adds the current row number to the `Employee ID` column if the current row is not the first row. If the current row is the first row, then the title is added to the cell.

Also see: [Google Sheets Formulas for Google Forms](/google-form-formulas-050520)

The system works but there's one major flaw in this approach. Let me explain:

Say you have several new employees and you would like to add them to the spreadsheet programmatically with the help of Google Apps Script.

You'll get the reference of the sheet and then use the the `getLastRow()` method to find the last row number to return the first empty row that does not contain any data.

```js
function addNewEmployees() {
  const employees = ['Richard', 'Elizabeth', 'Orli'];
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  Logger.log('Last row is %s', lastRow);
}
```

The above code will return `10` and not `4` as you would have expected. The reason is that the ArrayFormula affects the `getLastRow()` method since it outputs an array of blank values all the way to the bottom of the sheet.

Thus the output of `getLastRow()` and `getMaxRows()` would be the same if the ArrayFormula is not constrained to size of range that contains actual data.

The fix is surprisingly simple. If the condition in ArrayFormula is not met, leave the second argument blank as show below. The last comma is required though else it will output the default value of FALSE.

```js
=ARRAYFORMULA(IF(ROW(A:A)=1, "Employee ID",
  IF(NOT(ISBLANK(A:A)), ROW(A:A)-1,)))
```

Here's the final working code:

```js
function addNewEmployees() {
  const employees = ['Richard', 'Elizabeth', 'Orli'];
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  Logger.log('Last row is %s', lastRow);
  sheet.getRange(lastRow + 1, 1, employees.length, 1).setValues(employees.map((e) => [e]));
}
```

You may use this approach to [add unique IDs](/google-form-formulas-050520#auto-number-form-responses-with-a-unique-id) to your Google Sheets.

If it is difficult for you to rewrite the formulas in your Google Sheet, alternate approach would be to get all the data in the sheet and look for the last row that contains data.

We reverse the array to look from blank rows from the bottom and stop as soon as any row containing data is found.

```js
function getLastRow() {
  const data = SpreadsheetApp.getActiveSheet()
    .getRange('A:A')
    .getValues()
    .reverse()
    .map(([employee]) => employee);

  const { length } = data;
  for (var d = 0; d < length; d++) {
    if (data[d]) {
      Logger.log('The last row is %s', length - d);
      return length - d;
    }
  }
  return 1;
}
```
