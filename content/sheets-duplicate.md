---
title: 'How to Highlight Duplicates in Google Sheets and Remove'
date: '2020-08-26'
slug: '/highlight-duplicates-google-sheets-200818'
category: 'Docs'
description: 'How to quickly highlight cells with duplicate values in Google Sheets using conditional formatting. The duplicate cells can be easily removed from the spreadsheet with Google Script.'
tags:
  - 'Google Sheets'
  - 'Mail Merge for Gmail'
  - 'Document Studio'
  - 'Archives'
---

The [Email Extractor](https://gsuite.google.com/marketplace/app/email_address_extractor/1045030766919) app pulls emails addresses of your contacts from Gmail into a Google Sheet. You can then use [Mail Merge](https://gsuite.google.com/marketplace/app/mail_merge_with_attachments/223404411203) or [Document Studio](https://gsuite.google.com/marketplace/app/document_studio/429444628321) to send personalized emails to your contacts from within the sheet itself.

That said, the imported mailing list may sometimes have duplicate email addresses and it is thus be a good idea to clean up the data in your Google Sheet by removing duplicates before sending out the emails.

## Highlight Duplicates in Google Sheets

You can use Conditional Formatting in Google Sheets combined with the `COUNTIF` formula to quickly highlight cells that contain duplicate values.

Here's how you can find duplicates in Google Sheets:

1. Open the Google Sheet containing your data and go to the Format menu.

2. Select Conditional Formatting from the expanded menu. This will help us change the colors of cells, rows or columns that meet a specific criteria.

3. In the Apply to Range input box, add the range of cells that contain possible duplicates. In our case, the email addresses are in column A so we can put `A:A` to specify the entire A column.

4. Under the 'Format cells if' section, choose "Custom formula is" from the dropdown list as set the formula as `=COUNTIF(A:A, A1) > 1`

Click the Done button and you'll instantly notice that all duplicate cells are highlighted as shows in the screenshot below.

### The COUNTIF Function

The COUNTIF function in Google sheets (and Microsoft Excel) essentially counts the number of cells in the range that meet a specific criteria. For instance `=COUNTIF(A:A, "apple")` will count the number of cells that contain the word apple.

It can accept wildcard characters too so `=COUNTIF(A:A, "apple?")` will count cells that contain the word apple or apples. Or say `=COUNTIF(A:A, "*@gmail.com")` and it will highlight all email address that end with a gmail address.

Please note that the `COUNTIF` function is case-insensitive so values like `gmail.com` and `Gmail.com` are seen as duplicates.

### Highlight Entire Row Containing Duplicates

If you've noticed in the previous screenshot, only specific cells that have duplicate values are highlighted through conditional formatting.

However, if you would like the Google Sheet to highlight the entire spreadsheet row that contains duplicate values, we need to slightly tweak the formatting rule.

1. Go to the Apply to Range input box and specify the entire spreadsheet range, not just the column that contains duplicates.

2. In the custom formula,use absolute reference for the range and also change criterion to use `$A1` instead of `A1`. When we use `$A1`, we are telling Google Sheet to only change the row but lock the column.

The new duplicate detection formula reads `=COUNTIF($A$1:$C$50, $A1)>1`

#### Compare Multiple Columns for Duplicates

If you would like to determine duplicates by comparing data in multiple columns of the Google Sheet, use `COUNTIFS` instead of `COUNTIF`.

For instance, if column A is Email Address and column B is Company Name and you would like highlight duplicates cell only when the combination of values in Column A and B is identical, the new formula can be written as `=COUNTIFS(A:A, A1, B:B, B1)>1`

### Remove Duplicate Rows in Google Sheets

Now that we have figured out a simple method to highlight duplicates in Google Sheets, the next task is to remove all duplicate rows.

There are two ways to go about it - either use [Google Apps script](/code/19649-find-duplicate-rows-in-google-sheets) or use the built-in feature of Google Sheets to remove duplicates.

First, highlight the entire column in Google Sheet that contains the duplicate data. Next, go to the Data menu and choose the Remove Duplicates option.

Select which columns to include and whether or not the selected range has any header row. Click Remove duplicates and your list is clean up in one go. Like with COUNTIF function, Google Sheets will ignore case and formatting when determining duplicates.

#### Remove Duplicates with Google Scripts

If you prefer [automation](https://digitalinspiration.com/), here's a little snippet that will remove the duplicates in your active Google Sheet based on data in the first column.

```JavaScript
/** @OnlyCurrentDoc */

function removeDuplicateRows() {
  SpreadsheetApp.getActiveSpreadsheet()
    .getActiveSheet()
    .getDataRange()
    .removeDuplicates([1]);
}
```
