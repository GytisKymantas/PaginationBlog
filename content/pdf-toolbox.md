---
title: 'How to Password Protect Google Documents and PDF files in Google Drive'
date: '2020-10-17'
slug: '/password-protect-pdf-201017'
category: 'Internet'
description: 'Learn how to quickly protect your Google Documents and PDF files in Google Drive with a password. You can also unlock PDF files and remove passwords from encrypted files.'
tags:
  - 'Google Drive'
  - 'PDF'
  - 'Archives'
---

Introducing [PDF toolbox](https://gsuite.google.com/marketplace/app/pdf_toolbox/46881712139), a new Google Drive addon that lets you password protect PDF files and Google Documents. The app can also help you unlock PDF files that are already protected with a password in your Google Drive.

Watch the [video tutorial](https://www.youtube.com/watch?v=yC1VAXQNXpw) to get started.

`video: https://www.youtube.com/watch?v=yC1VAXQNXpw`

## Password Protect PDF Files

To get started, install the [PDF toolbox](https://gsuite.google.com/marketplace/app/pdf_toolbox/46881712139) add-on and grant the necessary authorization. The app requires access to the file that you would like to encrypt (or decrypt) and you also have an an option to send the encrypted file as an email attachment to another user.

Next, select any PDF file or Google document in your Google Drive and expand the "Encrypt PDF" section. Enter the output file name (it will also be saved in your Google Drive), provide a password and specify whether the encrypted file should allow printing and comments.

Click the `Encrypt` button to create a new PDF file that would require a password to open.

The app can secure PDF files as well as Google documents, spreadsheet and presentations. In the case of native Google documents, the file is first converted to a PDF document and then encrypted with the specified password.

Please note that the Google Drive API imposes a limit of 10 MB on the size of PDF files exported from native Google documents. Thus, similar restrictions apply with the toolbox as well.

### Unlock PDF files

If you a password-protect PDF file in your Google Drive, you can use the PDF toolbox to remove the password protection. The app will create a new copy of the PDF file in your Drive that will open without requiring a password.

The workflow is similar.

Select any locked PDF in Google Drive and open the PDF toolbox app in the sidebar. Expand the "Decrypt PDF" section and and type the password that was originally used to restrict access to the PDF file.

Click the `Decrypt` button and, if the password matches, all restrictions would be removed from the file. The unlocked, password-free PDF file would be uploaded to Google Drive as a separate file.

### How PDF toolbox works

All files in Google Drive have an [export link](/internet/direct-links-for-google-drive/28356/) to download the file in PDF format. The app uses the export URL to fetch the PDF version of a file in Google Cloud storage, encrypts (or decrypts) the file with the PDF library and uploads the processed file to Google Drive of the authorized user.

All downloaded files are instantly removed from the cloud storage after the PDF file has been exported. PDF toolbox is in beta stage and the pricing will be added later this month.
