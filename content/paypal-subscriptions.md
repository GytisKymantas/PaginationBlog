---
title: 'How to Use PayPal Subscriptions API with Node.js'
date: '2022-01-24T01:10:10.000Z'
slug: '/paypal-subscriptions-node-210524'
category: 'Code'
description: 'How to use the PayPal Subscriptions API with Node.js to manage recurring payments on serverless cloud functions.'
tags:
  - 'Paypal'
  - 'Payments'
  - 'Javascript'
---

Our [Google add-on store](https://digitalinspiration.com/) uses PayPal Subscriptions with [Digital Goods](https://digitalgoods.dev) to process recurring payments and the invoices are sent to customers through [Document Studio](https://digitalinspiration.com/get/GA16).

There are two steps.

1. Customers makes the payment and completes the order on our website.
2. PayPal sends a `BILLING.SUBSCRIPTION.ACTIVATED` webhook to a serverless function.
3. The function (running on Firebase, Google Cloud) verifies the subscription and checks if the status is active.
4. It invokes the Apps Script API to complete the order.

The cloud function was previously using the official PayPal SDK for `Node.js` but it has been recently deprecated and no longer supports the new PayPal subscriptions API endpoints. Migrating from the PayPal Node SDK to your own solution is relatively simple and involves two steps:

### 1. Get the PayPal Access Token

```js
const { default: axios } = require('axios');

const getPayPalAccessToken = async () => {
  const client_id = 'PayPal Client ID goes here';
  const client_secret = 'PayPal Client Secret goes here';
  const options = {
    url: 'https://api-m.paypal.com/v1/oauth2/token',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-Language': 'en_US',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: client_id,
      password: client_secret,
    },
    params: {
      grant_type: 'client_credentials',
    },
  };
  const { status, data } = await axios(options);
  return data.access_token;
};
```

If you are planning to test your integration with your PayPal sandbox account instead of the production version, replace `api-m.paypal.com` in the requests with `api-m.sandbox.paypal.com` and use the sandbox client secret credentials.

### 2. Verify PayPal Subscription

A successful request returns the HTTP 200 OK status code and a JSON response body.

```js
const { default: axios } = require('axios');

const verifyPayPalSubscription = async (subscription_id) => {
  const token = await getPayPalAccessToken();
  const options = {
    method: 'GET',
    url: `https://api-m.paypal.com/v1/billing/subscriptions/${subscription_id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  };
  const { status, data = {} } = await axios(options);
  if (status === 200) {
    const { subscriber: { email_address } = {}, status } = data;
    return status === 'ACTIVE';
  }
  return false;
};
```

Once the PayPal Subscription is found to be active, an HTTP request is made to the Google Apps Script API that sends the invoice and license to the customer. [Learn more](/internet/sell-digital-products-online/28554/).
