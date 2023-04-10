---
title: 'How to Get the Quiz Score in Google Forms with Apps Script'
date: '2020-03-01'
slug: '/code/google-quiz-score-200301'
category: 'Code'
description: 'Teachers can easily create an online quiz using Google Forms and students can view their test scores immediately after form submission.'
tags:
  - 'Google Apps Script'
  - 'Google Forms'
---

Teachers can use Google Forms to create an online quiz and students can view their test scores immediately after [form submission](https://www.labnol.org/internet/convert-google-forms-pdf/32088/). With Apps Script, you can set up automatic [email notifications](https://gsuite.google.com/marketplace/app/email_notifications_for_google_forms/984866591130) and send quiz scores to parents after a student has taken the quiz.

Here's a sample Google Script that will iterate through every answer in the most recent Google Form response and log the max score (points) of a gradable question and the score for the respondent's submitted answer.

```javascript
function getGoogleFormQuizScore() {
  // Returns the form to which the script is container-bound.
  var form = FormApp.getActiveForm();

  // Get the most recently submitted form response
  var response = form.getResponses().reverse()[0];

  // Gets an array of all items in the form.
  var items = form.getItems();

  for (var i = 0; i < items.length; i++) {
    var question = items[i];

    // Get the item's title text
    var qTitle = question.getTitle();

    // Get the item's type like Checkbox, Multiple Choice, Grid, etc.
    var qType = question.getType();

    // Gets the item response contained in this form response for a given item.
    var responseForItem = response.getResponseForItem(question);

    //Gets the answer that the respondent submitted.
    var answer = responseForItem ? responseForItem.getResponse() : null;

    var item = castQuizItem_(question, qType);

    // Quiz Score and Maximum Points are not available
    // for Checkbox Grid and Multiple Choice Grid questions
    // through they are gradable in the Google Form

    if (item && typeof item.getPoints === 'function') {
      var maxScore = item.getPoints();
      var gradableResponseForItem = response.getGradableResponseForItem(question);
      var score = gradableResponseForItem.getScore();

      Logger.log(String(qType), qTitle, answer, maxScore, score);
    }
  }
}
```

The Google Forms API can only return scores for Multiple Choice, Dropdown and Checkbox style questions. It cannot provide scores for the grid type of questions where the item is presented as a grid of rows and columns.

1. Checkbox Grid - A question item that allows the respondent to select multiple choices per row from a sequence of checkboxes.
2. Choice Grid - A question item that allows the respondent to select one choice per row from a sequence of radio buttons.

```js
function castQuizItem_(item, itemType) {
  if (itemType === FormApp.ItemType.CHECKBOX) {
    return item.asCheckboxItem();
  }
  if (itemType === FormApp.ItemType.DATE) {
    return item.asDateItem();
  }
  if (itemType === FormApp.ItemType.DATETIME) {
    return item.asDateTimeItem();
  }
  if (itemType === FormApp.ItemType.DURATION) {
    return item.asDurationItem();
  }
  if (itemType === FormApp.ItemType.LIST) {
    return item.asListItem();
  }
  if (itemType === FormApp.ItemType.MULTIPLE_CHOICE) {
    return item.asMultipleChoiceItem();
  }
  if (itemType === FormApp.ItemType.PARAGRAPH_TEXT) {
    return item.asParagraphTextItem();
  }
  if (itemType === FormApp.ItemType.SCALE) {
    return item.asScaleItem();
  }
  if (itemType === FormApp.ItemType.TEXT) {
    return item.asTextItem();
  }
  if (itemType === FormApp.ItemType.TIME) {
    return item.asTimeItem();
  }
  if (itemType === FormApp.ItemType.GRID) {
    return item.asGridItem();
  }
  if (itemType === FormApp.ItemType.CHECKBOX_GRID) {
    return item.asCheckboxGridItem();
  }
  if (itemType === FormApp.ItemType.PAGE_BREAK) {
    return item.asPageBreakItem();
  }
  if (itemType === FormApp.ItemType.SECTION_HEADER) {
    return item.asSectionHeaderItem();
  }
  if (itemType === FormApp.ItemType.VIDEO) {
    return item.asVideoItem();
  }
  if (itemType === FormApp.ItemType.IMAGE) {
    return item.asImageItem();
  }
  return null;
}
```

### Quiz in Google Forms with Score
