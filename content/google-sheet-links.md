---
title: 'How to Use Hyperlinks in Google Sheets'
date: '2022-02-03'
slug: '/code/google-sheets-hyperlinks-2006232'
category: 'Code'
tags:
  - 'Google Apps Script'
  - 'Google Sheets'
  - 'Archives'
---

This guide explains how you can easily create and manage hyperlinks in Google Sheets. An entire cell in the sheet, or specific text inside the cell, can be linked to external web pages. A cell can also contain multiple hyperlinks.

If you type a web page address in a Google Sheet cell, it is automatically converted into a clickable hyperlink.

You can add anchor text to plain hyperlinks for more accessible URLs. Hover your mouse over the hyperlink and click the Edit icon. Now add the anchor text in the Text input box and click the green Apply button.

Alternatively, you may use the built-in `HYPERLINK` function in Google Sheet to create web links with (optional) anchor text.

```javascript
 =HYPERLINK("https://www.labnol.org", "Digital Inspiration")
```

It is also possible to include multiple hyperlinks inside a single cell of the Google Sheet.

Just type any text, include URLs in plain text and when you move the cursor out of the cell, the URLs are converted into hyperlinks.

**Bonus Tip:** While a cell with multiple links is selected, press `Alt+Enter` and all the links with open at once in new tabs.

You can use the previous technique to edit multiple hyperlinks contained in a single cell and add anchor text.

Hover your mouse over a link in the cell, click the edit icon and change the Anchor text. Repeat this for all other links in the same cell.

Also see [Secret Google Drive URLs](/internet/direct-links-for-google-drive/28356/).

### Manage Hyperlinks with Google Scripts

Here are some snippets that will help you manage your hyperlinks in Google Sheets using Google Script macros.

#### 1. Create links in Google Sheet cells with the Hyperlink formula.

```javascript
const createHyperLinkWithFormula = () => {
  const link = 'https://www.labnol.org';
  const text = 'Digital Inspiration';
  const value = `=HYPERLINK("${link}", "${text}")`;
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange('A1');
  range.setValue(value);
};
```

#### 2. Create links with the RichTextValue builder

```javascript
const createHyperLinkWithRichTextValue = () => {
  const link = 'https://www.labnol.org';
  const text = 'Digital Inspiration';
  const value = SpreadsheetApp.newRichTextValue().setText(text).setLinkUrl(link).build();
  SpreadsheetApp.getActiveSheet().getRange('A1').setRichTextValue(value);
};
```

#### 3. Create multiple links in a single cell

```javascript
const createMultipleHyperLinks = () => {
  const value = SpreadsheetApp.newRichTextValue()
    .setText('Google acquired YouTube in 2006')
    .setLinkUrl(0, 6, 'https://www.google.com')
    .setLinkUrl(16, 23, 'https://www.youtube.com')
    .build();
  SpreadsheetApp.getActiveSheet().getRange('A1').setRichTextValue(value);
};
```

#### 4. Extract links from a cell that uses the HYPERLINK formula

```javascript
const extractLinkFromFormula = () => {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange('A1');
  const formula = range.getFormula();
  const [, url, , text] = formula.match(/=HYPERLINK\("(.+?)"([;,]"(.+?)")?\)/) || [];
  Logger.log({ url, text: text || url });
};
```

#### 5. Extract multiple links and anchor text from a cell

```javascript
const extractMultipleLinks = () => {
  const urls = SpreadsheetApp.getActiveSheet()
    .getRange('A1')
    .getRichTextValue()
    .getRuns()
    .map((run) => {
      return {
        url: run.getLinkUrl(),
        text: run.getText(),
      };
    })
    .filter(({ url }) => url);
  Logger.log(urls);
};
```

Also see: [Extract Hyperlinks in Google Sheets](/code/extract-hyperlinks-google-sheets-220301)
