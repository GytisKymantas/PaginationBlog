---
title: 'Improve Performance of Google Apps Script with Memoization'
date: '2021-10-04T01:10:10.000Z'
slug: '/google-script-performance-memoization-211004'
category: 'Code'
description: 'How to use JavaScript memoization to optimize and improve the performance of your Google Apps Script code.'
tags:
  - 'Google Apps Script'
  - 'Javascript'
---

A folder in Google Drive contains a bunch of CSV files and you are required to write a Google Script to find a particular value in the CSV files. The solution is simple:

1. Use the Drive API to get a list of CSV files in the specified folder.
2. Parse the CSV files one by one using the `Utilities.parseCsv()` function.
3. Read the CSV file, line by line, until the value is found and return the line number.

```javascript
const findContentInCSVFiles = (folderId, searchString) => {
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFilesByType('text/csv');

  while (files.hasNext()) {
    const file = files.next();
    const fileContent = file.getBlob().getDataAsString();
    const linesOfData = Utilities.parseCsv(fileContent, ',');

    let found = false;
    let lineNumber = 0;

    for (; lineNumber < linesOfData.length && !found; lineNumber += 1) {
      const line = linesOfData[lineNumber];
      found = line.find((element) => element === searchString);
    }

    if (found) {
      return `${searchString} found in line #${lineNumber + 1} of file ${file.getName()}`;
    }
  }
  return 'String not found :(';
};
```

## Optimize Google Script Performance

The code to read CSV files and find the required value is simple but not efficient. You've to perform the same expensive operation for every value that you have to search in the folder of CSV files.

Memoization is a simple optimization technique that can be used to improve the performance of your Google Apps Script code. The basic idea is that you cache the results of an expensive function call using [closures](/code/20585-closures-javascript). If the function is called again with the same arguments, the cached result is returned instead of calling and executing the function all over again.

```javascript
const memoize = (func) => {
  // Cache for storing the previously computed results
  const cache = {};
  return (...args) => {
    // Serializer to convert N arguments to a string
    const key = JSON.stringify(args);
    if (typeof cache[key] === 'undefined') {
      cache[key] = func(...args);
    }
    return cache[key];
  };
};

const memoizedFindFunction = memoize(findContentInCSVFiles);

const findContentInFiles = () => {
  const FOLDER_ID = '<<folder id>>';
  const SEARCH_STRING = 'hello world!';
  const response = memoizedFindFunction(FOLDER_ID, SEARCH_STRING);
  Logger.log(resonse);
};
```

The memoization function is called with the arguments of the original function. The result of the function is stored in a cache and returned when the same arguments are passed again.
