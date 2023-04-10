---
title: 'Count the Number of Words and Characters in a Google Document'
date: '2020-01-18'
slug: '/code/count-google-document-words-200118'
category: 'Code'
tags:
  - 'Google Apps Script'
  - 'Google Docs'
---

If you were to count the number of words and characters in a Google Document, open the document, go to the Tools menu and choose Word Count. That's a good option for counting words in a single document manually but what if you have a folder of files in Google Drive, say student assignments, and wish to know the words or characters per document.

That's where Google Apps Script can help.

Go to Tools > Script Editor and paste the code to programmatically get the word count of any document in Google Document. You can either provide the document ID to the function or it will use the currently opened document.

```javascript
function getWordCount(fileId) {
  const SEPARATOR = ' ';
  const document = fileId ? DocumentApp.openById(fileId) : DocumentApp.getActiveDocument();
  const text = document.getBody().getText();
  const words = text.replace(/\s+/g, SEPARATOR).split(SEPARATOR);
  const characters = words.join('');
  Logger.log('Word Count: ' + words.length);
  Logger.log('Character Length: ' + characters.length);
}
```

A more advanced version of the function uses [regular expressions](https://www.labnol.org/internet/learn-regular-expressions/28841/) and it can work with Chinese, Japanese and Korean scripts - [Credit](https://github.com/lepture/editor/blob/master/src/intro.js#L343).

```javascript
function getWordCountCJK(data) {
  var pattern = /[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
  var m = data.match(pattern);
  var count = 0;
  if (m === null) return count;
  for (var i = 0; i < m.length; i++) {
    if (m[i].charCodeAt(0) >= 0x4e00) {
      count += m[i].length;
    } else {
      count += 1;
    }
  }
  return count;
}

function getWordCount(fileId) {
  const SEPARATOR = ' ';
  const document = fileId ? DocumentApp.openById(fileId) : DocumentApp.getActiveDocument();
  const text = document.getBody().getText();
  const count = getWordCountCJK(text);
  Logger.log('Word Count: ' + count);
}
```
