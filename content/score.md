---
title: 'How to Calculate the Percentage Score in a Google Forms Quiz'
date: '2022-08-06T01:01:01.010Z'
slug: '/google-forms-quiz-score-percentage-220806'
category: 'Internet'
description: 'Learn how to find the percentage score of a quiz in Google Form with the help of a Google Sheets formula.'
tags:
  - 'Archives'
  - 'Formulas and Functions'
  - 'Google Forms'
---

We have created a simple quiz in Google Forms that has 3 questions and each correct answer gives you 10 points. The maximum score that can be attained in the quiz in thus 30 points.

When someone takes the quiz and submits the form, the responses are recorded in a Google Sheet that is set as the response destination for your Google Form.

There's something interesting here as well. If the associated form is a quiz, Google Sheets will automatically add an extra column in the response sheet titled "Score" and this column will be populated with the total marks obtained by respondent in the quiz.

## Convert Quiz Score to Percentage

A teacher may want to calculate the percentage score obtained by students in the Quiz and assign grades accordingly. This can be easily done with the help of [Array Formulas in Google Sheets](/internet/arrayformula-copy-formulas-in-entire-column/29711/) but before we get there, let's see how we can convert the quiz score (say, 20/30) into a percentage.

### Extract the Score Obtained

There are at least three way to extract the quiz score obtained from the cell B2. Let's explore some of them.

The `REGEXREPLACE` function will replace any string value matching the [RegEx](/internet/regular-expressions-forms/28380/) with another value. Here, we start with the first character in the cell that is not a digit, match everything until the end of the string and replace it with a blank. Thus the slash (/) and everything after the slash is replaced and we are only left with the score.

```js
=REGEXREPLACE(TO_TEXT(B2),"\D.+$","")
```

For the second approach, we use the `SPLIT` function to split the text in the score column, with slash as the delimiter, and then use the `INDEX` function to get the first value of the split array which contains the score.

```js
=INDEX(SPLIT(B2,"/"),1)
```

In the next approach, we use the `SEARCH` function to determine the position of the slash in the cell and use the `LEFT` function to get everything before the slash.

```js
=LEFT(B2,SEARCH("/",B2)-1)
```

### Extract the Total Quiz Score

We can use a similar approach to obtain the maximum score of a quiz and that number is after the slash in the Score column.

```js
=REGEXREPLACE(TO_TEXT(B2),"\d.+/","")
=INDEX(SPLIT(B2,"/"),2)
=RIGHT(B2,SEARCH("/",B2)-1)
```

## Calculate the Quiz Percentage

Now that we have formulas to separately extract the quiz score and total score, we can combine these to get the percentage score.

Your options are:

```js
=REGEXREPLACE(TO_TEXT(B2),"\D.+$","")/REGEXREPLACE(TO_TEXT(B2),"\d.+/","")
=INDEX(SPLIT(B2,"/"),1)/INDEX(SPLIT(B2,"/"),2)
=LEFT(B2,SEARCH("/",B2)-1)/RIGHT(B2,SEARCH("/",B2)-1)
```

Right-click the score column, choose `Insert 1 column left` from the contextual menu and paste any of the above formula in the cell C2. You may then copy the formula down to other rows that contain the quiz responses.

## Copy Down Quiz Score Percentage Automatically

One drawback of the previous approach is that you have to add the formulas in the row each time a new quiz is submitted.

A simple workaround to the problem is the [copy formula down](/internet/arrayformula-copy-formulas-in-entire-column/29711/) approach that will automatically add the formulas whenever a new quiz form is submitted.

Go to cell C1 and paste the formula below.

```js
=ArrayFormula(IF(ROW(B:B)=1, "Percentage",
   IF(NOT(ISBLANK(B:B)),LEFT(B:B,SEARCH("/",B:B)-1)/RIGHT(B:B,SEARCH("/",B:B)-1),)))
```

It looks at the row index and if it is the first row, it adds the column title. Next, it checks if there's a score value in the column B and then calculates the percentage score.

Next, select the C column, go to `Format > Number > Percent` to properly format the calculated percentage.

You can also [Document Studio](https://digitalinspiration.com/docs/document-studio/google-forms) to [send certificates based on Quiz scores](https://digitalinspiration.com/docs/document-studio/google-forms/certificate-slides).
