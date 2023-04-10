---
title: 'How to Use the Stripe Payments API with Google Apps Script'
date: '2022-01-26'
slug: '/stripe-api-google-script-220127'
category: 'Code'
description: 'How to use the Stripe Payments API with Google Apps Script'
tags:
  - 'Google Apps Script'
  - 'Payments'
---

The [Stripe Payments Link Generator](/stripe-payments-google-sheets-210913) uses the Stripe Payment Links API with Google Apps Script to generate payment links in bulk.

It uses the Stripe API key to connect to Stripe and generate payment links. The generated links are written in the Google Sheet and also added to the Script cache. If you use the same product name and amount, you will get the same reusable link from the cache itself.

The code generates payment links for one-time payments but can be extended to support recurring payments as well as coupons and tax rates.

```js
/**
 *
 *  Author   :  Amit Agarwal
 *  Email    :  amit@labnol.org
 *  Website  :  https://digitalinspiration.com/
 *  License. :  MIT Attribution required
 *
 * */

const StripePaymentsAPI = {
  getCache(key) {
    return CacheService.getScriptCache().get(key);
  },

  setCache(key, value) {
    CacheService.getScriptCache().put(key, value, 21600);
  },

  convertPayload(params = {}) {
    return Object.entries(params)
      .map(([key, value]) => [encodeURIComponent(key), encodeURIComponent(value)].join('='))
      .join('&');
  },

  getData(endpoint, params) {
    const response = UrlFetchApp.fetch(`${endpoint}?${this.convertPayload(params)}`, {
      headers: {
        Authorization: `Bearer ${STRIPE_API_KEY}`,
      },
      muteHttpExceptions: true,
    });
    return JSON.parse(response);
  },

  postData(endpoint, params) {
    const response = UrlFetchApp.fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${STRIPE_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      muteHttpExceptions: true,
      payload: this.convertPayload(params),
    });

    return JSON.parse(response);
  },

  getProductId(name) {
    const productId = this.getCache(name);
    if (productId) return productId;
    const api = 'https://api.stripe.com/v1/products';
    const { data = [] } = this.getData(api, { limit: 100 });
    const { id: newProductId } =
      data.find(({ name: productName }) => productName === name) || this.postData(api, { name });
    this.setCache(name, newProductId);
    return newProductId;
  },

  getPriceId(name, price = '1234', currency = 'USD') {
    const product_id = this.getProductId(name);
    const key = product_id + price + currency;
    const priceId = this.getCache(key);
    if (priceId) return priceId;
    const api = 'https://api.stripe.com/v1/prices';
    const { data = [] } = this.getData(api, { limit: 100, currency, product: product_id });
    const { id: newPriceId } =
      data.find(({ unit_amount }) => String(unit_amount) === String(price)) ||
      this.postData(api, { currency, product: product_id, unit_amount: price });
    this.setCache(key, newPriceId);
    return newPriceId;
  },

  createLink(name, amount, currency) {
    const key = `link${amount}${currency}${name}`;
    const paymentLink = this.getCache(key);
    if (paymentLink) return paymentLink;
    const priceId = this.getPriceId(name, Math.ceil(amount * 100), currency);
    const { url } = this.postData('https://api.stripe.com/v1/payment_links', {
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': 1,
    });
    this.setCache(key, url);
    return url;
  },

  createSession(name, amount, currency) {
    const STRIPE_SUCCESS_URL = 'https://digitalinspiration.com';
    const STRIPE_CANCEL_URL = 'https://digitalinspiration.com';
    const key = `session${amount}${currency}${name}`;
    const sessionLink = this.getCache(key);
    if (sessionLink) return sessionLink;
    const { url } = this.postData('https://api.stripe.com/v1/checkout/sessions', {
      cancel_url: STRIPE_CANCEL_URL,
      success_url: STRIPE_SUCCESS_URL,
      mode: 'payment',
      billing_address_collection: 'required',
      'payment_method_types[]': 'card',
      'line_items[0][price_data][currency]': currency,
      'line_items[0][price_data][product_data][name]': name,
      'line_items[0][price_data][unit_amount]': Math.ceil(amount * 100),
      'line_items[0][quantity]': 1,
    });
    this.setCache(key, url);
    return url;
  },
};
```
