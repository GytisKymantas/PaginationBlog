---
title: 'How to Share User Properties between Google Apps Script Projects'
date: '2020-12-01'
slug: '/code/share-properties-data-201201'
category: 'Code'
tags:
  - 'Google Apps Script'
  - 'Javascript'
---

The Properties Service of Google Apps Script is used by developers to store app configuration and user specific settings. The properties data is scoped to a specific user, or a specific project, and cannot be shared between different projects.

The [Email Form Notifications](https://gsuite.google.com/marketplace/app/email_notifications_for_google_forms/984866591130) add-on also uses the Properties Service to store rules that are defined by the user. The rules created by User A are not accessible to User B.

However, in some specific cases, we may want to give access to our store data to another user so they may build upon the existing configuration rather than having to build everything from scratch.

The new [import export](https://digitalinspiration.com/docs/form-notifications/import-export-rules) option allows the user to export properties data as a plain text file that can be imported into the property store of another user.

### Access the Property Store

On the server side (Google Script), we define two methods - one for exporting data as a JSON file and the other method for importing data from the property store of another user into our own.

```js
/* Choose DocProperties for editor add-ons */
const getStore = () => {
  return PropertiesService.getUserProperties();
};

/* Export user settings */
const exportUserData = () => {
  const data = getStore().getProperties();
  return JSON.stringify(data);
};

/* Import user settings */
const importUserData = (data) => {
  const json = JSON.parse(data);
  getStore().setProperties(json);
  return 'OK';
};
```

### Export User Properties as a Text File

For exporting data, the HTML file contains a simple download button that connects to the server, fetches the data and allows the user to save this data as a text file on their computer.

```html
<p>Export Data</p>
<button onclick="downloadFile();return false;" href="#">Export</button>

<script>
  function downloadFile() {
    google.script
      .withSuccessHandler(function (data) {
        var a = document.createElement('a');
        var blob = new Blob([data], {
          type: 'text/plain',
        });
        var url = URL.createObjectURL(blob);
        a.setAttribute('href', url);
        a.setAttribute('download', 'file.txt');
        a.click();
      })
      .exportUserData();
  }
</script>
```

### Import User Properties from a Text File

For importing data into the property store, the user can upload a text (JSON) file that contains data as key-value pairs. These files are easily readable in any text editor and you can also add define new properties by adding new keys to the JSON file.

```html
<p>Import data</p>
<input type="file" id="file" accept="text/plain" />

<script>
  document.getElementById('file').addEventListener(
    'change',
    function (event) {
      var file = event.target.files[0];
      if (file.type !== 'text/plain') {
        window.alert('Unsupported file');
        return;
      }
      var reader = new FileReader();
      reader.onload = function (e) {
        google.script.run
          .withSuccessHandler(function (success) {
            window.alert(success);
          })
          .withFailureHandler(function (err) {
            window.alert(err);
          })
          .importUserData(e.target.result);
      };
      reader.readAsText(file);
    },
    false
  );
</script>
```

The File Reader API of JavaScript is used to read the contents of the selected text file. The `onload` event gets fired when the file has been successfully read in memory.

The `readAsText` method of File Reader will read the file as a string but you may also use the `readAsDataURL` method should be wish to upload file in [base64 encoded](/code/19920-encode-decode-base64-javascript) format that can be [decoded](/code/19837-decode-base64-email) on the server.
