---
title: 'How to Request Stripe Payments with Google Sheets'
date: '2022-01-27'
slug: '/stripe-payments-google-sheets-210913'
category: 'Internet'
description: 'How to use Google Sheets to generate Stripe payment links and request payments in any currency from your customers anywhere in the world!'
tags:
  - 'Google Sheets'
  - 'Formulas and Functions'
  - 'Archives'
  - 'Payments'
---

Stripe now offers a [Payment Links API](https://stripe.com/blog/payment-links-updates-jan-2022) to help you programmatically generate payment links in bulk for any amount in any supported currency. You can accept one-time payments, or create payment links for subscriptions where the customer is automatically charged on a recurring basis.

Stripe payment links do not expire and you can easily send them over email, WhatsApp, SMS, or share them on your social media pages. Customers can pay with their credit cards, Alipay, WeChat as well as wallets like Apple Pay and Google Pay.

## Stripe Payment Link Generator

If you are looking for an easy and automated solution to generate Stripe payment links in bulk and send them over to your customers, Google Sheets can help. You can combine this with [Mail Merge with Gmail](https://workspace.google.com/marketplace/app/mail_merge_with_attachments/223404411203) to request online payments from your customers over email. Or use [Document Studio](https://workspace.google.com/marketplace/app/document_studio/429444628321) to create PDF invoices and embed the payment links directly in the customer's invoice.

To get started, open your [Stripe dashboard,](https://dashboard.stripe.com/apikeys/create) go to Developers section, choose API keys and click the `Created restricted API key` option.

Give your key a descriptive name, choose the `Write` permission for resources that are titled Products, Plans and Payment links. Click the `Create Key` button and make a note of the secret key.

### Generate Stripe Payment Links with Google Sheets

Next, make a copy of the [Stripe Google Sheet](https://docs.google.com/spreadsheets/d/1TioAXc-4BOiO5LH1gZFB_-ySoYtchllwdcpbNm9HVmU/copy) in your Google Drive. Inside the Google Sheet, go to the Extensions menu and choose Script Editor to open the underlying script.

Replace the `Stripe API Key` with the actual key generated in the previous step. Then, click on the `Run` button once to authorize the script with your Google Account.

Close the Google Script editor and you can now use the custom function `STRIPE()` to generate Stripe payment links from the comfort of Google Sheets.

The `STRIPE` function in Google Sheet requires the product name, the amount to charge and the currency. The generated payment links are cached in Google Sheets so if you use the same product name and amount, you will get the same reusable link.

```
=STRIPE("Microsoft Office 365", "49.99", "USD")
```

If you would like to generate payment links for multiple rows in the Google Sheet, just add the formula in the first row and drag the crosshairs to [copy down the formula down](/internet/arrayformula-copy-formulas-in-entire-column/29711/).

### How Stripe Checkout Works with Google Sheets

The script connects to your Stripe account and looks up the product name. If no product is found, it creates a new product. It then creates a new price plan for the product based on the amount specified in the Google Sheets function.

The payment link is then generated based on this product and price plan. The script uses the built-in caching service of Apps Script to reduce latency and improve performance.

You can find the app's source code [here](/stripe-api-google-script-220127).
