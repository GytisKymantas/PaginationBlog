---
title: 'Build a COVID-19 Self Assessment Tool with Google Forms'
date: '2020-11-24'
slug: '/covid19-google-forms-201124'
category: 'Internet'
description: 'How to create a self-assessment form for COVID-19 that your employees and students must complete prior to entering the work premises. The form will automatically send a confirmation email to the respondent based on the results of their self-assessment.'
tags:
  - 'Google Forms'
  - 'Archives'
  - 'Coronavirus'
  - 'Guides'
---

Businesses and schools worldwide are using Google Forms to build COVID-19 self-declaration forms that employees, students and visitors must complete every day before they can attend work. Here is a sample [COVID-19 Health Screening Form](https://docs.google.com/forms/d/e/1FAIpQLSesLq2d2O2dJzhHREVZs0R7QsxZV8CRmqM9f2eyCQaoGEupGg/viewform) - if the answer is "yes" to any of the questions, the person is expected to stay home.

After a respondent submits the form, a confirmation email is sent to them instantly with the [Email Notifications](https://gsuite.google.com/marketplace/app/email_notifications_for_google_forms/984866591130) add-on. The email is like a clearance certificate detailing whether the person can attend work or not. If they are allowed entry, the email also contains a dynamic QR Code that can be scanned and verified at the entry point.

## Send Conditional Notification Emails

The [conditional notifications](https://digitalinspiration.com/docs/form-notifications/send-conditional-emails) feature of the Google Forms add-on automatically determines if the respondent should be sent the "Allowed to enter premises" email or not. It looks at the form's answers and compares them with the specified criteria to make this choice.

For instance, if the employee has entered a value greater than 100.4 in the temperature field, they are sent the "Work from home" email. Similarly, they are not allowed to attend work if they selected any value other than "None of the above" for the symptoms question.

To enable this workflow with Google Forms, you are required to create two email rules - one rule for employees that have passed the self-assessment test and the other rule for people who are required to work from home based on their self-assessment.

### Rule 1: Allowed to Attend Work

Create a new rule for the [respondents](https://digitalinspiration.com/docs/form-notifications/respondent-emails) and set the conditional notifications as shown in the screenshot.

You can put `{{Email Address}}` in the email field and this will be replaced with the respondent's email address that is submitted in the form entry. If you have a Google Form that is restricted to your school or organization, the email address of the submitter will be automatically recorded in the form entry.

For the email template, you can use the [QR Code](https://digitalinspiration.com/docs/form-notifications/barcode-qrcode) function that will add a dynamic image in the outgoing email with the form answers.

### Rule 2: Work from Home

To save time, [duplicate](https://digitalinspiration.com/docs/form-notifications/edit-delete-form-rules) the previous rule and edit the conditional notification to send a different email to people who aren't considered fit to attend office and should continue working from home.

If you compare this conditional logic screen with the previous one, you'll notice that it uses `OR` instead of `AND` with different criteria indicating that if either of the conditions is true, the email should be sent.

### Demo Check-in Google Form

If you would like to test this self-assessment tool, fill this [COVID-19 Google Form](https://forms.gle/9b8RwYHMQJm8j6b47) and you'll receive an instant confirmation email with the result. Here's a [copy of the email](files/email.pdf) sent by the Google Form when the respondent passes the self-assessment.

Check the [Form Notifications user guide](https://digitalinspiration.com/docs/form-notifications) to learn more about the features of the add-on.
