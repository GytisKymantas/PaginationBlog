---
title: 'How to Request Payments with Razorpay and Google Sheets'
date: '2021-08-27T01:10:10.000Z'
slug: '/razorpay-payments-google-sheets-210827'
category: 'Code'
description: 'How to use Google Sheets to generate Razorpay payment links and easily accept payments from customers anywhere in the world!'
tags:
  - 'Google Sheets'
  - 'Formulas and Functions'
  - 'Google Apps Script'
  - 'Archives'
  - 'Payments'
---

[Razorpay](https://rzp.io/i/qQH3U4M) is a popular payment gateway in India that allows you to accept online payments from customers anywhere in the world. Your customers can pay with credit cards, debit cards, Google Pay, Walmart's PhonePe and other UPI apps.

Razorpay, similar to Stripe, offers a simple `no-code` tool for generating payment links that you can share with customers over SMS, WhatsApp, or email. When a customer clicks on the link, they are redirected to a secure checkout page hosted on Razorpay where they can can make the payment using their preferred payment method.

Here's a sample payment link generated with Razorpay - [https://rzp.io/i/6uBBFWBfv](https://rzp.io/i/6uBBFWBfv)

## Generate Payment Links with Razorpay

It takes one easy step to generate payment links with Razorpay. Sign-in to your [Razorpay account](https://rzp.io/i/qQH3U4M), go to the `Payment Links` section and click on the `Create Payment Link` button.

The built-in wizard is perfect for generating a few links but if you are however looking to generate payment links in bulk for multiple products and varying amounts, Google Sheets can help.

Here's a sample demo:

### Generate Payment Links with Google Sheets

To get started, open your Razorpay dashboard, go to Settings > API Keys > Generate Key to generate the `Key Id` and `Key Secret` for your account.

Next, make a copy of the [Razorpay sheet](https://docs.google.com/spreadsheets/d/1IXXf0D1RsnUhxYVp4AFkT0BSIZ862qjWwaDTFfw7wCE/copy) in your Google Drive. Go to Tools > Script Editor and replace the `Key Id` and `Key Secret` with the ones generated in the previous step. Then, click on the `Run` menu to authorize the script with your Google Account.

Switch to the Google Sheet and you can now use the custom Google Sheets function `RAZORPAY()` to generate dynamic payment links.

If you would like to generate payment links for multiple rows in the Google Sheet, just write the formula in the first row and drag the crosshairs to the other rows as show in the demo below. [Array Formulas](/internet/arrayformula-copy-formulas-in-entire-column/29711/) are not supported yet.

### Email Payment Links to Customers

You can use [Mail Merge with Gmail](https://workspace.google.com/marketplace/app/mail_merge_with_attachments/223404411203) to request payments from your customers over email. If the column title is `Payment Link` in Google Sheets, simply put `{{Payment Link}}` in the email template and these will be replaced with the actual Razorpay payment links customized for each customer.

You may also use [Document Studio](https://workspace.google.com/marketplace/app/document_studio/429444628321) to create PDF invoices and embed the payment links directly in the invoice. Please watch this [video tutorial](https://www.youtube.com/watch?v=PBN9SaG-MJQ) to learn more.

### How Razorpay Works with Google Sheets

If you are curious to know how integration of Google Sheets and Razorpay works, the answer is Google Apps Script. The underlying code invokes the Razorpay API with your credentials and writes the generated payment links in the Google Sheet.

The custom Google Sheets function uses the built-in caching service of Apps Script to reduce latency and improve performance.

```js
const RAZORPAY_KEY_ID = '<<Your Razorpay Key Id>>';
const RAZORPAY_KEY_SECRET = '<<Your Razorpay Key Secret>>';

/**
 * Generate payment links for Razorpay in Google Sheets
 *
 * @param {number} amount The amount to be paid using Razorpay
 * @param {string} currency The 3-letter currency code (optional)
 * @param {string} description A short description of the payment request (optional)
 * @return Razorpay Payment Link
 * @customfunction
 */

const RAZORPAY = (amount, currency, description) => {
  const payload = JSON.stringify({
    amount: amount * 100,
    currency,
    description,
  });

  // Use caching to improve performance
  const cachedLink = CacheService.getScriptCache().get(payload);

  if (cachedLink) return cachedLink;

  // Generate the Authorization header token
  const base64token = Utilities.base64Encode(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);

  // Invoke the Razorpay Payment Links API
  const response = UrlFetchApp.fetch('https://api.razorpay.com/v1/payment_links/', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64token}`,
      'Content-Type': 'application/json',
    },
    muteHttpExceptions: true,
    payload: payload,
  });

  // The short_url contains the unique payment link
  const { short_url = '' } = JSON.parse(response);

  // Store the generated payment link in the cache for 6 hours
  CacheService.getScriptCache().put(payload, short_url, 21600);

  return short_url;
};
```
