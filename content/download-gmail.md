---
title: 'Download Gmail Messages as EML Files in Google Drive'
date: '2020-10-28'
slug: '/code/download-gmail-eml-201028'
category: 'Code'
tags:
  - 'Google Apps Script'
  - 'Gmail'
  - 'Google Drive'
---

This Google Script will help you download your email messages from Gmail to your Google Drive in the EML format.

## What is the EML Format

The `.eml` file format is popular for transferring emails from one email program to another since it complies with the RFC 822 standard and thus can be natively opened inside Apple Mail and Microsoft Outlook. You can even open EML files inside Google Chrome by dragging the file from your desktop onto a new browser table.

EML files contains the email content (email body, header and encoded images and attachments) as plain text in [MIME format](/code/19840-base64-encoded-email).

### Download Gmail message as EML Files

Inside Gmail, open any email thread, go to the 3-dot menu and choose "Download Message" from the menu. It will turn your current email message into an eml file and save it your desktop.

However, if you wish to [automate the process](https://digitalinspiration.com/) and download multiple emails as eml files in your Google Drive, Apps Script can help.

```javascript
const downloadEmails = () => {
  const sender = 'sender@domain.com';
  const threads = GmailApp.search(`from:${sender}`).slice(0, 10);
  threads.forEach((thread) => {
    const subject = thread.getFirstMessageSubject();
    const [message] = thread.getMessages();
    const rawContent = message.getRawContent();
    const blob = Utilities.newBlob(rawContent, null, `${subject}.eml`);
    const file = DriveApp.createFile(blob);
    Logger.log(subject, file.getUrl());
  });
};
```

The script searches for emails from the specified sender, gets the first email message and downloads it your Google Drive.

### Forward Gmail as EML Attachment

If you are to forward an email message as an attachment, the .eml format may be recommended since it preserves all the formatting and attachments of the original email thread in a single file that can be attached to the email.

```javascript
const forwardEmail = () => {
  const messageId = '123';
  const message = GmailApp.getMessageById(messageId);
  const rawContent = message.getRawContent();
  const blob = Utilities.newBlob(rawContent, null, `email.eml`);
  GmailApp.sendEmail('to@gmail.com', 'This email contains an eml file', '', {
    attachments: [blob],
  });
};
```

Also see: [Download Gmail as PDF Files](https://digitalinspiration.com/GA02)
