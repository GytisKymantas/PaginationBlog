---
title: 'How to Suspend a Google Script to Avoid Limits'
date: '2020-04-24'
slug: '/code/suspend-google-script-trigger-200424'
category: 'Code'
tags:
  - 'Google Apps Script'
---

Google Script imposes [quotas](https://developers.google.com/apps-script/guides/services/quotas) around different services. If your script exceeds the specified quota, it throws an exception and terminates execution until the quota is reset.

For instance, a Google Script can read 20,000 email messages from Gmail per 24 hours before it throws an exception like `Service invoked too many times`.

The [Save Gmail](https://gsuite.google.com/marketplace/app/save_emails_and_attachments/513239564707) addon [downloads email messages from Gmail](/internet/send-gmail-to-google-drive/21236/) and writes them as [PDF files](/internet/save-gmail-in-google-docs/21045/) to your Google Drive. It uses a time-based trigger to run the script in the background or a user can manually run the app to download emails.

If a user's Gmail account has a large number of emails and they try to run the script too frequently, it could exceed the quota and the trigger may fail. It thus help to have some sort of checks in the script that will temporarily pause the script execution if a known exception if thrown.

```js
const suspend = (timeInMinutes = 60) => {
  CacheService.getScriptCache().put('SUSPEND', Date.now(), timeInMinutes * 60);
};

const isSuspended = () => {
  return CacheService.getScriptCache().get('SUSPEND');
};
```

We are using the CacheService of Google Script to track if a script has been suspended.

The expiry time is set to 60 minutes so the script will automatically resume execution once the cache value has expired.

In the main app, we add a `try catch` block that parses the exception message. It the message matches one of the known errors - like `Service using too much computer time for one day` or `Service invoked too many times` - we pause the script for 60 minutes.

```js
const app = () => {
  try {
    // download emails
  } catch ({ message }) {
    if (/Service invoked too many times/.test(message)) {
      suspend(60);
    }
  }
};

const hourlyTrigger = () => {
  if (!isSuspended()) {
    app();
  }
};
```

The next time our `hourlyTrigger` is invoked, it will run the main app only if the Google Script is not in suspended state. As we are using the Cache Service here, the suspended state is automatically reset when the cache expires.
