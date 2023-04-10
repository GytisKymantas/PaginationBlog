---
title: 'Find and Remove Inactive Users in your Google Workspace Domain'
date: '2022-03-07'
slug: '/remove-inactive-workspace-users-220307'
category: 'Code'
description: 'Learn how to find inactive users in your Google Workspace domain and delete the dormant accounts to save on your monthly bills.'
tags:
  - 'Google Apps Script'
  - 'Google Workspace'
---

You can use Google Apps Script to find all the inactive user accounts in your Google Workspace domain. The script will find all the users that have not logged in to the domain for a period of time (say 6 months). You also have the option to delete the dormant accounts from Workspace domain and save on your monthly bills.

## Find the inactive users in Google Workspace domain

We can use the Admin Directory service of Apps Script to list all the users (active and inactive) in a Google Workspace domain. Open a new script, go to Service section and enable the Admin Directory service.

Next, go to the Google Cloud project associated with your Apps Script project. Switch to the Library section, search for Admin SDK and enable the API. The required OAuth scope is `https://www.googleapis.com/auth/admin.directory.user` and it should be listed in your `appsscript.json` file.

```json
{
  "timeZone": "Asia/Kolkata",
  "dependencies": {
    "enabledAdvancedServices": [
      {
        "userSymbol": "AdminDirectory",
        "version": "directory_v1",
        "serviceId": "admin"
      }
    ]
  },
  "exceptionLogging": "STACKDRIVER",
  "oauthScopes": ["https://www.googleapis.com/auth/admin.directory.user"],
  "runtimeVersion": "V8"
}
```

The script will [list all users](/code/20494-spreadsheet-list-users-google-apps-domain) in the domain and find the dormant accounts based on the last login date. If a user has not logged into his or her account in the last, say, 6 months, then the user is considered to be inactive and may be removed.

```js
const getInactiveAccounts = () => {
  let accounts = [];
  let pageToken = null;

  // Replace example.com with your domain name.
  do {
    const { users, nextPageToken = null } = AdminDirectory.Users.list({
      domain: 'example.com',
      customer: 'my_customer',
      maxResults: 100,
      orderBy: 'email',
      pageToken,
    });

    pageToken = nextPageToken;
    accounts = [...accounts, ...users];
  } while (pageToken !== null);

  // delete users who haven't logged in the last 6 months
  const MONTHS = 6;
  const cutOffDate = new Date();
  cutOffDate.setMonth(cutOffDate.getMonth() - MONTHS);

  const inactiveAccounts = accounts
    .filter(({ isAdmin }) => isAdmin === false) // Skip users with admin priveleges
    .filter(({ lastLoginTime }) => {
      const lastLoginDate = new Date(lastLoginTime);
      return lastLoginDate < cutOffDate;
    })
    .const(({ primaryEmail }) => primaryEmail); // Get only the email address

  Logger.log(`We found ${inactiveAccounts.length} inactive accounts in the domain.`);
  Logger.log(`The list is: ${inactiveAccounts.join(', ')}`);

  // Set this to true if you really want to delete the inactive accounts
  const DELETE_USER = false;

  if (DELETE_USER) {
    // Remove the users from the domain
    inactiveAccounts.forEach((userEmail) => {
      AdminDirectory.Users.remove(userEmail);
      Logger.log(`Deleted Google Workspace account for ${userEmail}`);
    });
  }
};
```
