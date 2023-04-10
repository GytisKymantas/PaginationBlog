---
title: 'Useful JavaScript Functions'
date: '2020-11-28'
slug: '/code/javascript-functions-201028'
category: 'Code'
tags:
  - 'Javascript'
---

The code snippets are from a [JavaScript course](/internet/learn-web-development/31945/) on [Udemy](/internet/buying-udemy-courses/31851/).

1. Create a function that can be invoked only once.

```js
const once = (fn, ...args) => {
  let called = false;
  return () => {
    if (called === false) {
      called = true;
      return fn(...args);
    }
    return 'Cannot call again';
  };
};

const printName = (text, time) => console.log(`${text} at ${time}`);
const fn = once(printName, 'Google', new Date().toString());

console.log(fn());
console.log(fn());
```

2. Measure the time it takes for a JavaScript function to run.

```js
const getUserData = async (user) => {
  const response = await fetch(`https://api.github.com/users/${user}`);
  const json = await response.json();
  return json;
};

const time = (fn, ...args) => {
  console.time('time');
  const result = fn(...args);
  console.timeEnd('time');
  return result;
};

time(() => getUserData('labnol'));
```

3. A debounce function that delays invocation until a certain amount of time has passed since the last time that debounce function was invoked.

```js
const debounce = (fn, waitInMs) => {
  let debounced = false;
  return (...args) => {
    if (debounced) clearTimeout(debounced);
    debounced = setTimeout(() => fn(...args), waitInMs);
  };
};

const getWindowLayout = (event) => {
  console.log(event, window.innerHeight, window.innerWidth);
};

window.addEventListener('resize', debounce(getWindowLayout, 500));
```
