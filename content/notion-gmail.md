---
title: 'How to Use Notion with Gmail and Google Sheets using Apps Script'
date: '2021-07-20T01:10:10.000Z'
slug: '/gmail-to-notion-apps-script-210515'
category: 'Code'
description: 'How to use the Notion API with Google Apps Script to connect Gmail, Google Forms, and Google Sheets with your Notion workspace.'
tags:
  - 'Google Apps Script'
  - 'Gmail'
  - 'Google Forms'
  - 'Google Sheets'
  - 'Archives'
---

Notion, my absolute favorite tool for storing all sorts of things from web pages to code snippets to recipes, just got better. They've released a public API and thus it will be a lot easier for developers to read and write to their Notion workspace from external apps.

For instance, you can create a document in Google Docs and export it to Notion while staying inside Docs. Google Sheets users can pull pages from Notion database into their spreadsheet. Any new submissions in Google Forms can be directly saved to Notion and so on!

## Save Gmail Messages in Notion

I have put together a [Gmail add-on](https://workspace.google.com/marketplace/app/save_to_notion/562294135760) that makes it easy for you to save email messages, or any other text content, from Gmail to your Notion workspace with a click. Here's how the app works.

**Step 1:** Connect Gmail to Notion

![](https://www.labnol.org/images/2023/002815.png)

**Step 2:** Allow Access to Notion pages - if you have multiple databases in your Notion workspace, you have an option to grant access to select databases and the rest will be inaccessible to the external app.

**Step 3:** Choose Email - open any email message in Gmail and you'll have an option to edit the content of the email subject and body before sending the content to your Notion page. Please note that the app only supports plain text format at this time.

**Step 4:** Open Notion - As soon as you hit the `Send to Notion` button, the content of the currently selected email message is added to your Notion database. You can click the `All updates` link in your Notion sidebar to view to recently added page.

### How to Use Notion with Google Apps Script

If you would to integrate your own Google add-on with Notion API, here's a brief outline of the steps involved.

1. Go to [notion.so](https://www.notion.so/my-integrations) and click the `Create New Integration` button. You'll be provided with a Client ID and Client Secret that you'll need in a later step.

2. Include the [OAuth2](https://github.com/googleworkspace/apps-script-oauth2) library in your Apps Script project and invoke the `getRedirectUri` method to get the OAuth2 redirect URL for the previous step.

```js
const getNotionService = () => {
  return OAuth2.createService('Notion')
    .setAuthorizationBaseUrl('https://api.notion.com/v1/oauth/authorize')
    .setTokenUrl('https://api.notion.com/v1/oauth/token')
    .setClientId(CLIENT_ID)
    .setClientSecret(CLIENT_SECRET)
    .setCallbackFunction('authCallback')
    .setPropertyStore(PropertiesService.getUserProperties())
    .setCache(CacheService.getUserCache())
    .setTokenHeaders({
      Authorization: `Basic ${Utilities.base64Encode(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
    });
};

const authCallback = (request) => {
  const isAuthorized = getNotionService().handleCallback(request);
  return HtmlService.createHtmlOutput(isAuthorized ? 'Success!' : 'Access Denied!');
};

const getRedirectUri = () => {
  console.log(OAuth2.getRedirectUri());
};
```

3. Connect to Notion API - Make a `Get` [HTTP request](/urlfetch) to the [/vi/databases](https://developers.notion.com/reference/get-databases) to fetch a list of all databases that the user has explicitly shared with authorized app.

```js
function getDatabasesList() {
  var service = getNotionService();
  if (service.hasAccess()) {
    const url = 'https://api.notion.com/v1/databases';
    const response = UrlFetchApp.fetch(url, {
      headers: {
        Authorization: `Bearer ${service.getAccessToken()}`,
        'Notion-Version': '2021-05-13',
      },
    });
    const { results = [] } = JSON.parse(response.getContentText());
    const databases = results
      .filter(({ object }) => object === 'database')
      .map(({ id, title: [{ plain_text: title }] }) => ({ id, title }));
    console.log({ databases });
  } else {
    console.log('Please authorize access to Notion');
    console.log(service.getAuthorizationUrl());
  }
}
```

### Download Gmail to Notion

The **Gmail to Notion** app is in beta. If you would like to use it with your Gmail or Google Workspace account, please install from here - [Gmail to Notion](https://workspace.google.com/marketplace/app/save_to_notion/562294135760)
