---
title: 'How to Import PayPal Transactions into Google Sheets'
date: '2022-03-23'
slug: '/import-paypal-transactions-google-sheets-220323'
description: 'Learn how to easy import transactions from PayPal into Google Sheets with Google Apps Script. You can import standard transactions, recurring subscriptions and donations.'
category: 'Internet'
tags:
  - 'Google Apps Script'
  - 'Google Sheets'
  - 'Paypal'
  - 'Payments'
  - 'Archives'
---

This tutorial will show you how to import PayPal transactions into Google Sheets with the help of Google Apps Script. You can choose to import standard PayPal payments, recurring subscription payments, donations, or even refunds and chargebacks into Google Sheets.

Once the data has been imported into Google Sheets, you can export them into a CSV file and import them into Quickbooks accounting software. Tally users in India can export PayPal transactions from Google Sheets into XML format and bulk import them into Tally.

Also see: [Automate PayPal with Google Forms](https://digitalinspiration.com/docs/document-studio/apps/paypal)

## Import PayPal Transactions in Google Sheets

For this example, we will be importing the list of donors into Google Sheets who have made the donations through PayPal.

### 1. Create API credentials inside PayPal

Sign-in to your PayPal developer dashboard ([developer.paypal.com](https://developer.paypal.com/developer/applications)) and create a new app in the live mode. Give your App a name - `Transaction Importer for Google Sheets` and click the Create App button.

PayPal will create a Client ID and Client Secret key that you will need in a later step. Under the Live App settings section, check the `Transaction Search` option and turn off all other options since we only want the API keys to list transactions and have no other functionality. Click Save to continue.

### 2. Create a Google Sheets Project

Go to `sheets.new` to create a new Google Sheet. Go to Extensions menu and choose Apps Script to open the Apps Script editor.

Copy-paste the code in the editor. Remember to replace the transaction code with your own. You can use `T0002` for PayPal Subscriptions, `T0014` for Donation payments, or `T1107` for PayPal Refunds and chargebacks.

The `/* @OnlyCurrentDoc */` comment is a Google Apps Script comment that tells Google Apps Script to only run the code inside the current Google Sheet and not require access to any another spreadsheet in your Google Drive.

```js
/* @OnlyCurrentDoc */
/* Author: digitalinspiration.com */

const TRANSACTION_TYPE = 'T0001';

// Enter your own PayPal Client ID and Client Secret key
const PAYPAL_CLIENT_ID = '<YOUR_PAYPAL_CLIENT_ID>';
const PAYPAL_CLIENT_SECRET = '<YOUR_PAYPAL_CLIENT_SECRET>';

// Enter start and end dates in the format YYYY-MM-DD
const START_DATE = '2022-03-01';
const END_DATE = '2022-03-15';

// Generate the PayPal access token
const getPayPalAccessToken_ = () => {
  const credentials = `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`;
  const headers = {
    Authorization: ` Basic ${Utilities.base64Encode(credentials)}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': 'en_US',
  };

  const options = {
    method: 'POST',
    headers,
    contentType: 'application/x-www-form-urlencoded',
    payload: { grant_type: 'client_credentials' },
  };

  const request = UrlFetchApp.fetch('https://api.paypal.com/v1/oauth2/token', options);
  const { access_token } = JSON.parse(request);

  return access_token;
};

// Append the query parameters to the PayPal API URL
const buildAPIUrl_ = (queryParams) => {
  const baseUrl = [`https://api-m.paypal.com/v1/reporting/transactions`];
  Object.entries(queryParams).forEach(([key, value], index) => {
    const prefix = index === 0 ? '?' : '&';
    baseUrl.push(`${prefix}${key}=${value}`);
  });
  return baseUrl.join('');
};

// Fetch the list of PayPal transaction
const fetchTransactionBatchFromPayPal = (queryParams) => {
  const options = {
    headers: {
      Authorization: `Bearer ${getPayPalAccessToken_()}`,
      'Content-Type': 'application/json',
    },
  };

  const request = UrlFetchApp.fetch(buildAPIUrl_(queryParams), options);
  const { transaction_details, total_pages } = JSON.parse(request);
  return { transaction_details, total_pages };
};

// Extract the transaction details including the transaction ID,
// donation amount, transaction date and buyer's email and country code
const parsePayPalTransaction_ = ({ transaction_info, payer_info }) => [
  transaction_info.transaction_id,
  new Date(transaction_info.transaction_initiation_date),
  transaction_info.transaction_amount?.value,
  transaction_info.transaction_note || transaction_info.transaction_subject || '',
  payer_info?.payer_name?.alternate_full_name,
  payer_info?.email_address,
  payer_info?.country_code,
];

const fetchPayPalTransactions_ = () => {
  const startDate = new Date(START_DATE);
  const endDate = new Date(END_DATE);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  const transactions = [];

  const params = {
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
    page_size: 100,
    transaction_type: TRANSACTION_TYPE,
    fields: 'transaction_info,payer_info',
  };

  for (let page = 1, hasMore = true; hasMore; page += 1) {
    const response = fetchTransactionBatchFromPayPal({ ...params, page });
    const { transaction_details = [], total_pages } = response;
    transaction_details.map(parsePayPalTransaction_).forEach((e) => transactions.push(e));
    hasMore = total_pages && total_pages > page;
  }

  return transactions;
};

// Import the transactions from PayPal and write them to the active Google Sheet
const importTransactionsToGoogleSheet = () => {
  const transactions = fetchPayPalTransactions_();
  const { length } = transactions;
  if (length > 0) {
    const sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange(1, 1, length, transactions[0].length).setValues(transactions);
    const status = `Imported ${length} PayPal transactions into Google Sheets`;
    SpreadsheetApp.getActiveSpreadsheet().toast(status);
  }
};
```

### 3. Run PayPal Import Function

Inside the script editor, click the Run button to import transactions from PayPal. You may have to authorize the script since it requires permissions to connect to the PayPal API and also write data to Google Sheets on your behalf.

That's it. If there are any PayPal transactions to import in the selected date range, the script will run and the transactions will be imported into Google Sheets.

In the next part of the tutorial, we will learn how to export the PayPal transactions from Google Sheets to an XML file for importing into Tally accounting software.

Also see: [Send PayPal Invoices from Google Sheets](https://digitalinspiration.com/docs/document-studio/google-sheets/paypal-invoice)
