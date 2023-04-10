---
title: 'How to Build a HTML Form for Uploading Files to Google Cloud Storage'
date: '2022-04-28'
slug: '/file-upload-form-google-cloud-storage-220426'
category: 'Code'
description: 'This tutorial explains how you can build a file upload form for uploading files to Google Cloud Storage. The uploaded files can be made pubic or private.'
tags:
  - 'Javascript'
  - 'Archives'
---

Let's write a simple web application that will allow users to upload files to Google Cloud Storage without authentication. The client site of the application will have an HTML form with one or more input fields. The server side is a Node.js application that will handle the file upload. The application may be deployed to Google Cloud Run, Firebase Function or as a Google Cloud Function.

## HTML Form

Our HTML form includes a name field and a file input field that accepts only image files. Both the fields are required.

When the user submits the form, the form data is sent to the server, encoded as multipart/form-data, using the Fetch API. The server will validate the form data and if the form is valid, it will upload the file to Google Cloud Storage.

```html
<form method="post" enctype="multipart/form-data">
  <input type="text" name="name" id="name" placeholder="Your name" required />
  <input type="file" name="image" accept="image/*" required />
  <input type="submit" value="Submit Form" />
</form>

<script>
  const formElem = document.querySelector('form');
  formElem.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', e.target[0].value);
    formData.append('file', e.target[1].files[0]);
    const response = await fetch('/submitform', {
      method: 'POST',
      body: formData,
    });
    const data = await response.text();
    return data;
  });
</script>
```

## Node.js Application

Our application will have two routes:

1. The home (/) route that will display the form.
2. The submit form route that will handle the file upload.

```js
// index.js
const express = require('express');
const router = require('./router');

const app = express();

app.get('/', (_, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(router);

app.listen(process.env.PORT || 8080, async () => {
  console.log('listening on port 8080');
});
```

Since the Express server cannot handle multi-part form data, we are using the Multer middleware to parse the form data that includes both text content and binary data. Also, we are discarding the original file name of the uploaded file and assigned our own unique file name generated from the `uuid` library.

```js
// router.js
const express = require('express');
const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const storage = new Storage();
const router = express.Router();
const upload = multer();

router.post('/submit', upload.single('file'), async (req, res) => {
  const { name } = req.body;
  const { mimetype, originalname, size } = req.file;
  if (!mimetype || mimetype.split('/')[0] !== 'image') {
    return res.status(400).send('Only images are allowed');
  }
  if (size > 10485760) {
    return res.status(400).send('Image must be less than 10MB');
  }
  const bucketName = '<<GOOGLE_CLOUD_STORAGE_BUCKET_NAME>>';
  const fileExtension = originalname.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtension}`;
  const file = storage.bucket(bucketName).file(fileName);
  await file.save(req.file.buffer, {
    contentType: mimetype,
    resumable: false,
    public: true,
  });
  const url = `https://storage.googleapis.com/${bucketName}/${fileName}`;
  console.log(`File uploaded by ${name}`, url);
  return res.status(200).send(url);
});

module.exports = router;
```

## Using Firebase Functions

If you are planning to deploy your file upload application to Firebase functions, some changes are required since our Multer middleware is not compatible with Firebase functions.

As a workaround, we can convert the image to base64 on the client side and then upload the image to Google Cloud Storage. Alternatively, you may use the `Busboy` middleware to parse the form data.

```js
const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const base64String = fileReader.result;
      const base64Image = base64String.split(';base64,').pop();
      resolve(base64Image);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const handleUpload = async (file) => {
  const base64 = await convertBase64(file);
  const { type, size, name } = file;

  const response = await fetch('/submitform', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ type, size, name, base64 }),
  });

  const url = await response.text();
  console.log(`File uploaded by ${name}`, url);
};
```

The submit form handler will have to be tweaked to convert the base64 image to a buffer and then upload the image to Google Cloud Storage.

```js
router.post('/upload', async (req, res) => {
  const { name, type, size, base64 } = req.body;
  const buffer = Buffer.from(base64, 'base64');
  await file.save(buffer, {
    contentType: type,
    resumable: false,
    public: true,
  });
  return res.send(`File uploaded`);
});
```

### Cors for Cross-origin Requests

If you are serving the form on a different domain than the form handler, you will need to add the `cors` middleware to your application.

```js
const cors = require('cors')({ origin: true });
app.use(cors);
```

You should set the access control policy of your Google Cloud Storage bucket to "Fine-grained" and not "Uniform." When individual files are uploaded to Cloud Storage, they are public but the container folder is still private.
