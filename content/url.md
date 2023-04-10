---
title: 'How to Open a Website in New Window from Google Sheets Menu'
date: '2022-05-07'
slug: '/open-webpage-google-sheets-220507'
category: 'Code'
description: 'This tutorial how to open a web page in new window from a menu option in Google Sheets'
tags:
  - 'Google Apps Script'
  - 'Google Sheets'
  - 'Archives'
---

Let's say you have built an add-on for Google Sheets that adds a new menu item to the sheets UI. You would now like to add an option in the menu that, when clicked, will redirect the user to your website without the user having to click any other button.

For instance, in this [demo Google Sheet](https://docs.google.com/spreadsheets/d/1U079TFY4CEZEzPoPVeTBP5cHRXTvH2x1VjjDysZmjG8/edit#gid=0), we have a parent menu and a sub-menu that opens the underlying website in the new window.

## 1. Add Menu in Google Sheets

As a first step, we'll add a custom menu in the Google Sheet and invoke it from the `onOpen` function so the menu is always available when a user opens your Google Sheet.

```js
const onOpen = () => {
  const ui = SpreadsheetApp.getUi();
  const parentMenu = ui.createMenu('👩🏻‍💼  Digital Inspiration');
  parentMenu.addItem('Visit our website', 'openWebsite');
  parentMenu.addToUi();
};
```

## 2. Add HTML for Website Redirection

Create a new file `url.html` in the Apps Script editor and add the following code.

The JavaScript uses the `window.open` method to open the URL in a new window since we have set the target to `_blank`.

```html
<!DOCTYPE html>
<html>
  <body>
    <a href="<?= url; ?>" target="_blank">Click here</a> to open the webpage.
  </body>
  <script>
    var windowReference = window.open('<?= url; ?>', '_blank');
    if (windowReference !== null) {
      google.script.host.close();
    }
  </script>
</html>
```

### Open Window in Popup

If you would like to open the website in a fixed size popup, instead of a new window, the function would be written as:

```html
<script>
  var windowFeatures = 'popup';
  var windowReference = window.open('<?= url; ?>', 'scriptWindow', windowFeatures);
  if (windowReference !== null) {
    google.script.host.close();
  }
</script>
```

The return value of the `window.open` method will be null if the window has been blocked by the browser's built-in popup blockers.

The popup can be positioned anywhere on the script and resized to a specific height and width by modifying the windowFeatures variable as below:

```js
// before
var windowFeatures = 'popup';

// after
var windowFeatures = 'left=100,top=100,width=320,height=320';
```

Please see the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) for best practices around solving a few usability problems related to links opening secondary window.

## 3. Open link from Google Sheets

Next, we'll write the Apps Script function that will be invoked from the menu and launch the website in a new window / tab.

```js
const openWebsite = () => {
  const htmlTemplate = HtmlService.createTemplateFromFile('url.html');
  htmlTemplate.url = 'https://digitalinspiration.com/';
  const htmlOutput = htmlTemplate.evaluate().setHeight(50).setWidth(200);
  const ui = SpreadsheetApp.getUi();
  ui.showModelessDialog(htmlOutput, 'Open Website');
  Utilities.sleep(2000);
};
```

It is necessary to add the `sleep` function as opening the window may take a second or two. If `sleep` is omitted, the Spreadsheet dialog will open and instantly close without launching the website.
