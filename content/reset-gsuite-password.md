---
title: "How to Force Reset Google Workspace Users' Passwords with Apps Script"
date: '2021-11-11'
slug: '/code/force-reset-gsuite-password-200211'
category: 'Code'
description: 'Learn how the Google Workspace admin can change the Google account passwords of multiple users in their organization automatically with Google Apps Script.'
tags:
  - 'Google Apps Script'
  - 'Google Workspace'
  - 'Password'
---

You can use Google Apps Script to automatically reset the password of users in your Google Workspace domain. This script can only be executed under the Suite admin account. You also need to enable the AdminDirectory Advanced Service in your Apps Script Editor.

You can force reset passwords of members of a particular group in your organization or specify a list of email addresses and the Google Script will use the AdminDirectory service to change the password of specified users.

```javascript
const getGroupMembers_ = (groupEmail) => {
  var emails = [];
  var pageToken;
  do {
    const { members = [], nextPageToken } = AdminDirectory.Members.list(groupEmail, {
      maxResults: 200,
      pageToken: pageToken,
    });
    members.forEach((member) => {
      if (member.status === 'ACTIVE') {
        emails.push(member.email);
      }
    });
    pageToken = nextPageToken;
  } while (pageToken);
  return emails;
};

const sendEmail_ = (emailAddress, password) => {
  MailApp.sendEmail({
    to: emailAddress,
    cc: 'amit@labnol.org',
    subject: `Password changed for ${emailAddress}`,
    body: `The Google Workspace admin has changed your Gmail password to ${password}`,
  });
};

const changePassword_ = (emailAddress) => {
  const temporaryPassword = Utilities.getUuid();
  AdminDirectory.Users.update(
    {
      password: temporaryPassword,
      changePasswordAtNextLogin: true,
    },
    emailAddress
  );
  sendEmail_(emailAddress, temporaryPassword);
};

const resetUserPasswordsForGroup = () => {
  const groupEmail = 'groupemail@labnol.org';
  const members = getGroupMembers_(groupEmail);
  members.forEach((member) => changePassword_(member));
};

const resetGSuitePasswordForUsers = () => {
  const members = ['user1@example.com', 'user2@example.com', 'user3@example.com'];
  members.forEach((member) => changePassword_(member));
};
```

### Change GSuite Passwords Periodically

You can create a time-based trigger in Google Scripts to automatically run the reset function at specific intervals (like update password on the first of every month).

```javascript
ScriptApp.newTrigger('resetGSuitePasswordForUsers').timeBased().onMonthDay(1).create();
```

The Google Script is written in [ES6 with V8 runtime](/es6-google-apps-script-v8-200206). If V8 is not enabled for your GSuite account, replace the manifest `appsscript.json` file with this:

```json
{
  "timeZone": "Asia/Kolkata",
  "dependencies": {
    "enabledAdvancedServices": [
      {
        "userSymbol": "AdminDirectory",
        "serviceId": "admin",
        "version": "directory_v1"
      }
    ]
  },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8"
}
```

### Enable Admin Directory Service

To use the Advanced Directory advanced Google service inside your Google Apps Script project, follow these instructions:

- Open the Google Script, select the Resources menu and then choose Advanced Google services.
- In the Advanced Google Service dialog that appears, toggle on/off switch next to the Admin Directory service
- Click OK to save your changes.
