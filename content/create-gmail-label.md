---
title: 'Create Gmail Labels with the Gmail API'
date: '2020-01-14'
slug: '/code/create-gmail-labels-200201'
category: 'Code'
tags:
  - 'Google Apps Script'
  - 'Gmail'
---

You can create labels or folders in Gmail programmatically with the Gmail API. The GmailApp service of Google Apps Script includes the `GmailApp.createLabel()` method to quickly create new labels but one downside is that this method doesn't return the internal id of the Gmail Label.

The Gmail Label Id is required if you wish to apply that label to multiple Gmail threads in one go. Thus we are using the advanced Gmail service available inside Google Scripts to create Gmail Labels.

```javascript
const createGmailLabel = (labelName) => {
  const { labels = [] } = Gmail.Users.Labels.list('me');
  for (let i = 0; i < labels.length; i += 1) {
    const { name, id } = labels[i];
    if (name === labelName) {
      return id;
    }
  }
  const { id: newLabelId } = Gmail.Users.Labels.create(
    {
      name: labelName,
      labelListVisibility: 'labelShow',
      messageListVisibility: 'show',
    },
    'me'
  );
  return newLabelId;
};
```

If you are to apply this Gmail label to an array of Gmail messages, use the `batchModify` method available inside Gmail API.

```javascript
const applyGmailLabel = (messageIds, labelName) => {
  const labelId = createGmailLabel(labelName);
  Gmail.Users.Messages.batchModify(
    {
      addLabelIds: [labelId],
      ids: messageIds,
    },
    'me'
  );
};
```

These examples are written with [ES6 and Apps Script](/internet/google-apps-script-developers/32305/).
