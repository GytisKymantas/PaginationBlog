---
title: 'How to Find and Replace Text in Google Docs with RegEx Search Patterns'
date: '2021-12-07T01:10:10.000Z'
slug: '/find-replace-text-google-docs-210708'
category: 'Code'
tags:
  - 'Google Docs'
  - 'Regular Expressions'
  - 'Google Apps Script'
  - 'Google Workspace'
---

It is easy to [search and replace text](/replace-text-links-documents-210602) in Google Documents with the `DocumentApp` service of Google Apps Script. You can use use `findText` method with simple regular expressions to find text elements in the document that match a pattern and replace them with the specified text.

Here's a simple code sample that replaces the first occurrence of the "GSuite" with "Google Workspace" in the active Google Document.

```js
const searchAndReplaceInGoogleDocs = () => {
  const searchText = 'GSuite';
  const replaceText = 'Google Workspace';

  const document = DocumentApp.getActiveDocument();
  const documentBody = document.getBody();

  const searchResult = documentBody.findText(searchText);

  if (searchResult !== null) {
    const startIndex = searchResult.getStartOffset();
    const endIndex = searchResult.getEndOffsetInclusive();
    const textElement = searchResult.getElement().asText();
    textElement.deleteText(startIndex, endIndex);
    textElement.insertText(startIndex, replaceText);
  }

  document.saveAndClose();
};
```

All well and good but in some cases, this simple search and replace function may fail if the search text does not transform into a valid [regular expression](/internet/learn-regular-expressions/28841/).

For instance, if you have a text block like `Hello (World` in the document (notice the extra open bracket) that you would like to replace with `Hello World`, the above snippet will fail with an error message that says `Exception: Invalid regular expression pattern`.

To get around the problem, it is a good idea to replace all the special characters in the search pattern that have a special meaning in the RegEx world. These include characters like hyphen, brackets, question marks or the plus symbol.

Our modified search and replace function would then become:

```js
const escapeRegex = (str) => str.replace(/[-[\]/{}()*+?.\\^$|#]/g, '\\$&');

const searchAndReplaceInGoogleDocs = () => {
  const searchText = 'Hello (World';
  const replaceText = 'Hello World';

  const document = DocumentApp.getActiveDocument();
  const documentBody = document.getBody();

  const searchResult = documentBody.findText(escapeRegex(searchText));

  if (searchResult !== null) {
    const startIndex = searchResult.getStartOffset();
    const endIndex = searchResult.getEndOffsetInclusive();
    const textElement = searchResult.getElement().asText();
    textElement.deleteText(startIndex, endIndex);
    textElement.insertText(startIndex, replaceText);
  }

  document.saveAndClose();
};
```
