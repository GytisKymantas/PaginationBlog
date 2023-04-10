---
title: 'JavaScript Design Patterns'
date: '2020-12-20'
slug: '/code/javascript-design-patterns-201220'
category: 'Code'
tags:
  - 'Javascript'
---

This article is a summary of the various design patterns in JavaScript that help us create clean, easier to maintain code without polluting the global namespace.

### Object Literal Design Pattern

To avoid the possibility of collusion with other variables of the same name in the global namespace, take all your variables and functionn and make them part of an object with a unique name.

```js
var com = com || {};
com.digitalinspiration = com.digitalinspiration || {};
com.digitalinspiration.person = {
  _name: 'Amit Agarwal',
  _country: '',
  setCountry: function (country) {
    this._country = country;
  },
  printCountry: function () {
    console.log(this._name + ' lives in ' + this._country);
  },
};
com.digitalinspiration.person.setCountry('India');
com.digitalinspiration.person.printCountry();
```

### Module Design Pattern

This pattern helps create private variables in JavaScript that cannot be accessed from the global scope as everything is wrapped inside an IIFE. We create a module that returns an object containing all the public functions. The variable are not accessible outside the module.

```js
var personModule = (function () {
  // private variables and methods
  var _name = 'Amit Agarwal';
  var _country = '';
  var print = function () {
    console.log(_name + ' lives in ' + _country);
  };
  return {
    setCountry: function (country) {
      _country = country;
    },
    printCountry: function () {
      console.log('Calling private method to print ' + _country);
      print();
    },
  };
})();

personModule.setCountry('India');
personModule.printCountry();
```

### Module Reveal Pattern

The Reveal Module design pattern makes it easy for the private methods and properties to communicate with the public methods. All methods and variables are hidden unless deliberately exposed inside the returning object.

```js
var personModule = (function () {
  var _name = 'Amit Agarwal';
  var _interests = [];
  function _printInterests() {
    console.log(_name + ' likes ' + _interests.join(', '));
  }
  function addInterest(interest) {
    _interests.push(interest);
  }
  function printInterests() {
    console.log('Calling private method');
    _printInterests();
  }
  return {
    printInterests: printInterests,
    addInterest: addInterest,
  };
})();

personModule.addInterest('Travel');
personModule.addInterest('Reading');
personModule.printInterests();
```

### Avoid the Global Scope

Here we conditionally add our module to the global scope and make everyithng private by wrapping our entire module in an IIFE. The advantage with the pattern is that we are not immediately adding elements to the global scope but performing checks to avoid overriding names.

```js
(function (win) {
  var personModule = (function () {
    var _name = 'Amit Agarwal';
    function printName() {
      console.log(_name);
    }
    return {
      printName: printName,
    };
  })();
  if (!win.personModule) {
    win.personModule = personModule;
  } else {
    throw new Error('Cannot initialize application');
  }
})(window);

window.personModule.printName();
```
