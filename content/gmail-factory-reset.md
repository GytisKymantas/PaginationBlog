---
title: 'How to Factory Reset your Gmail Account'
date: '2022-02-02'
slug: '/code/gmail-factory-reset-200531'
category: 'Code'
tags:
  - 'Gmail'
  - 'Archives'
  - 'Google Apps Script'
---

Your phone, the iPad, and your laptop offer a 'hard reset' option that resets your device to the default factory settings. Once you perform a factory reset, it erases all the apps, files, and settings and there's no way to recover the wiped off data.

### What is Gmail Factory Reset

If you ever need to "factory reset" an old Gmail account that you no longer use, and start afresh with a clean slate, Google Scripts can help. The script will perform a series of tasks to completely reset your Gmail account:

1. Delete all Gmail labels
2. Delete all Gmail filters
3. Delete all Draft messages
4. Delete all email messages in Gmail
5. Delete all spam messages
6. Permanently empty your Gmail trash folder
7. Remove Out-of-Office message
8. Disables POP and IMAP
9. Remove all email signatures in Gmail
10. Stops all email forwarding

#### ⚠️ Warning: Danger Ahead

Before you proceed, please understand that **hard reset is an irreversible process** and you will not be able to recover your Gmail data after the reset is complete.

The Google Script is available on [Github](https://github.com/labnol/code/tree/master/google-apps-script/factory-reset-gmail) or you can [click here](https://script.google.com/d/1L5qGWkp9eA7DlX4RKB6D62IBki_PVnuohmlpyE6UoDyWIAT3OoWhGNli/newcopy) to make a copy of the script in your Google account. The script uses the official Gmail API to format your Gmail account.

#### Remove all Gmail Labels

```javascript
const deleteGmailLabels = () => {
  GmailApp.getUserLabels().forEach((label) => {
    label.deleteLabel();
  });
};
```

#### Remove all Gmail Filters

```javascript
const deleteGmailFilters = () => {
  const { filter: gmailFilters } = Gmail.Users.Settings.Filters.list('me');
  gmailFilters.forEach(({ id }) => {
    Gmail.Users.Settings.Filters.remove('me', id);
  });
};
```

#### Remove all Gmail Drafts

```javascript
const deleteGmailDrafts = () => {
  GmailApp.getDrafts().forEach((draft) => {
    draft.deleteDraft();
  });
};
```

#### Reset Gmail Settings

Turn off vacation autoresponders, disables IMAP and POP access, removes all email signatures and disables email forwarding.

```javascript
const resetGmailSettings = () => {
  const { Settings } = Gmail.Users;
  // Disable Out-of-office
  Settings.updateVacation({ enableAutoReply: false }, 'me');

  // Delete Gmail Signatures
  const { sendAs } = Settings.SendAs.list('me');
  sendAs.forEach(({ sendAsEmail }) => {
    Settings.SendAs.update({ signature: '' }, 'me', sendAsEmail);
  });

  // Disable IMAP
  Settings.updateImap({ enabled: false }, 'me');

  // Disable POP
  Settings.updatePop({ accessWindow: 'disabled' }, 'me');

  // Disable Auto Forwarding
  const { forwardingAddresses = [] } = Settings.ForwardingAddresses.list('me');
  forwardingAddresses.forEach(({ forwardingEmail }) => {
    Settings.ForwardingAddresses.remove('me', forwardingEmail);
  });
};
```

#### Delete all Gmail Messages

This will move all inbox messages, archived message, and spam to the trash folder. Google Scripts can execute for 5 minutes in one batch so we added a check to stop the script if it is taking longer to complete.

```javascript
const startTime = Date.now();
const isTimeLeft = () => {
  const ONE_SECOND = 1000;
  const MAX_EXECUTION_TIME = ONE_SECOND * 60 * 5;
  return MAX_EXECUTION_TIME > Date.now() - startTime;
};

/**
 * Move all Gmail threads to trash folder
 */
const deleteGmailThreads = () => {
  let threads = [];
  do {
    threads = GmailApp.search('in:all', 0, 100);
    if (threads.length > 0) {
      GmailApp.moveThreadsToTrash(threads);
      Utilities.sleep(1000);
    }
  } while (threads.length && isTimeLeft());
};

/**
 * Move all Spam email messages to the Gmail Recyle bin
 */
const deleteSpamEmails = () => {
  let threads = [];
  do {
    threads = GmailApp.getSpamThreads(0, 10);
    if (threads.length > 0) {
      GmailApp.moveThreadsToTrash(threads);
      Utilities.sleep(1000);
    }
  } while (threads.length && isTimeLeft());
};
```

#### Permanently Empty the Trash Folder

```javascript
/**
 * Permanetly empty the Trash folder
 */
const emptyGmailTrash = () => {
  let threads = [];
  do {
    threads = GmailApp.getTrashThreads(0, 100);
    threads.forEach((thread) => {
      Gmail.Users.Threads.remove('me', thread.getId());
    });
  } while (threads.length && isTimeLeft());
};
```

Also see: [Archive Old Emails in Gmail](https://emailstudio.pro)
