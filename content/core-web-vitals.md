---
title: 'Measure Core Web Vitals of your Websites with Google Sheets'
date: '2020-08-19'
slug: '/core-web-vitals-200819'
category: 'Internet'
description: 'Core Web Vitals are a set of metrics defined by Google to help webmasters understand the performance of their websites. You can automate the measurement and tracking of core vitals with Google Sheets.'
tags:
  - 'Google Apps Script'
  - 'Archives'
  - 'Google Sheets'
---

Google's [web.dev](https://web.dev/live/) virtual conference happened last month and if there's one key takeaway from the event, it is the "core web vitals" initiative. Website owners can no longer afford to ignore core vitals as these are now a [ranking signal](https://webmasters.googleblog.com/2020/05/evaluating-page-experience.html) in Google Search.

Google has long been stressing on the need to build faster web pages but with core vitals, they provide a set of actionable metrics - Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS) - that **should** be measured by website owners across mobile and desktop computers.

The [session](https://www.youtube.com/watch?v=yDHfrhCGFQw&list=PLNYkxOF6rcIDC0-BiwSL52yQ0n9rNozaF&index=2) on speed tooling by Elizabeth Sweeny of the Chrome team offers a good overview of what Core Web Vitals are and she also discusses the [various tools](https://web.dev/vitals-tools/) that are available for webmasters and developers to measure web vitals for their pages.

### Measure Core Vitals with Google Sheets

While there are quite a few tools available to help you measure core web vitals for a website - from [Chrome extensions](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma?hl=en) to [web apps](https://web.dev/measure/) - they have to be triggered manually and can only measure core vitals for a single website / webpage at a time.

If you are looking to automatically measure core web vitals for multiple websites, maybe that of your competitor's websites as well, here's a [Google Sheet](https://docs.google.com/spreadsheets/d/1GUDpdBMT26uwcIYCbDjKH9hPAnkcqMfJOuAICZ9Yn_Y/edit) that can help. The spreadsheet will not only help you measure vitals for multiple URLs but you can also visualize the change in various metrics over time with the help of sparklines.

Here's how you can get started:

1. [Click here](https://docs.google.com/spreadsheets/d/1GUDpdBMT26uwcIYCbDjKH9hPAnkcqMfJOuAICZ9Yn_Y/copy) to make a copy of the Web Vitals sheet in your Google Drive.

2. Switch to the first tab and enter a list of URLs that you would like to measure and track. Also provide unique sheet names for each URL and the metrics for that URL will get stored in the corresponding sheet.

3. Click the "Track Core Vitals" button, authorize the sheet and you're all set.

The button will set up a daily cron job that will automatically connect to Google's PageSpeed API, fetch the core vitals for each specified URL and write them to the corresponding sheet.

The Apps Script [source code](https://github.com/labnol/code/tree/master/google-apps-script/core-vitals) is available on Github. As always, you are free to reuse, modify and publish the code based on your own requirements.
