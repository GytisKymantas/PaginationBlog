---
title: 'Generate firebase.json file for Firebase Redirects'
date: '2020-11-23'
slug: '/code/firebase-json-file-generator-201123'
category: 'Code'
tags:
  - 'Javascript'
  - 'Firebase'
---

We recently moved the user guide for [Mail Merge](https://digitalinspiration.com/docs/mail-merge) and [Form Notifications](https://digitalinspiration.com/docs/form-notifications) from the website `labnol.org` to `digitalinspiration.com`. As with any domain move, we had to manually setup 301 redirects so that the audience are automatically redirected to the new website should they happen to click any of the links that still point to the old domain.

Because the websites are hosted on Firebase, it is easy to setup 301 redirects through the `firebase.json` file. All we need are entries in the `redirects` array, one entry per redirect, specifying the source, the destination URL and it is also possible to define if the redirect is 301 (permanent) or a temporary 302 redirect.

```js
{
  "redirects": [
    {
      "source": "/page1",
      "destination": "https://digitalinspiration.com/page1",
      "type": 301
    },
    {
      "source": "/page2{,/**}", // also redirect pages ending with slash
      "destination": "https://digitalinspiration.com/page2",
      "type": 302
    }
  ]
}
```

When you are migrating big sites, it can become difficult to maintain the `firebase.json` file as 100s of URLs that may have to added in the redirects array. As as workaround, you can create a separate JSON file with all the redirects and then generate the `firebase.json` file dynamically.

The firebase file is generated automatically from the redirects file before the assets are uploaded to Firebase hosting.

**Step 1:** Create a base file `firebase.base.json`. As you can see, we have a few redirects setup already and the new redirect entries will be merged into this array.

```json
{
  "hosting": {
    "public": "public",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "redirects": [
      {
        "source": "/foo{,/**}",
        "destination": "/bar",
        "type": 301
      },
      {
        "source": "/firebase/**",
        "destination": "https://firebase.google.com/",
        "type": 302
      }
    ]
  }
}
```

**Step 2:** Create a `firebase.redirects.json` file with the `links` property that contains an array of links. Each link entry will have the source [regex pattern](/internet/learn-regular-expressions/28841/) or glob, the description URL and the type of redirect (optional).

```json
{
  "links": [
    [
      "/email-google-form-responses-7263",
      "https://digitalinspiration.com/docs/form-notifications/email-multiple-people"
    ],
    [
      "/embed-qrcode-barcode-google-forms-021020",
      "https://digitalinspiration.com/docs/form-notifications/barcode-qrcode"
    ],
    [
      "/internet/google-forms-mobile-notifications/29203",
      "https://digitalinspiration.com/docs/form-notifications/phone-push-notifications",
      false
    ]
  ]
}
```

**Step 3:** Create a `generate.js` that will read the the base file and generate a new `firebase.json` file using redirects listed in the `redirects.json` file. All

```js
const fs = require('fs');

const redirects = fs.readFileSync('firebase.redirects.json');
const { links = [] } = JSON.parse(redirects);

const linkMap = links.map((link) => {
  const [source, destination, permanent = true] = link;
  return {
    source: `${source}{,/**}`,
    destination,
    type: permanent ? 301 : 302,
  };
});

const firebase = fs.readFileSync('firebase.base.json');

const file = JSON.parse(firebase);

file.hosting.redirects = [...file.hosting.redirects, ...linkMap];

fs.writeFileSync('firebase.json', JSON.stringify(file, null, 2));
```

**Step 4:** Inside the `package.json` file, add a new entry in the `script` section to generate the file before the upload step.

```json
{
  "scripts": {
    "generator": "node generate.js",
    "upload": "npm run generator && firebase deploy --only hosting"
  }
}
```

This will ensure that a new `firebase.json` file is regenerated before deployment.
