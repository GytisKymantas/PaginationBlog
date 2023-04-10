---
title: 'How Spammers Avoid the Gmail Spam Filter through Google Forms'
date: '2021-02-16T01:10:10.000Z'
slug: '/gmail-spam-filters-210216'
category: 'Code'
description: "How spammers use a simple setting in Google Forms to send junk emails through Google's own mailing servers and completely avoid the Gmail spam filters."
tags:
  - 'Google Forms'
  - 'Spam'
  - 'Archives'
---

Gmail is very effective at filtering spam emails but spammers seem to have figured out a new way to bypass the spam filters and send emails that land right in the user’s inbox. The emails are sent through Google Forms and because the messages originate from Google's own email servers, they do not get caught in the spam filters.

Here's how spam emails are sent through Google Forms.

1. A public form is created with Google Forms.
2. The form creator uploads images for the various question fields and also adds links to spam websites in the form.
3. Inside the Form settings, they turn on the option to "Collect Email Addresses" including the option to send "Response receipts" when a new form is submitted.

Now the spammers can simply open the Google Form, fill in the recipient's email address and hit the submit button.

Google Forms will automatically email a copy of the form response, including all the pictures and links contained in the original form, to the email address that was entered in the form.

Here's a screenshot of one such email from Google Forms that easily tricked the spam filters.

## How to Block Spam from Google Forms

If you would like to prevent spam emails from Google Forms from landing in your inbox, Gmail filters can help.

All [pre-filled Google Forms](/prefilled-google-forms-200601) emails have the sender's email address as below:

```
forms-receipts-noreply@google.com
```

You can create a filter in Gmail that will automatically delete emails that have Google Forms as the sender.

Alternatively, you may open the form link from the email and click the "Report Abuse" button to report the form to Google. That is not likely to be a very effective strategy though as spammers can always switch to a different Google account.
