---
title: 'How to Send Reminder Emails Based on Dates in Google Sheets'
date: '2020-04-25'
slug: '/send-reminder-emails-200425'
category: 'Internet'
description: 'How to send automatic emails to your contacts based on different dates specified in a Google Sheet. Use it for sending reminder email when a due date is reached.'
tags:
  - 'Archives'
  - 'Mail Merge for Gmail'
---

John Q Public runs a travel agency and they have thousands of clients across the globe. Other than managing tickets and travel itineraries, the agency also keeps a record of passports and visas of their clients to ensure that customers have valid documents at the time of travel.

Most countries require that a foreigner’s passport must be valid for at least six months from the date of entry. The US government, therefore, recommends that you renew your passport at least nine months before it expires.

## Send Automatic Emails with Google Sheets

John’s agency is looking for a reminder system that will automatically send an email notification to their customers when their passports have expired or are due for renewal in the next few months. Let’s see how they can build such a workflow in 10 minutes with the help of [Mail Merge for Gmail](https://gsuite.google.com/marketplace/app/mail_merge_with_attachments/223404411203).

The idea is simple.

We have the customer data in a Google Sheet or a Microsoft Excel spreadsheet. The “Expiry Date” column in the spreadsheet contains the date when the passport is set to expire. We setup a cron job that runs in the background and monitors the expiry date. If any date in the sheet is less than, say, 12 months from today, an automatic email reminder is sent to the customer.

### Create the Reminder Email Workflow

To get started, install the [Mail Merge for Gmail](https://gsuite.google.com/marketplace/app/mail_merge_with_attachments/223404411203) add-on for Google Sheets. If you have never used the merge add-on earlier, please watch the [Mail Merge tutorial](https://www.youtube.com/watch?v=ChGBcFtYdVA) for a quick overview.

Next, create a new Google Sheet and choose Addons > Mail Merge with Attachments > Create Merge Template. If you have your customer data in an Excel sheet, you can easily import the records into this Google sheet using the File > Import menu.

Next, we’ll use the [Array Formulas](/internet/arrayformula-copy-formulas-in-entire-column/29711/) to populate the `Scheduled Date` column based on the date in the `Expiry Date` column. Go to row #2 of the scheduled date column and paste this formula:

```
=ArrayFormula(IF(ISBLANK(E2:E),"",E2:E-365))
```

The date in the `Scheduled Date` column will automatically be filled with a date that is 12 months before the date in the `Expiry Date` column. Thus if the passport expiration date is set to `July 12, 2021`, the follow-up reminder email would be sent exactly a year earlier on `July 12, 2020`.

Open the Gmail website, compose a new email message that will be the reminder template and save it in your drafts folder. The email body and subject can include column titles, enclosed inside double-curly braces and these will be replaced with actual values from the Google Sheet when the email is sent.

#### Auto Expiry Reminder Email

Here’s how are sample reminder email template looks like. You can also include emojis, images, and file attachments in your email drafts.

Now that our customer data is ready to be merged, go to the Addons menu in the sheet and choose Configure Mail Merge.

Here follow the step-by-step wizard to add your sender’s name and also specify addresses that you wish to CC/BCC in every merged message.

In the Create Email Template section, choose “Use a Gmail Draft” and select the draft template that you’ve created in the previous step.

### Send Date-based Reminder Emails

Expand the “Send Email Campaign” section and choose “Send a Test Email” to preview your message before it gets sent to external users. If all looks good, choose “Run Mail Merge” and hit “Go”.

That’s it. Mail Merge will setup a background task that will continuously run in the background and whenever a passport is due to expire, an email reminder is automatically sent to the client based on the date in the `Scheduled Date` column.

You can check the “Mail Merge Logs” sheet to track progress and a copy of all emails will also be saved in your Gmail Sent Items folder.

The reminder emails are sent based on the timezone of your spreadsheet. If you would like to send emails in a different timezone, go to the File menu inside Google Sheet, choose Spreadsheet Settings and update the timezone.

You can also make use of [Filters in Google Sheets](/email-specific-rows-7131) to send automatic emails to rows that meet specific criteria - when the country is "India" or when a cell value contains "Follow-up" and so on.

The same date-based workflow can be utilized to automate email sending in multiple scenarios like sending personalized wishes on birthdays and anniversaries, domain renewal reminders, fee payment reminders, appointments and more.

See the [Mail Merge](https://digitalinspiration.com/docs/mail-merge) section for help.
