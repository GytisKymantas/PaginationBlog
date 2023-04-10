---
title: 'How to Send Google Forms with Pre-filled Answers'
date: '2021-01-01'
slug: '/prefilled-google-forms-200601'
category: 'Internet'
description: 'Learn how to prefill answers in Google Forms using data from a Google Sheet and send the pre-populated Google Forms as personalized emails.'
tags:
  - 'Google Forms'
  - 'Formulas and Functions'
  - 'Archives'
  - 'Mail Merge for Gmail'
  - 'Document Studio'
---

[Prefilled Google Forms](https://www.youtube.com/watch?v=vcEju__MPtw), where some of the fields in the form are pre-populated with answers you already have, make the process of filling out your forms easier and faster.

1. Your contacts are more likely to fill out the form as it takes less time for them to complete the remaining fields.
2. The form respondents are less likely to type incorrect data in fields, like the employee ID, that are pre-populated.
3. The forms feels more personal when people see their name and other personalized information pre-filled in the form.

### Create Pre-filled Google Forms with Google Sheets

This step-by-step video tutorial explains how you can create pre-filled Google Forms with dynamic information from a Google Sheet. You can then use [Mail Merge](https://gsuite.google.com/marketplace/app/mail_merge_with_attachments/223404411203) or [Document Studio](https://gsuite.google.com/marketplace/app/document_studio/429444628321) to automatically send the prefilled forms to your contacts in bulk with Gmail.

`video: https://www.youtube.com/watch?v=vcEju__MPtw`

In our example, the organization maintains their employee database in a Google Spreadsheet and they want to give employees an option to self-update their details in the spreadsheet with the help of Google Forms.

If you look at employee records in the Google Sheet carefully, you'll find that only some details of the employees are missing in the sheet. This is a perfect use case for using prefilled Google Forms as it be wasting employee productivity if we send them a blank Google Form and require them to fill out every single field.

For instance, in row #2, we know the location and gender of Angus but his date of birth is unavailable in our records. For row #4, the employee ID and email is known but Kiran's other details are missing.

#### Create the Google Form

To build this workflow, we'll create a Google Form with fields corresponding to the columns in the source Google Sheet. Here's how the final form would look like:

![](https://www.labnol.org/images/2023/123826.png)

#### Generate the Prefilled Form Link

Inside the Google Form editor, click the 3-dot menu choose the `Get pre-filled link` option. Here, fill in every field with dummy data that is easy to recognize and replace later. Once the fields have been filled, click the `Get Link` button to generate the prefilled link and copy it to your clipboard.

The link to the prefilled Google Form would look something like this.

```javascript
https://docs.google.com/forms/d/e/xxxx/viewform
   ?entry.1808207196=EMPLOYEEID&entry.1663131167=EMPLOYEENAME
   &entry.1819275928=2020-06-03&entry.2071782719=Female
   &entry.175059757=Hyderabad
```

It's long and complex but if you take a closer look, this is simply a collection of name and value pairs appended to the Google Form URL. Google Forms will assign a unique id to each field in the form and these are appended to the Form URL with your pre-populated value.

For instance, the Name field in your Google Form is internally represented as `entry.1663131167` in the form URL. If we replace the parameter value `EMPLOYEENAME` in the URL with another value, that would be pre-populated in the Google Form.

And this is exactly what we'll do to create personalized prefilled links for all the rows in our Google Sheet.

![](https://www.labnol.org/images/2023/prefilled-google-forms.png)

#### Add Form Formulas in Google Sheet

Inside your Google Spreadsheet, create a new sheet and rename it Form Link. Paste the prefilled Google Form link in the first cell (A1) of this blank sheet.

Next return to the Google Sheet that has the employee database and create a new column, say Google Form Link.

Now we need to replace the dummy values in our prefilled link with the actual values from the rows in the sheet and this can be easily done with `SUBSTITUTE` function of Google Sheets.

For instance, we need replace `EMPLOYEENAME` in the prefilled link with real names that are in column B of the spreadsheet. Our formula would be something like this:

```javascript
 =SUBSTITUTE('Form Link'!$A$1, "EMPLOYEENAME", B2)
```

We'll feed the result of this formula into another `SUBSTITUTE` function to replace another field, say EMPLOYEEID.

```javascript
=SUBSTITUTE(
   SUBSTITUTE('Form Link'!$A$1, "EMPLOYEENAME", B2),
   "EMPLOYEEID", A2)
```

This has to be repeated for every prefilled field in the Google Form.

If your prefilled data contains space, you need to wrap the results into another SUBSTITUTE function that will replace all occurrences of spaces with the plus symbol.

Our final prefilled link would be:

```javascript
=SUBSTITUTE(
  SUBSTITUTE(
   SUBSTITUTE(
    SUBSTITUTE(
     SUBSTITUTE(
      SUBSTITUTE('Form Link'!$A$1, "EMPLOYEEID", A2),
     "EMPLOYEENAME", B2),
    "2020-05-31",E2),
   "Female", C2),
  "Hyderabad", D2),
 " ", "+")
```

You can test the workflow using this [prefilled Google Form](https://docs.google.com/forms/d/e/1FAIpQLSc1sQ6mCgcNkt9OFhhwVosVodBm-LRVAAub_iSjGG-pSpt2gQ/viewform?usp=pp_url&entry.1808207196=A005&entry.1663131167=Jacob+Friedman&entry.1819275928=1930-07-29&entry.2071782719=&entry.175059757=) that will write your form submission in a new row of this [Google Sheet](https://docs.google.com/spreadsheets/d/1YB_TS8e97z81BWp5UgSNhugfjZmI7ETJSTm3czR_wYU/edit#gid=1535453044).

#### Copy-down the Google Forms Formula

You may use `ArrayFormula` to [copy down formulas](/internet/arrayformula-copy-formulas-in-entire-column/29711/) or, if you have only a few rows, select the first cell and drag the crosshair to the last row in the formula column as shown below:

#### Handling Dates in Google Forms

If you plan to prefill dates in the Google Form, you need rewrite your dates in the Google Sheets in a format that Google Forms can recognize.

This is easy to implement. Just select the column in your Google sheet that contains the dates, then go to the Format menu, choose Number > More Formats > More date and time format and choose the `YY-MM-DD` format.

Also see: [Create PDF from Google Forms](https://www.youtube.com/watch?v=0ec0zWN_Z8o)

#### How to Email Prefilled Google Form Links

You can use [Mail Merge with Gmail](https://gsuite.google.com/marketplace/app/mail_merge_with_attachments/223404411203) to send the prefilled forms to all the email addresses in one go from the Google Sheet itself.

When composing the email template for merge, select any text in the email body and convert it into a hyperlink. You can put the title of the column - `{{Google Form Link}}` as the hyperlink and this would be replaced with your Google Form link.

Please watch the [Mail Merge tutorial](https://www.youtube.com/watch?v=ChGBcFtYdVA) to learn more.
