---
title: 'Formulas in Google Sheets Disappear When New Rows Are Added - The Solution'
date: '2022-09-27T01:01:01.010Z'
slug: '/google-sheets-formula-deleted-220927'
category: 'Internet'
description: 'The formulas in Google Sheets may get deleted when new rows are added in the sheet or when new responses come in through Google Forms. The fix is simple!'
tags:
  - 'Archives'
  - 'Google Sheets'
  - 'Google Forms'
  - 'Formulas and Functions'
---

An order form, created in Google Forms, requires customers to provide their full name, the item quantity and whether home delivery is required. The final bill amount is calculated with a simple formula in Google Sheets.

```js
// Item cost is $99 per unit. Delivery cost is $19.
=IF(ISNUMBER(C2), SUM(C2*99, IF(D2="Yes", 19, 0)), )
```

The Google Sheet owner has entered the formula across all rows in the `Total Amount` column so that the value is automatically calculated when a new form response is submitted.

The problem is that the formulas in Google Sheets are automatically deleted when new responses come in. That's the default behavior and even if you protect the column range, the formulas in the cell will be erased on new rows.

## How to Prevent Formulas from Deleting

There are several workarounds to this problem.

### Use an ARRAYFORMULA

Instead of adding formulas inside individual cells of the column, add an [Array Formula](/internet/arrayformula-copy-formulas-in-entire-column/29711/) to the first row of the column that contains the computed values.

```js
=ARRAYFORMULA(IF(ROW(C:C)=1,
   "Total Amount",
   IF(ISNUMBER(C:C), C:C*99 + IF(D:D="Yes",19,0),)
  ))
```

Here's a simple breakdown of the formula:

- `IF(ROW(C:C)=1, "Total Amount", ...` - If the current row number is 1, add the column title.
- `IF(ISNUMBER(C:C), ...` - Calculate the amount only if there's a numeric value in the C column.
- `C:C*99 + IF(D:D="Yes",19,0),)` - Multiply $99 with the item quantity and add $19 if the column D is set to Yes.

### Use MAP with a LAMBDA function

You can use the new MAP function of Google Sheets that takes an array of values as input and returns a new array formed by applying a Lambda function to each value of the array.

```js
=MAP(C:C,D:D,
  LAMBDA(Qty, Delivery,
    IF(ROW(Qty)=1,"Total Amount",
    IF(ISNUMBER(Qty), Qty*99 + IF(Delivery="Yes", 19,),))
  ))
```

### Use a QUERY function

If array formulas sound complex, here's an alternate approach.

Create a new sheet in your Google Spreadsheet and use the `QUERY` function with a SQL-like statement to import the required data from the Form sheet into the current sheet.

```js
=QUERY('Form Responses 1'!A:D,"SELECT A,B,C,D",TRUE)
```

We are only importing the sheet data that has been entered in the form response and all the calculations will happen in this sheet, not the main sheet.

Paste the simple formula for amount calculation in cell E2 and drag the cross-hair down to auto-fill the formula across all rows.

```js
=IF(ISNUMBER(C2), SUM(C2*99,IF(D2="Yes",19,0)),)
```

This is the recommended approach if you would like to [preserve row formatting](/auto-format-google-form-responses-220601) and conditional formatting when new survey responses come in.
