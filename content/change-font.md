---
title: 'How to Change the Font in your Google Documents with Apps Script'
date: '2021-06-03T00:10:10.000Z'
slug: '/change-font-documents-210603'
description: 'How to change the font family and font styles of multiple Word documents in your Google Drive with Apps Script'
category: 'Code'
tags:
  - 'Google Docs'
  - 'Google Apps Script'
  - 'Fonts'
---

An organization recently migrated their Word Documents from Microsoft Office to Google Drive. The migration has been smooth but the Word documents imported as Google Docs are using Calibri, the default font family of Microsoft Word.

The company is looking to replace the fonts in multiple Google Documents such that the document headings using Georgia while the body paragraphs are rendered in Droid Sans at 12 pt.

### Replace Font Styles in Google Docs

This example show how to replace the font family of your Google Documents of specific sections - the heading titles are rendered in a different font while the tables, list items, body and table of contents are formatted with a separate font.

```js
const updateFontFamily = () => {
  const document = DocumentApp.getActiveDocument();

  const headingStyles = {
    [DocumentApp.Attribute.FONT_FAMILY]: 'Georgia',
    [DocumentApp.Attribute.FONT_SIZE]: 14,
  };

  const normalParagraphStyles = {
    [DocumentApp.Attribute.FONT_FAMILY]: 'Droid Sans',
    [DocumentApp.Attribute.FONT_SIZE]: 12,
  };

  const body = document.getBody();

  [...Array(body.getNumChildren())].map((_, index) => {
    const child = body.getChild(index);
    const childType = child.getType();
    if (childType === DocumentApp.ElementType.PARAGRAPH) {
      if (child.asParagraph().getHeading() === DocumentApp.ParagraphHeading.NORMAL) {
        child.setAttributes(normalParagraphStyles);
      } else {
        child.setAttributes(headingStyles);
      }
    } else if (childType === DocumentApp.ElementType.TABLE) {
      child.setAttributes(normalParagraphStyles);
    } else if (childType === DocumentApp.ElementType.TABLE_OF_CONTENTS) {
      child.setAttributes(normalParagraphStyles);
    } else if (childType === DocumentApp.ElementType.LIST_ITEM) {
      child.setAttributes(normalParagraphStyles);
    }
  });

  document.saveAndClose();
};
```
