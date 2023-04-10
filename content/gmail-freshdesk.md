---
title: 'Gmail to Freshdesk - Convert Emails into Support Tickets'
date: '2020-04-07'
slug: '/code/gmail-to-freshdesk-tickets-200407'
category: 'Code'
description: 'Create customer support tickets in Freskdesk with  email messages in Gmail using Google Apps Script'
tags:
  - 'Google Apps Script'
  - 'Gmail'
---

Custom support systems like Freshdesk, Zoho Desk, or Zendesk offer an email address - like `support@example.com` - for quickly creating customer tickets without having to fill any complicated [web forms](https://forms.studio).

Any email message sent to your support email address automatically gets converted into a ticket and a unique ticket ID gets assigned to the support request.

When a ticket is created from an email address, the email subject becomes the ticket title, the email body becomes the ticket description and the most important part, the customer's name and email address is pulled from the `FROM` field of the email message header. This is important because when your helpdesk agents respond to a ticket, the replies are sent directly to the customer.

### Email Ticketing with Gmail Forwards - The Problem

This system works perfect when the customer sends an email message directly to the help desk email but imagine if they send an email to you, the support agent, and it is your job to create a support ticket from the customer’s email.

Now if you forward the customer’s email message received in your Gmail mailbox to Freshdesk, the ticket would still be created but since it will have your name and email in the `FROM` field, the helpdesk software would assign you as the customer even though you are just creating a support ticket on behalf of the customer. If any agent responds to such a ticket, you’ll be part of all the communication and not the original customer since their email address is no part of the support ticket created from the forwarded email.

I have been exploring [Freskdesk](https://freshdesk.grsm.io/labnol) and faced a similar issue. How to easily create support tickets from existing email messages in Gmail. Couldn’t find a readymade solution so decided to build one using the Freshdesk API and Google Apps Script.

### Convert Gmail Emails to Freshdesk Tickets

To get started, you’ll need the domain (where your Freshdesk site is hosted) and the API Key that is available under your Freshdesk profile page.

Next, go to your Gmail and create a label - say Freshdesk. Now you can simply drag customer emails from your Gmail Inbox to this new Freshdesk label and they’ll be automatically converted into customer tickets. Unlike email forwards, here the tickets would be created with the customer’s name and email address as the requestor.

```javascript
const GMAIL_LABEL_NAME = 'Freshdesk';
const FRESHDESK_API_KEY = 'Your API Key';
const FRESHDESK_SUBDOMAIN = 'Your subdomain';

const connectToFreshdesk_ = (postData) => {
  const API = `https://${FRESHDESK_SUBDOMAIN}.freshdesk.com/api/v2/tickets`;
  const response = UrlFetchApp.fetch(API, {
    method: 'POST',
    contentType: 'application/json',
    muteHttpExceptions: true,
    payload: JSON.stringify(postData),
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Basic ' + Utilities.base64Encode(FRESHDESK_API_KEY + ':X'),
    },
  });
  if (!/^2/.test(String(response.getResponseCode()))) {
    console.error('Cannot create ticket', response.getContentText());
  }
};

const createSupportTicket_ = (message) => {
  const [email, ...names] = message.getFrom().replace(/[<>"]/g, '').split(' ').reverse();
  const postData = {
    subject: message.getSubject(),
    description: message.getBody(),
    name: names.reverse().join(' '),
    email,
    source: 3,
    status: 3,
    priority: 2,
  };
  connectToFreshdesk_('', postData);
};

const gmailToFreshdesk = () => {
  const label = GmailApp.getUserLabelByName(GMAIL_LABEL_NAME);
  label.getThreads(0, 20).forEach((thread) => {
    const [message] = thread.getMessages().reverse();
    createSupportTicket_(message);
    thread.removeLabel(label);
  });
};
```

Inside the Google Script editor, go to Edit > Current Project Triggers > Add Triggers and create a new time based trigger that runs every 15 minutes for the `gmailToFreshdesk` method.

Now the Google Script will connect to your Gmail every 15 minutes, finds any new email messages in the specified label and convert them to Freskdesk support tickets. It will also remove the email message from the label after the ticket is created.

#### No Gmail Sending Limits Apply

With Apps Script, you need not worry about [Gmail sending limits](https://digitalinspiration.com/docs/mail-merge/email-quota) since the tickets are created with API calls and your not sending (forwarding) email anywhere.
