---
title: 'How to Print the Function Call Flow with Stack Trace in JavaScript'
date: '2021-04-27'
slug: '/code/print-stack-trace-210427'
category: 'Code'
description: 'Print the Stack Trace and the function call flow of your JavaScript and Google Apps Script programs.'
tags:
  - 'Javascript'
  - 'Google Apps Script'
---

The `printStackTrace` method of Java is useful for handling exceptions and errors during development. It tells you the exact line number in your source code and the file name where the problem occurred.

If you are working in the JavaScript / Google Apps Script world, you can use the `console.trace()` method to output the complete stack inside the web console ( or StackDriver logs for Google Scripts).

A better alternative is that you parse the `stack` property of the `Error` object. This contains the entire stack trace along with line numbers, column position and the function names.

```js
function printStackTrace() {
  const error = new Error();
  const stack = error.stack
    .split('\n')
    .slice(2)
    .map((line) => line.replace(/\s+at\s+/, ''))
    .join('\n');
  console.log(stack);
}

function three() {
  console.log('Function Three!');
  printStackTrace();
}

function two() {
  console.log('Function Two!');
  three();
}

function one() {
  console.log('Function One!');
  two();
}

one();
```

The output of the `printStackTrace` method looks something like this. The first few lines are the program output and as you move downwards, you'll see a list of methods which invoked the previous method.

```
Function One!
index.js:16 Function Two!
index.js:11 Function Three!
index.js:7 three (index.js:12:3)
two (index.js:17:3)
one (index.js:22:3)
index.js:26:3
index.js:27:3
```

You can use the stack trace to know the exact location of the problematic code in your JavaScript app or if you simply want to print the function calling flow of your JavaScript program without even throwing an exception.
