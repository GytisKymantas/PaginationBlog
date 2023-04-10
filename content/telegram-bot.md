---
title: 'How to Create a Telegram Bot for Sending Notifications using Google Apps Script'
date: '2021-08-14T00:10:10.000Z'
slug: '/telegram-bot-notifications-210814'
description: 'Learn how to create your own Telegram bot with Google Apps Script and post notification messages from Google Sheets, Forms and other Google apps.'
category: 'Code'
tags:
  - 'Archives'
  - 'Google Apps Script'
---

Would you like to receive notifications in your Telegram messenger when a new form response is submitted in Google Forms. Or maybe send a notification alert to your entire Telegram group when an important event happens.

In this step-by-step tutorial, you'll learn how to create a new Telegram bot and send messages to your Telegram channel and groups through this bot with the help of Google Apps Script.

## Create a new Telegram Bot

Open the telegram app on your desktop or mobile phone and search for the [@BotFather bot](https://t.me/BotFather). This is the official Telegram bot that you can interact with to create and manage your own private bots.

1. Inside the chat session with `@BotFather`, click the Start button and type the command `/newbot` to create a new Telegram bot.
2. Give your Telegram bot a short name and then provide a username for your bot. Mine is `myfirstbotin2021_bot` (most good names have already been taken).
3. Telegram will provide you with an API token. Note down the token value as we'll be requiring it in a later step.

Your first telegram bot has been successfully created. In the next step, and this is important, you need to interact with this bot from your own Telegram account.

You can do this by opening your bot link - something like `t.me/username_bot` and click the `Start` button. Type `Hello bot!` or any text to warmup the bot.

### Post to Telegram Group

If you would like to post messages to a Telegram Group through this bot, you need to first add this bot as a member of that group, make the bot as an admin of the group and then post a warmup message in that group from your own account.

### Post to Telegram Channel

Finally, if you wish to post messages to a Telegram channel from the bot, the bot should be added as a member of that channel and promoted as an admin. Next, send a warmup message in the channel from your own account.

## Get list of Telegram Channels and Groups

Now that our Telegram bot has been added to various groups and channels, we can use Google Apps Script to get a list of all places where the bot has access to write messages.

Open the Google Script editor, and run the following code. Remember to replace the `BOT_TOKEN` with your bot's own token.

```js
// Returns a Object of chat_id and names

const getTelegramGroupsAndChannels = () => {
  // Type your Telegram Bot token here
  const BOT_TOKEN = '1986321029:AAF09NbQfA9wdCyLAHsjpoSC43ai0P0VEh4';

  const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`;

  const response = UrlFetchApp.fetch(TELEGRAM_API);

  const { ok, result = [] } = JSON.parse(response);

  if (!ok) {
    throw new Error('Please check your API token again!');
  }

  if (result.length === 0) {
    throw new Error('Please add this bot to a Telegram group or channel!');
  }

  const telegramBotList = {};

  result.forEach((e) => {
    const { message, my_chat_member, channel_post } = e;
    const { chat } = { ...message, ...my_chat_member, ...channel_post };
    const { title, id, username } = chat;
    telegramBotList[id] = { chat_id: `${id}`, title: title || username };
  });

  Logger.log(Object.values(telegramBotList));

  /* Prints an array of groups and channels known to your bot
   {chat_id=300816220, title=labnol},
   {chat_id=-595214405, title=Telegram Group},
   {chat_id=-10547249514, title=Telegram Channel} */
};
```

## Post Messages to Telegram

Now that we have the list of Telegram groups and channels where the bot has permission to post message, we can easily push a message to that group with the Telegram API.

You need the unique `chat_id` of the group or channel and your text message that may also contain emojis. If you have a multi-line message, remember to escape the string using `encodeURIComponent` such that new line characters `\n` are replaced with `%0A` and so on.

```js
const postMessageToTelegram = () => {
  // Provide the Id of your Telegram group or channel
  const chatId = '-59521405';

  // Enter your message here
  const message = 'How are you 💕';

  const BOT_TOKEN = '1986321029:AAF09NbQfA9wdCyLAHsjpoSC43ai0P0VEh4';

  const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const text = encodeURIComponent(message);

  const url = `${TELEGRAM_API}?chat_id=${chatId}&text=${text}`;

  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });

  const { ok, description } = JSON.parse(response);

  if (ok !== true) {
    Logger.log(`Error: ${description}`);
  }
};
```

### Send Rich Text Notifications with Telegram

In addition to plain text, you can also post rich text messages styled either with HTML or the Markdown format. In either case, you need to set the `parse_mode` to either HTML or MarkdownV2 depending on the format of the input text.

Here's the same `sendMessage` API but with [rich HTML text](/internet/send-html-email/19672/).

```js
const postRichHTMLToTelegram = () => {
  // Chat Id of the Telegram user, group or channel
  const chatId = '-5954105';

  // Rich text with HTML tags and entities
  const message = `Telegram supports different <a href="https://w3.org">HTML5 tags</a>. These include classic tags like <b>bold</b>, <em>emphasis</em>, <strong>strong</strong>, <s>strikethrough</s>, <u>underlines</u>, and <code>preformatted code</code>.`;

  const BOT_TOKEN = '1986321029:AAF09NbQfA9wdCyLAHsjpoSC43ai0P0VEh4';

  const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  // Escape the input text
  const text = encodeURIComponent(message);

  const url = `${TELEGRAM_API}?chat_id=${chatId}&text=${text}&parse_mode=HTML`;

  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });

  const { ok, description } = JSON.parse(response);

  if (ok !== true) {
    Logger.log(`Error: ${description}`);
  }
};
```

Please note that if an HTML tag is not support by Telegram, `<H1>` or `<TABLE>` for example, your message would be rejected. [Click here](https://core.telegram.org/bots/api#html-style) to see the full list of HTML tags supported by Telegram.

Also see: [Send Push Notifications with Google Forms](https://digitalinspiration.com/docs/form-notifications/phone-push-notifications)
