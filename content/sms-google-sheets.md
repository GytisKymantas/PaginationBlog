---
title: 'How to Send SMS Messages with Google Sheets and Android Phone'
date: '2022-04-02'
slug: '/send-sms-google-sheets-200402'
category: 'Code'
description: 'Send personalized text messages to your contacts with the help of Google Sheets and Android phone. The SMS messages go directly from your phone SIM, no third-party SMS service is required.'
tags:
  - 'Android'
  - 'SMS'
  - 'Google Sheets'
  - 'Archives'
---

The [Mail Merge for Gmail](https://workspace.google.com/marketplace/app/mail_merge_with_attachments/223404411203) add-on lets you [send personalized emails](/internet/personalized-mail-merge-in-gmail/20981/) via Gmail but wouldn’t it be nice if a similar solution existed for [sending personalized SMS](/send-sms-text-messages-220919) to your contacts directly from your mobile phone?

There are services, [Twilio SMS](https://digitalinspiration.com/docs/document-studio/google-sheets/sms-twilio) for example, that let you send text messages programmatically to any phone number in the world. You can either build an SMS solution on top of these messaging APIs or you can take a simpler and less expensive route - build your own text-sending app with Google Sheets and MIT's App Inventor.

`video: https://www.youtube.com/watch?v=PReU4ITp37I`

Before getting the implementation, let me give you a quick demo of our text-messaging app for [sending SMS](https://www.youtube.com/watch?v=PReU4ITp37I) from any Android phone. You can send texts to any number in your country as well as global phone numbers if international texting is enabled on your phone. You’ll pay the standard text messaging rates as per your cellular plan.

Here’s my Google Sheet with the source data.

The Google Sheet can have multiple columns for SMS personalisation but the three essential columns that should be present in the sheet are Phone (for your contact’s phone number), Status (whether the SMS was sent to that phone) and Text (the personalized text message).

You can use [ArrayForumula](/internet/arrayformula-copy-formulas-in-entire-column/29711/) with simple concatenation to build the text messages string from different columns as shown below:

```js
=ArrayFormula(
    IF(NOT(ISBLANK(A2:A)),
      A2:A & " " & B2:B & " - I will see you in " & C2:C,
    )
)
```

Now that your source data is ready in the sheets, we will use [Google Apps Script](/topic/google-apps-script/) to convert our Google sheets data into an API. This would enable our Android app to read the sheets' data with a simple HTTPS request.

Inside the sheets, go to Tools, Script Editor and paste this code.

```javascript
const SHEET_URL = 'YOUR_GOOGLE_SHEET_URL';
const SHEET_NAME = 'SMS';

const doGet = () => {
  const sheet = SpreadsheetApp.openByUrl(SHEET_URL).getSheetByName(SHEET_NAME);
  const [header, ...data] = sheet.getDataRange().getDisplayValues();

  const PHONE = header.indexOf('Phone');
  const TEXT = header.indexOf('Text');
  const STATUS = header.indexOf('Status');

  const output = [];

  data.forEach((row, index) => {
    if (row[STATUS] === '') {
      output.push([index + 1, row[PHONE], row[TEXT]]);
    }
  });

  const json = JSON.stringify(output);

  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.TEXT);
};

const doPost = (e) => {
  const sheet = SpreadsheetApp.openByUrl(SHEET_URL).getSheetByName(SHEET_NAME);
  const [header] = sheet.getRange('A1:1').getValues();
  const STATUS = header.indexOf('Status');
  var rowId = Number(e.parameter.row);
  sheet.getRange(rowId + 1, STATUS + 1).setValue('SMS Sent');
  return ContentService.createTextOutput('').setMimeType(ContentService.MimeType.TEXT);
};
```

Next, go to the Publish menu in the Google Script Editor, choose `Deploy as web app`. Choose “Me” under “Execute the App” setting and “Anyone, even anonymous” under the “Who has access” setting.

Click the Deploy button and you’ll be presented with a secret API URL that we’ll require in the next step. Do **NOT** share this API URL with anyone.

Now that our sheets API is ready, we’ll build an Android app that will read the list of text messages and phone numbers from our Google Sheets and send the SMS messages. The texts go directly from your phone SIM instead of using any third-party SMS gateway service.

### Build SMS App for Android without Coding

You’d normally need to know [programming](/internet/learn-coding-online/28537/) [languages](/internet/learn-web-development/31945/) like Flutter or Java to build Android apps but in this tutorial, we’ll use MIT’s App Inventor, a simple way to develop fully functional apps with drag-n-drop.

Sign-in to the [appinventor.mit.edu](http://ai2.appinventor.mit.edu/) website with your Google account and create a new App. While you are in the design mode, drag the following components on to your app:

- User Interface, ListView -> For displaying the message list fetched from Google Sheets.
- User Interface, Button -> For fetching messages from Google Sheets and for sending SMS messages from the Android app.
- Connectivity, Web -> For making GET and POST requests to Apps Script.
- User Interface, Notifier -> For displaying progress bars and alerts
- Social, Texting -> For sending the SMS messages.

Next switch to the Blocks section inside App Inventor and design the blocks as explained in the [video tutorial](https://www.youtube.com/watch?v=PReU4ITp37I).

We are almost done.

Go to the Build menu inside App Inventor, choose `App (provide QR code for .apk)` and [scan the QR code](/software/scan-qr-code-with-google/27955/) with your phone. It will download an APK file on the phone, [install the APK](/tech/install-apk-on-android/19885/) and you are ready to send text messages.
