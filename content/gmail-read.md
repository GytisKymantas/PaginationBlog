---
title: 'How to Efficiently Read Email Messages with the Gmail API and Apps Script'
date: '2023-03-25'
slug: '/gmail-urlfetch-api-230325'
category: 'Code'
description: 'How to read email messages with the Gmail API and the UrlFetch service of Apps Script'
tags:
  - 'Gmail'
  - 'Google Apps Script'
---

The [Email Address Extractor](https://workspace.google.com/marketplace/app/email_address_extractor/1045030766919) add-on for Gmail helps you extract email addresses of your customers from your Gmail messages and writes them to a Google Sheet. It internally uses the Gmail API to fetch the messages and the Google Sheets API to write the email addresses to a Google Sheet.

There are two ways to pull email addresses from Gmail messages. The simpler, and more popular, method is that you pull a list of messages from which you wish to extract the email and loop over them to extract the email addresses.

```js
// Pull details of emails from PayPal, Stripe or Shopify
function getEmailAddress() {
  const threads = GmailApp.search('from:paypal OR from:stripe OR from:shopify newer_than:2d', 0, 10);
  threads.forEach((thread) => {
    const messages = thread.getMessages();
    messages.forEach((message) => {
      Logger.log('Subject: ' + message.getSubject());
      Logger.log('To: ' + message.getTo());
      Logger.log('From: ' + message.getFrom());
    });
  });
}
```

## Gmail Batch Request

A more efficient way to pull email addresses from multiple email messages is to make a single batch request to the Gmail API with the help of Apps Script's [UrlFetch service](/urlfetch).

### 1. Get a list of messages in Gmail

We use the Advanced Gmail service of Apps Script to get a list of unread messages from a user's inbox in Gmail. You may use any of [Gmail's advanced search operators](/gmail-search-4355) to filter the messages.

The `searchGmailMessages()` function uses the Gmail API to search for unread messages in the inbox and returns an array of message IDs.

```js
const searchGmailMessages = () => {
  const { messages = [] } = Gmail.Users.Messages.list('me', {
    q: 'in:inbox is:unread',
    maxResults: 25,
    fields: 'messages(id)',
  });
  return messages.map(({ id } = {}) => id);
};
```

### 2. Prepare the batch request

Now that we have the list of Gmail message Ids, we need to prepare the batch request to the Gmail API.

The function `getUrlParts()` generates a URL query string with parameters for requesting specific fields and metadata for Gmail messages. We use the fields parameter to request minimal data for each message and the `metadataHeaders` parameter to request specific metadata headers for each message.

```js
const getUrlParts = () => {
  const metadata = ['Subject', 'From', 'To'].map((key) => `metadataHeaders=${key}`).join('&');
  const data = {
    fields: 'payload/headers',
    format: `metadata`,
  };
  const fields = Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return `${fields}&${metadata}`;
};
```

The `createMessageRequest()` function constructs a request object for fetching a specific message from the Gmail API with an OAuth token.

```js
const GMAIL_API_ENDPOINT = `https://www.googleapis.com/gmail/v1/users/me/messages`;
const createMessageRequest = (messageId) => {
  const urlparts = getUrlParts();
  return {
    url: `${GMAIL_API_ENDPOINT}/${messageId}?${urlparts}`,
    headers: { Authorization: `Bearer ${ScriptApp.getOAuthToken()}` },
    muteHttpExceptions: true,
  };
};
```

### 3. Make the batch request

We use the `fetchAll` method of the UrlFetch service to make multiple requests to the Gmail API in parallel. This method takes an array of request objects, we created them in the previous step, and fetches the email message headers for each message ID using the Gmail API.

```js
const makeBatchRequest = (messageIds) => {
  const messageRequests = messageIds.map(createMessageRequest);
  const responses = UrlFetchApp.fetchAll(messageRequests);
  responses.forEach((response) => {
    const messageData = JSON.parse(response);
    const { error, payload: { headers = [] } = {} } = messageData;
    if (error) {
      console.log('Error', error);
    } else {
      headers.forEach(({ name, value }) => {
        Logger.log(name + ': ' + value);
      });
    }
  });
};
```

Also see: [Send Email with Gmail API and Node.js](/google-api-service-account-220405)
