---
title: 'How to Encrypt and Decrypt Text Strings with JavaScript'
date: '2020-03-07'
slug: '/code/encrypt-decrypt-javascript-200307'
description: 'A simple method for encrypting and decrypting text strings and passwords in JavaScript and Google Apps Script'
category: 'Code'
tags:
  - 'Google Apps Script'
  - 'Javascript'
---

In one of my web projects, I require simple and easy-to-implement encryption and decryption JavaScript library that could encode a piece of text and then decode the encoded string on the server-side.

The easiest option is the base64 encoding scheme that can be easily implemented in both native JavaScript and Google Apps Script.

### Base64 Encoding with Google Apps Script

```js
const base64Encode = (text) => {
  const base64data = Utilities.base64Encode(text, Utilities.Charset.UTF_8);
  return base64data;
};

const base64Decode = (base64data) => {
  const decoded = Utilities.base64Decode(base64data, Utilities.Charset.UTF_8);
  const input = Utilities.newBlob(decoded).getDataAsString();
  return input;
};
```

### Base64 Encoding with JavaScript

```js
const CryptoJS = require('crypto-js');

const encrypt = (text) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
};

const decrypt = (data) => {
  return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
};
```

The obvious downside is that Base64 is encoding (not encryption) and the Base64 strings can be easily decoded.

If you are looking for a secure encryption algorithm that would require a secret passphrase for decrypting the encrypted text, go with AES. It generates longer strings but they cannot be decrypted without the password.

### AES Plain Text Encryption & Decryption

```js
const CryptoJS = require('crypto-js');

const encryptWithAES = (text) => {
  const passphrase = '123';
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

const decryptWithAES = (ciphertext) => {
  const passphrase = '123';
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
```

### AES Encrypt & Decryption with Google Apps Script

If you would like to use the `AES` encryption algorithm with Google Apps Script, use the Apps Script Starter to import the `CryptoJS` package in your project as shown in this [example](https://github.com/labnol/apps-script-starter/blob/master/src/es6/encrypt-decrypt.js).

```js
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

const encryptWithAES = (text, passphrase) => {
  return AES.encrypt(text, passphrase).toString();
};

const decryptWithAES = (ciphertext, passphrase) => {
  const bytes = AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(Utf8);
  return originalText;
};

global.testAES = () => {
  const inputText = 'Hello World';
  const passphrase = 'My Secret Passphrase';

  Logger.log({ inputText });

  const encryptedText = encryptWithAES(inputText, passphrase);
  Logger.log({ encryptedText });

  const decryptedText = decryptWithAES(encryptedText, passphrase);
  Logger.log({ decryptedText });
};
```

Alternatively, for Google Apps Script, the [cCryptoGS](https://ramblings.mcpher.com/google-apps-scripts-snippets-2/cryptojs-libraries-for-google-apps-script/) library can also be used to implement AES encryption in your projects and Suite add-ons. To get started, go to Resources -> Libraries and add the `MSJnPeIon6nzdLewGV60xWqi_d-phDA33` library to your Google Script project.

```js
const encryptedMessage = cCryptoGS.CryptoJS.AES.encrypt('message', 'passphrase').toString();
Logger.log(encryptedMessage);

const decryptedMessage = cCryptoGS.CryptoJS.AES.decrypt(encryptedMessage, 'passphrase').toString(CryptoJS.enc.Utf8);
Logger.log(decryptedMessage);
```
