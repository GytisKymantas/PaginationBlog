---
title: 'How to Import Lodash in your JavaScript Projects for Lowest Bundle Size'
date: '2021-11-17'
slug: '/code/import-lodash-211117'
description: 'How to correctly include specific functions of the popular lodash library in your web JavaScript project without having to import the entire library.'
category: 'Code'
tags:
  - 'Javascript'
  - 'Coding'
---

[Lodash](https://lodash.com/) is an extremely popular JavaScript library that provides a lot of useful functions for working with strings, arrays and objects in your [web projects](/internet/learn-web-development/31945/).

Some of the Lodash functions are now supported natively in modern JavaScript, but the library still adds value and saves you time.

For instance, if you want to generate a random number between 1 and 10, the `_.random(1, 10)` function is a great way to do it, similar to the `RANDBETWEEN` [function of Google Sheets](/topic/formulas-and-functions/). The `_.shuffle()` function can help you quickly shuffle an array of values.

## The Correct Way to Include Lodash

If your [JavaScript project](https://github.com/labnol/javascript-starter) requires Lodash, you can include the library in your code in 4 different ways.

### 1. Import the entire lodash library

```js
import _ from 'lodash';

const capitalizeFirstName = (name) => {
  const result = _.capitalize(name);
  console.log(response);
};
```

### 2. Import using named aliases

```js
import { capitalize } from 'lodash';

const capitalizeFirstName = (name) => {
  const result = capitalize(name);
  console.log(response);
};
```

### 3. Import specific methods by path

```js
import capitalize from 'lodash/capitalize';

const capitalizeFirstName = (name) => {
  const result = capitalize(name);
  console.log(response);
};
```

### 4. Use per-method lodash packages

```js
import capitalize from 'lodash.capitalize';

const capitalizeFirstName = (name) => {
  const result = capitalize(name);
  console.log(response);
};
```

Which importing method would result in the lowest bundle size?

The option #1 will include the entire lodash library in your output bundle and is not recommended. The second option will also import the full library and should be avoided.

The #4 method of importing per-method lodash packages will result in the lowest bundle size, but it is not recommended since this approach will be deprecated in the future versions of lodash.

The approach #3 is recommended since it will only import the specific Lodash methods you need and also reduce the bundle size.

### Bonus Tip: Memoization with Lodash

The Lodash library includes a [memoization method](/google-script-performance-memoization-211004) called `_.memoize()` which is useful for caching expensive functions.

```js
import memoize from 'lodoash/memoize';

const expensiveFunction = (input) => {
  return input * input;
};

const memoizedFunction = memoize(expensiveFunction);

console.log(memoizedFunction(5)); // Calculates the square of 5
console.log(memoizedFunction(5)); // Returns the cached value
```

There's however a big limitation of memoization with Lodash - it will only use the first parameter of the function as the cache key and ignore the rest. Let me explain.

```js
const add = (a, b) => {
  return a + b;
};

const memoizedAdd = _.memoize(add);
console.log(memoizedAdd(1, 2)); // Calculates the sum of 1 and 2 and caches the result
console.log(memoizedAdd(1, 3)); // Returns the cached value which is 3 (incorrect)
```

As you may have noticed, the second parameter of the function is ignored and thus the result is incorrect since it returned the cached value based on the first parameter itself.

### Memoization with Multiple Parameters

To fix this problem, you can use an alternative memoization library like `fast-memoize` or you can add a resolver function to the memoization method as shown below.

```js
const multiply = (a, b) => {
  return a * b;
};

const resolver = (...args) => {
  return JSON.stringify(args);
};

const memoizedMultiply = _.memoize(multiply, resolver);

console.log(memoizedMultiply(1, 2)); // Calculates the product of 1 and 2 and caches the result
console.log(memoizedMultiply(1, 3)); // Calculates the product of 1 and 3 and caches the result
console.log(memoizedMultiply(1, 2)); // Returns the cached value
```
