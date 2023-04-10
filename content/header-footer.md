---
title: 'Google Documents - How to Replace Text in Header and Footer'
date: '2021-05-31T01:10:10.000Z'
slug: '/document-header-footer-replace-text-210531'
category: 'Code'
description: "How to find and replace text in the Word document's header and footer section using the Google Document API."
tags:
  - 'Google Docs'
  - 'Google Apps Script'
---

The upcoming release of [Document Studio](https://workspace.google.com/marketplace/app/document_studio/429444628321) includes support for adding markers in the header, footer and the footnotes section of your Microsoft Word template. The add-on will automatically replace this placeholder text with actual values sourced from Google Sheets or Google Forms.

## Replace Header and Footer with Document API

This Apps Script snippet uses the Google Docs API to find and replace multiple blocks of text in the header and footer section of your Google Document. The header and footer sections are children of the parent DOCUMENT section.

```js
const replaceHeaderFooter = () => {
  // Returns the document with the specified ID
  const doc = DocumentApp.openById('DOCUMENT ID');

  // Retrieves the headers's container element which is DOCUMENT
  const parent = doc.getHeader().getParent();

  for (let i = 0; i < parent.getNumChildren(); i += 1) {
    // Retrieves the child element at the specified child index
    const child = parent.getChild(i);

    // Determine the exact type of a given child element
    const childType = child.getType();

    if (childType === DocumentApp.ElementType.HEADER_SECTION) {
      // Replaces all occurrences of a given text in regex pattern
      child.asHeaderSection().replaceText('{{Company}}', 'Digital Inspiration');
    } else if (childType === DocumentApp.ElementType.FOOTER_SECTION) {
      // Replaces all occurrences of a given text in regex pattern
      child.asFooterSection().replaceText('{{Copyright}}', '© Amit Agarwal');
    }
  }

  // Saves the current Document.
  // Causes pending updates to be flushed and applied.
  doc.saveAndClose();
};
```

If the current document doesn't include an header section, the `getHeader()` function will return null so you may wish to include additional checks to determine whether a document has an header or footer.
