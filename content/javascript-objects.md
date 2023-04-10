---
title: 'JavaScript Objects Quick Reference'
date: '2020-11-26'
slug: '/code/javascript-objects-201126'
description: 'Everything you need to know for working with JavaScript Objects'
category: 'Code'
tags:
  - 'Javascript'
---

Any object in JavaScript is a collection of key-value pairs. The key, also known as a property, is a unique string that maps to a value which may be a Boolean, String or another object.

Let's take a simple person object that contains properties like name, age and the employment status.

```js
const person = {
  name: 'John',
  age: 21,
  gender: 'Male',
  employed: false,
};
```

- Check if a property (or key) exists in an object

```js
console.log('country' in person); // returns false
console.log('employed' in person); // returns true
console.log(person.hasOwnProperty('gender'));
```

- Iterate over an object and print the key-value pairs

```js
Object.keys(person).forEach((key) => {
  console.log(`${key}: ${person[key]}`);
});

Object.entries(person).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});
```

- Prevent new properties from being added to the object

```js
Object.preventExtensions(person);
person.full_name = 'John Q Public';
console.log(person); // the full name property is not added
```

- Check if new properties can be added to an object

```js
Object.isExtensible(person);
delete person.name; // you can still delete properties
```

- Prevent properties from getting added or deleted

```js
Object.seal(person);
delete person.age;
console.log(person.age); // the property is not deleted
```

- Check if properties can be added or deleted from any object

```js
Object.isSealed(person);
```

- Prevent properties from getting added, deleted or modified

```js
Object.freeze(person);
```

- Check if an object can be modified

```js
Object.isFrozen(person);
```

- Combine two objects (use default values)

```js
const defaultPerson = {
  name: 'Unknown',
  country: 'Unknown',
};

const newPerson = {
  name: 'John',
  age: 21,
};

const mergedPerson = Object.assign(defaultPerson, newPerson);
console.log(mergedPerson);
```

- Create a shallow clone of an object

```js
const clone = Object.assign({}, person);
// changes to the clone will not modify the original object
```
