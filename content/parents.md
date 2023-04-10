---
title: 'How Teachers can Email Parents of Students from Google Forms'
date: '2022-09-07T01:01:01.01Z'
slug: '/email-student-parents-220907'
category: 'Internet'
description: 'Learn how teachers can automatically send emails to the parents of a student on behalf of the school after they submit a Google Form.'
tags:
  - 'Google Sheets'
  - 'Archives'
  - 'Google Forms'
  - 'Document Studio'
---

A school provides email accounts for students that are enrolled in high school. The school has published a Google Form and any student can put their name in the form to request access to an email address.

Parent's consent is required though. When a child submits the request, an email confirmation is sent to the parent of the child for them to provide consent before the student's email address can be created.

## Lookup Parent's Data in Google Sheets

The key here is that an email should be sent to the parent of the student. This data itself is not available in the Google Form but the school maintains a Google Sheet with the parent's data and we'll do a lookup to fetch the parent's name and email address based on the student's name.

When the Google Form is submitted, a new row is added to the Google Sheet with the form response.

We'll add two new columns to the form response sheet that will [lookup](/google-form-formulas-050520) up the parent's email address and name from the parent records sheet. It uses [ArrayFormula](/internet/arrayformula-copy-formulas-in-entire-column/29711/) to instantly fetch the parent's data in the form sheet after a new form response is submitted.

```js
=ArrayFormula(
    IF(ROW(B:B) = 1, "Parent's Email",
    IF(NOT(ISBLANK(B:B)),VLOOKUP(B:B, Parents!$A$2:$C$100,3, FALSE),))
)
```

If the `Row Number` of the current row is 1, we set the column title which in this case is `Parent's Email`. If the row is not 1 and there's form data in column B, we use `VLOOKUP` to get the matching data from the parent records sheet into the form response sheet.

## Send Email to Student's Parent

The first step is to install [Document Studio](https://workspace.google.com/marketplace/app/document_studio/429444628321) from the Google marketplace. Next, switch to the Google Sheet storing the Google Form responses and go to Extensions > Document Studio > Open to launch the add-on.

Create a new workflow and give it a descriptive name like `Send Consent Letters to Parents`. On the task screen, create a new Email task and choose the Parent's Email field from the "Send Email to" dropdown.

Here's how the final email template will look like:

You can include [placeholders](https://digitalinspiration.com/docs/document-studio/workflow/merge-field-markers), enclosed in double curly braces, to include form answers and values from Google Sheets formulas.

Switch to the `Save` screen of your workflow and turn on the option that says `Run on Form Submit`. This will internally enable the [form submit trigger](https://digitalinspiration.com/docs/document-studio/workflow/triggers) and your workflow will run whenever a new form is submitted.

Go to your Google Form, submit a sample response and you should see a copy of the consent email that was sent to the student's parent.

You may also add a Create File task in the same workflow to generate a consent document in Microsoft Word or PDF. This can be automatically attached to the email message and the parent can email the signed copy.

For assistance, see this tutorial - [Generate Agreements from Google Form Responses](https://digitalinspiration.com/docs/document-studio/google-forms/agreement-docs)
