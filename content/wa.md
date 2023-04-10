---
title: 'Send WhatsApp Messages with a Google Sheets Function'
date: '2022-05-23T01:01:01.010Z'
slug: '/send-whatsapp-message-220523'
category: 'Internet'
description: 'Learn how to send WhatsApp messages with a Google Sheets function'
tags:
  - 'Formulas and Functions'
  - 'Archives'
  - 'Google Sheets'
  - 'Whatsapp'
---

In a previous tutorial, you learned how to [send WhatsApp messages from Google Sheets](/whatsapp-api-google-sheets-220520) using the official WhatsApp API. The first 1,000 messages per month for each WhatsApp Business Account are free and then you pay per use based on the country of the message sender and the message recipient.

## WhatsApp API Pricing

For instance, if you are sending a WhatsApp message from the US phone number to a WhatsApp user in France, the cost would be 14&cent; per message. However, if you send messages from WhatsApp number in India to another number in India, the cost would be around 0.006&cent; per message. The rate cards for WhatsApp API pricing are available [here](https://developers.facebook.com/docs/whatsapp/pricing#rate-cards).

In addition to the cost factor, the WhatsApp Business API requires you to have a verified business on Facebook (see [verification requirements](https://developers.facebook.com/docs/development/release/business-verification)) and the terms require that you will only send message to WhatsApp users who have opted-in to receive future messages from you on WhatsApp.

The other limitation of WhatsApp API is that you can only send messages that are based on templates pre-approved by WhatsApp. You can however send free-form messages within 24 hours of
the last user message in a conversation.

## WhatsApp Function for Google Sheets

If you are a small business that is looking for an alternate route to message customers on WhatsApp without paying for the API, here's a semi-automated technique. You can use the [Click to Chat](https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat/) feature of WhatsApp to quickly send a personalized message to any phone number that's registered on WhatsApp.

For this example, we have a sheet that list the customer's name, amount that they have to pay and the due date for payment. We can use the `CONCATENATE` or `TEXTJOIN` function of Google Sheets to create a personalized message for each client in column D.

The column E of the Google Sheet contains the phone numbers of each WhatsApp user. We can use the `WHATSAPP` custom function to create a personalized chat link for different customers in the Google Sheet. When you click this chat link, it automatically open a WhatsApp conversation with the user and the message is pre-filled in the chat box.

This method does require a few extra click but there's no cost involved and it works for both WhatsApp Business and WhatsApp personal accounts.

### WhatsApp Function

Here's the underlying `WHATSAPP` function that generates the Click to Chat link in Google Sheets. It also supports [Array Formulas](/internet/arrayformula-copy-formulas-in-entire-column/29711/).

The third parameter determines whether the link should launch the WhatsApp website or the WhatsApp desktop client. You can play with the live sheet [here](https://docs.google.com/spreadsheets/d/1Mv8J2nYiti1iiuaKdkgoGZbSnxEtGwNNGvcsBCRHzBU/copy).

```js
/**
 * Create WhatsApp Click to Chat Link
 *
 * @param {string} phone The phone number with country code
 * @param {string} message The text message
 * @param {boolean} web Open the message in WhatsApp web?
 * @return The pre-filled message link for WhatsApp.
 * @customfunction
 */
function WHATSAPP(phone, message, web) {
  if (Array.isArray(phone)) {
    return phone.map((row, index) => WHATSAPP(row[0], message[index][0]), web);
  }
  const phoneNumber = String(phone).replace(/[^\d]/g, '');
  const messageText = encodeURIComponent(message);
  return web === true
    ? `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${messageText}`
    : `https://wa.me/${phoneNumber}?text=${messageText}`;
}
```
