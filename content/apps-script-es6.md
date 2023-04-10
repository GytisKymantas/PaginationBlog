---
title: 'Write Google Scripts using Modern JavaScript ES6'
date: '2020-02-06'
slug: '/es6-google-apps-script-v8-200206'
category: 'Internet'
description: 'Google Apps Script has made the switch to Chrome V8 JavaScript Engine. You can now write your Google Scripts and GSuite addons directly in ES6 but with a few caveats.'
tags:
  - 'Google Apps Script'
  - 'Code'
  - 'Archives'
---

Google Apps Script has received a [significant upgrade](https://developers.google.com/apps-script/guides/v8-runtime) ever since it was first released to the public more than a decade ago. Apps Script now uses the V8 JavaScript Engine - it is the same runtime that is used inside the Google Chrome browser and the popular Node.js environment.

This essentially means:

- Developers can write code using modern JavaScript syntax like Arrow Functions, Classes, Array Destructuring, Template Literals and more.
- The [V8 Engine](https://v8.dev/) is fast, powerful and continuously improving, It will likely improve the performance and memory utilization of your Google Scripts.
- Developers can use new JavaScript ES6 features like Symbols, Iterators, Generators, Promises, Maps, Sets and Proxies that weren’t available in the previous version of Google Apps Script.

### Chrome V8 JavaScript Engine

Any new projects that you create inside the Google Apps Script editor automatically use the new V8 runtime.

If you would like to upgrade any old project to use V8, go to the Run menu and choose "Enable new Apps Script runtime powered by V8." If you do not see this option yet, add a new **runtimeVersion** field in your project’s manifest file with the value of _V8_. You can set the value to _DEPRECATED_ES5_ to switch to the old version that uses the Mozilla’s Rhino JavaScript engine.

**Tip:** Type `script.new` in your browser to quickly create a new Google Apps Script project in your browser. ([Source](https://twitter.com/labnol/status/1219973358596632583))

### ES6 Modules - The Missing Part

ES6 introduced the concept of modules in JavaScript which allows developers to write reusable code that is also easier to refactor and maintain. You can break your program into separate files (modules) and then import them into other modules using import-export statements.

The new Google Apps Script environment doesn’t support ES6 modules.

The other big change is that functions become available based on the sequence of files in the script editor. Let me explain.

Say your Apps Script project has a lot of files and you have created two functions of the same name but they are located in different files. Apps Script won't complain but when you can call this function, the one that is defined in the bottom-most file of the project will be invoked.

If you prefer the ease of working with ES6 Modules, the [Apps Script Starter kit](https://github.com/labnol/apps-script-starter) can help. You can write code locally inside Visual Studio Code, bundle the modules into a single file with Webpack and then push the bundle to the cloud automatically with Clasp.

The starter kit has also been updated to use the new V8 Runtime. Watch this [YouTube video](https://www.youtube.com/watch?v=KxdCIbeO4Uk) to learn how to [develop with Google Scripts](/internet/google-apps-script-developers/32305/) using the Starter Kit.

### Performance - V8 vs Vanilla JavaScript

Eric Koleda [writes](https://twitter.com/erickoleda/status/1225967927507202050) - "The performance story is mixed. Vanilla JavaScript code (looping, math) runs faster, but calls to G Suite services (SpreadsheetApp, etc) run slightly slower. While not ideal, we've always recommended that performance-intensive apps are usually a better fit for other platforms. In general Apps Script is trying to optimize for ease-of-use, not throughput. If performance is critical to your use case then you may want to investigate Google Cloud Functions, etc."

### Learn Modern JavaScript ES6

Coming back to Javascript, I do have a few recommendations that will help improve your understanding of ECMAScript 6.

- [Understanding ES6](https://leanpub.com/understandinges6/read/) - This online book covers all the new features that have been added to the JavaScript language since ES6.
- [ES6 Udacity](https://www.udacity.com/course/es6-javascript-improved--ud356) - A detailed video course that covers all aspects of ES6, complete with quizzes and doesn’t cost a penny.
- [Exploring ES6](https://exploringjs.com/es6/index.html) - Deep dive into the core ES6 features with examples.
- [ES6+ Introduction](https://scrimba.com/g/gintrotoes6) - An interactive screencast tutorial series that provides a walk-through of the most important ES6+ features.
- [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) - MDN is the best reference site for JavaScript, including ES6.
- If you prefer premium courses, check out the ones by [Maximilian Schwarzmüller](https://www.udemy.com/course/es6-bootcamp-next-generation-javascript/), [Wes Bos](https://es6.io/) and [Stephen Grider](https://www.udemy.com/course/javascript-es6-tutorial/).

Also see: [The Best Online Teachers for Web Development](/internet/learn-web-development/31945/)
