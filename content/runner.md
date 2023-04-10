---
title: 'How to Use Google Docs as a Code Runner'
date: '2022-09-22T01:01:01.010Z'
slug: '/javascript-code-in-google-docs-220922'
category: 'Internet'
description: 'There is a way to use Google Docs as a programming IDE and run JavaScript code inside the editor.'
tags:
  - 'Google Apps Script'
  - 'Javascript'
  - 'Archives'
  - 'Google Docs'
---

You have been using Google Docs to write documents and essays but did you know that the same editor can also be used to write and run JavaScript code?

It is no replacement for a dedicated IDE like Visual Studio code but Google Docs can be used as a JavaScript playground to quickly run code snippets.

Here's a [sample document](https://docs.google.com/document/d/12bt1mvzJkI1vTkqGp3PIMIsHh0EBYRplGh5gRZxpWko/copy) written in Google Docs and the document body contains a JavaScript function that calculates the number of days left until the next Christmas.

Go to the `Code Runner` menu, choose `Run JavaScript` and the output of the function will display in a popup. [See demo](https://www.labnol.org/images/2023/google-docs-code-runner.gif)

## Code Runner in Google Docs

Internally, there's a little [Google Apps Script](/topic/google-apps-script/) that is doing the magic. It reads the body of your Google Document as a text string and uses the `eval()` function of JavaScript to evaluate the text.

```js
/**
 * @OnlyCurrentDoc
 */

function codeRunner() {
  const doc = DocumentApp.getActiveDocument();
  const text = doc.getBody().getText();
  const response = eval(text);
  DocumentApp.getUi().alert(response);
}

function onOpen() {
  const ui = DocumentApp.getUi();
  const menu = ui.createMenu('Code Runner');
  menu.addItem('🦄 Run JavaScript ', 'codeRunner');
  menu.addToUi();
}
```

**Related reading:**

- [Call JavaScript functions by Name](/code/20181-call-javascript-function-by-name)
- [JavaScript design patterns](/code/javascript-design-patterns-201220)
