---
title: 'How to Extract URLs from HYPERLINK Function in Google Sheets'
date: '2022-03-01'
slug: '/code/extract-hyperlinks-google-sheets-220301'
category: 'Code'
tags:
  - 'Google Sheets'
  - 'Google Apps Script'
---

The [HYPERLINK formula](/code/google-sheets-hyperlinks-2006232) of Google Sheets lets you insert hyperlinks into your spreadsheets. The function takes two arguments:

1. The full URL of the link
2. The description or the anchor text of the link

The URL and anchor text can either be specified as a string or as a cell reference.

If you insert a hyperlink into a cell using the `HYPERLINK` function, there's no direct way to extract the URL from the formula. You may consider writing a complicated [Regular Expression](/topic/regular-expressions) to match and extract the hyperlink in the cell formula or use Apps Script with Google Sheets API.

```javascript
const extractHyperlinksInSheet = () => {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = SpreadsheetApp.getActiveSheet();

  const hyperlinks = [];

  const spreadsheedId = ss.getId();
  const sheetName = sheet.getName();

  const getRange = (row, col) => {
    const address = sheet.getRange(row + 1, col + 1).getA1Notation();
    return `${sheetName}!${address}`;
  };

  const getHyperlink = (rowIndex, colIndex) => {
    const { sheets } = Sheets.Spreadsheets.get(spreadsheedId, {
      ranges: [getRange(rowIndex, colIndex)],
      fields: 'sheets(data(rowData(values(formattedValue,hyperlink))))',
    });
    const [{ formattedValue, hyperlink }] = sheets[0].data[0].rowData[0].values;
    hyperlinks.push({ rowIndex, colIndex, formattedValue, hyperlink });
  };

  sheet
    .getDataRange()
    .getFormulas()
    .forEach((dataRow, rowIndex) => {
      dataRow.forEach((cellValue, colIndex) => {
        if (/=HYPERLINK/i.test(cellValue)) {
          getHyperlink(rowIndex, colIndex);
        }
      });
    });

  Logger.log(hyperlinks);
};
```

Also see: [Replace Text in Google Docs with RegEx](/find-replace-text-google-docs-210708)
