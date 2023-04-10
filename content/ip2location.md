---
title: 'How to Perform IP Address Lookup with Google Sheets'
date: '2021-04-15T01:10:10.000Z'
slug: '/ip2location-google-sheets-210216'
category: 'Code'
description: 'How to determine the country, city and ISP name of IP addresses in bulk with Google Sheets and IP2Location service.'
tags:
  - 'Google Sheets'
  - 'Google Apps Script'
  - 'Archives'
---

Websites can determine the [visitor's geographic location](/visitor-country-ip-address-200822) using their IP address and serve more relevant content. For example, a weather website may use your IP address to estimate your approximate location and provide weather forecast for your current city automatically. A currency exchange website can determine your default currency based on your country which is detected from your IP address.

There are free web IP lookup services, `ip2c.org` for example, that will reveal the country of your client's IP address with a simple HTTP request. We internally use that service at [Digital Inspiration](https://digitalinspiration.com/) to determine the payment service provider on the checkout page.

## Bulk IP Lookup with Google Sheets

IP2Location is another good alternative that retrieves more detailed geolocation information for any IP address. The IP location lookup service can retrieve the client's country, city name, region, the ISP name and more.

If you have a bulk list of IP addresses, you can use Google Sheets to estimate the corresponding geographic details for each of the addresses in few easy steps:

1. [Click here](https://docs.google.com/spreadsheets/d/1Iy8jPNyzzNBbXFSoPtOKzVCkB1wazICQS0onFOAYT_0/copy) to make a copy of the Google Sheet for performing IP lookups in bulk.

2. Paste the list of IP addresses in column A, one per row. The lookup service works for both IPv4 and IPv6 addresses.

3. Enter your key in cell E1. If you have a small list of IP address, use `demo` as the key or get your own API key from [ip2location.com](https://www.ip2location.com/?rid=1647).

4. Click the Run button, authorize the script and watch as the geographic details and ISP names are populated in the sheet.

### How IP2Location Script Works

Internally, the Google Sheet uses the IP2location web service with Google Apps Script to transform IP addresses into geographic region.

It uses the [UrlFetchApp](/urlfetch) service to perform multiple HTTP requests in a single batch for improved performance. Here's the full source code:

```js
const ip2location = () => {
  // Get all the input data from Google Sheet
  const ss = SpreadsheetApp.getActiveSheet();
  const data = ss.getDataRange().getDisplayValues();

  // Use your own API key or use demo key
  const apiKey = data[0][4] || 'demo';

  // Generate API URL for IP address
  const getUri_ = (ipAddress) => {
    const API_URL = 'https://api.ip2location.com/v2';
    return `${API_URL}/?ip=${ipAddress}&key=${apiKey}&package=ws4`;
  };

  const requests = [];

  for (let r = 2; r < data.length; r++) {
    const [ipAddress, countryName] = data[r];
    // Only process rows where the country is blank
    if (ipAddress && !countryName) {
      requests.push({ url: getUri_(ipAddress), rowNumber: r + 1 });
    }
  }

  // Make API calls in bulk using the UrlFetchApp service
  UrlFetchApp.fetchAll(requests).forEach((content, i) => {
    // Parse the JSON response
    const { city_name, country_name, isp, response } = JSON.parse(content);

    // If the response is populated, the API call failed
    if (response) throw new Error(response);

    // Write the response data to Google Sheet
    const values = [[country_name, region_name, city_name, isp]];
    ss.getRange(requests[i].rowNumber, 2, 1, 4).setValues(values);
  });

  // Flush all changes
  SpreadsheetApp.flush();
};
```
