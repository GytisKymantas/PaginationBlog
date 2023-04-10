---
title: 'How to Replace Text and Hyperlinks in Google Documents with Apps Script'
date: '2021-06-02T01:10:10.000Z'
slug: '/replace-text-links-documents-210602'
category: 'Code'
tags:
  - 'Google Docs'
  - 'Google Apps Script'
---

The company's handbook is written in Google Docs. The document spans several pages and now the writer has been asked to create links such that all mentions of the company name in the document are linking to the company's official website.

It can be a time consuming task but with Google Apps Script, specific words in a document can be hyperlinked in bulk in one click.

### Add Hyperlinks in Google Docs

This example show how to search and replace all occurrences of a text phrase, the company name in this case, and add links to a specific website.

```js
const addLinks = () => {
  const searchPhrase = 'Digital Inspiration';
  const hyperlink = 'https://digitalinspiration.com/';

  const document = DocumentApp.getActiveDocument();
  const body = document.getBody();
  let search = null;

  while ((search = body.findText(searchPhrase, search))) {
    const searchElement = search.getElement();
    const startIndex = search.getStartOffset();
    const endIndex = search.getEndOffsetInclusive();
    searchElement.asText().setLinkUrl(startIndex, endIndex, hyperlink);
  }

  document.saveAndClose();
};
```

### Change Text of Hyperlinks in Google Docs

For the next iteration of the handbook, the company's name has changed but the website domain is the same. The writer is required to change every instance of the company's name in the document but the underlying hyperlink should not be modified..

```js
const changeText = () => {
  const searchText = 'Blue Widgets Inc.';
  const replaceText = 'Orange Inc.';

  const document = DocumentApp.getActiveDocument();
  const body = document.getBody();
  let search = null;

  while ((search = body.findText(searchText, search))) {
    const searchElement = search.getElement();
    const startIndex = search.getStartOffset();
    const endIndex = search.getEndOffsetInclusive();

    const textElement = searchElement.asText();
    const existingLink = textElement.getLinkUrl(startIndex);
    textElement.deleteText(startIndex, endIndex);
    textElement.insertText(startIndex, replaceText);
    textElement.setLinkUrl(startIndex, startIndex + replaceText.length - 1, existingLink);
  }

  document.saveAndClose();
};
```

### Change Text and Hyperlinks in Google Docs

The next Apps Script snippets shows how to change all instance of the company name and also replace the site URL with another domain name.

```js
const changeTextWithUrl = () => {
  const searchText = 'Blue Widgets Inc.';
  const replaceText = 'Orange Inc.';
  const replaceUrl = 'https://digitalinspiration.com/';

  const document = DocumentApp.getActiveDocument();
  const body = document.getBody();
  let search = null;

  while ((search = body.findText(searchText, search))) {
    const searchElement = search.getElement();
    const startIndex = search.getStartOffset();
    const endIndex = search.getEndOffsetInclusive();

    const textElement = searchElement.asText();
    textElement.deleteText(startIndex, endIndex);
    textElement.insertText(startIndex, replaceText);
    textElement.setLinkUrl(startIndex, startIndex + replaceText.length - 1, replaceUrl);
  }

  document.saveAndClose();
};
```
