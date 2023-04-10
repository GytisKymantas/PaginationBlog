---
title: 'How to Preserve Formatting of Spreadsheet Cells in Mail Merge'
date: '2020-08-30'
slug: '/send-rich-text-emails-200830'
description: 'You can format the source data in Google Spreadsheet in different colors, fonts and sizes and all your cell formatting will be retained in the email messages.'
category: 'Docs'
tags:
  - 'Google Apps Script'
  - 'Google Sheets'
  - 'Mail Merge for Gmail'
  - 'Archives'
---

The [Mail Merge](https://gsuite.google.com/marketplace/app/mail_merge_with_attachments/223404411203) app merges data from a Google Spreadsheet and sends them as [personalized emails](/internet/personalized-mail-merge-in-gmail/20981/). You can format your sheet data in multiple colors, choose different font families, vary the size of your text, include [hyperlinks](/code/google-sheets-hyperlinks-200632), line breaks and more.

The rich text of spreadsheet cells is internally translated into HTML tags with inline CSS and thus the cell formatting is preserved in the outgoing Gmail messages. Here's an example:

If you would like to enable this feature, go to the Add-ons menu in Google Sheets **>** Mail Merge with Attachments **>** Configure Mail Merge and check the "Preserve Cell Formatting" option.

You can even format your spreadsheet cells with [conditional formatting](/highlight-duplicates-google-sheets-200818) and the text styles will be retained in mail merge. For instance, you can dynamically color the invoice amount column in red and make it bold if the [due date](/send-reminder-emails-200425) has passed and this value would show up in bold red in the email message as well.

## Send Rich Text HTML Emails with Google Sheet

This [snippet](https://github.com/labnol/code/tree/master/google-apps-script/rich-text) handles the transformation of rich-text Spreadsheet data to HTML. The functions reads the data from a cell, specified in A1 notation, breaks the rich text into blocks that have the same text styles and translate individual blocks into HTML tags.

```javascript
const sendRichEmail = () => {
  const cellAddress = 'A1';
  const sheetName = 'Mail Merge';
  const recipient = 'amit@labnol.org';

  const richTextValue = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(sheetName)
    .getRange(cellAddress)
    .getRichTextValue();

  /* Run is a stylized text string used to represent cell text.
     This function transforms the run into HTML with CSS
   */
  const getRunAsHtml = (richTextRun) => {
    const richText = richTextRun.getText();

    // Returns the rendered style of text in a cell.
    const style = richTextRun.getTextStyle();

    // Returns the link URL, or null if there is no link
    // or if there are multiple different links.
    const url = richTextRun.getLinkUrl();

    const styles = {
      color: style.getForegroundColor(),
      'font-family': style.getFontFamily(),
      'font-size': `${style.getFontSize()}pt`,
      'font-weight': style.isBold() ? 'bold' : '',
      'font-style': style.isItalic() ? 'italic' : '',
      'text-decoration': style.isUnderline() ? 'underline' : '',
    };

    // Gets whether or not the cell has strike-through.
    if (style.isStrikethrough()) {
      styles['text-decoration'] = `${styles['text-decoration']} line-through`;
    }

    const css = Object.keys(styles)
      .filter((attr) => styles[attr])
      .map((attr) => [attr, styles[attr]].join(':'))
      .join(';');

    const styledText = `<span style='${css}'>${richText}</span>`;
    return url ? `<a href='${url}'>${styledText}</a>` : styledText;
  };

  /* Returns the Rich Text string split into an array of runs,
  wherein each run is the longest possible
  substring having a consistent text style. */
  const runs = richTextValue.getRuns();

  const htmlBody = runs.map((run) => getRunAsHtml(run)).join('');

  MailApp.sendEmail(recipient, 'Rich HTML Email', '', { htmlBody });
};
```

#### Known Limitations

You can format the cells of your Google Spreadsheet in any font family - from the cursive Caveat to the heavy Impact typeface - but if the recipient doesn't have these fonts installed on their computer, the rendered text in the email would fallback to the default font.

The font colors, font size and text styles (bold, italics, underline) get perfectly transformed into HTML but other properties like background fill colors, borders and text-alignment of the cell are ignored.

Also, if your spreadsheet cells are formatted as dates, the rich text functions may not work.
