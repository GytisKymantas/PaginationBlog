---
title: 'How to Upload Files to Google Drive with Node.js, Express and Multer'
date: '2022-04-12'
slug: '/google-drive-api-upload-220412'
category: 'Code'
description: 'This tutorial explains how you can upload files to Google Drive that are submitted through a web form and encoded as multipart/form-data.'
tags:
  - 'Google Drive'
  - 'Javascript'
  - 'Archives'
---

This step by step guide describes how you can build a web form for uploading files to Google Drive using Node.js, Express and Multer.

The web form encodes the files as multipart/form-data and sends the data in a `POST` request to the Node.js application. Multer is a Express middleware for handling multipart form data.

## 1. Create HTML Form

The HTML form contains a file upload field that allows multiple files to be uploaded. It also includes text fields for the respondent's name, email and country.

When the form is submitted, it uses the browser's built-in File API to send the files to the Node.js application.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>

  <body>
    <form>
      <input type="file" name="Files" required multiple />
      <input type="text" name="Name" placeholder="Name" />
      <input type="email" name="Email Address" placeholder="Email" required />
      <input type="text" name="Country" placeholder="Country" />
      <button type="submit">Submit</button>
    </form>
  </body>

  <script>
    const formElem = document.querySelector('form');
    formElem.addEventListener('submit', async (e) => {
      e.preventDefault();
      await fetch('/upload', {
        method: 'POST',
        body: new FormData(formElem),
      });
    });
  </script>
</html>
```

## 2. Create Node.js Application

The Node.js application will receive the files from the form and upload them to Google Drive. The home route will render the HTML page that contains the form.

```js
// index.js

const express = require('express');
const uploadRouter = require('./router');

const app = express();

app.get('/', (_, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(uploadRouter);

app.listen(8080, () => {
  console.log('Form running on port 8080');
});
```

## 3. Google Drive Upload Router

Multer adds a body object and a files object to the request object. The body object contains the text fields of the form, while the files object will contain the files uploaded via the form.

You may authenticate the Google Drive service with a [service account](/google-api-service-account-220404). Create a new folder in Google Drive, share that folder with the service account's email address and replace DRIVE_FOLDER_ID with the ID of the folder.

```js
// router.js

const stream = require('stream');
const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');

const uploadRouter = express.Router();
const upload = multer();

const uploadFile = async (fileObject) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google.drive({ version: 'v3' }).files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: ['DRIVE_FOLDER_ID'],
    },
    fields: 'id,name',
  });
  console.log(`Uploaded file ${data.name} ${data.id}`);
};

uploadRouter.post('/upload', upload.any(), async (req, res) => {
  try {
    const { body, files } = req;

    for (let f = 0; f < files.length; f += 1) {
      await uploadFile(files[f]);
    }

    console.log(body);
    res.status(200).send('Form Submitted');
  } catch (f) {
    res.send(f.message);
  }
});

module.exports = uploadRouter;
```
