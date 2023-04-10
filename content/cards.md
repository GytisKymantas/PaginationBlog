---
title: 'How to Make Personalized Place Cards with Guest Names'
date: '2022-09-06T01:01:01.01Z'
slug: '/place-cards-with-names-220906'
category: 'Internet'
description: 'Place cards at weddings and parties can help your guests get to their designated table. The cards can be printed with guest names and table numbers assigned to each guest.'
tags:
  - 'Google Sheets'
  - 'Archives'
  - 'Google Slides'
  - 'Document Studio'
---

Whether it is a wedding party or a business conference, those tent-shaped place cards are ideal for helping your guests find their seats at the event.

This tutorial explains how you can create personalized place cards with the names of your guests and the table number to which they have been assigned. We'll use Google Sheets to create the party seating plan, Google Slides to design the place card template and Document Studio to generate those place cards as PDF files in Google Drive.

Let's get started.

## Create Guest Seating Plan

Create a new spreadsheet inside Google Sheets (`sheet.new`), enter the names from your guest list and assign a table number for each guest. Make sure that the two columns have a title as shown in the screenshot above.

Also see: [Create Business Cards from Google Sheets](https://digitalinspiration.com/docs/document-studio/google-sheets/create-presentations)

## Create Place Card Template

Create a new slide deck inside Google Slides (`slides.new`) or use this [readymade template](https://docs.google.com/presentation/d/1LVMql_PwInamAONbT3zdzhhhAePGFC51HKpx1ygyPrY/edit#slide=id.p) to quickly get started. Go to File > Page Setup and change the default page size to 1050x1200 pixels. Add placeholders for inserting the guest's name and the table number in the generated card.

Please ensure that the placeholders are enclosed inside double curly braces and that they exactly match the column titles in the previous step.

**Tip:** If you are no designer, use one of the Canva templates and import the design into Google Slide as described in [this tutorial](/import-canva-to-google-slides-220129).

## Configure Place Cards

The first step is to install [Document Studio](https://workspace.google.com/marketplace/app/document_studio/429444628321) from the Google marketplace. You can learn more about the installation process [here](https://digitalinspiration.com/docs/document-studio/install).

Next, switch to the Google Sheet containing your guest list and reload the sheet so that the recently installed Document Studio shows up inside the sheet.

Inside the Google Sheet, go to the Extensions menu, choose Document Studio and then choose Open. Create a new workflow, give it a descriptive name and then choose the Google Sheet that contains the guest list.

Proceed to the `Tasks` screen and choose the `Create File` task since we would be generating PDF files from data in Google Sheets.

For the Document Template field, select the `Google Slides` template that you have designed in the previous step. Then select a folder in Google Drive where the place cards would be saved. You may use `{{ Name of Guest }}` placeholder for the file name and thus it would create unique file names for each PDF.

### Generate Place Cards in Bulk

Now that your configuration is complete, go to the `Save Screen` and choose `Save and Run` workflow. You'll be present with the list of row numbers for which the place cards would be generated.

Click on `Run Workflow` to instantly generate personalized place cards for each of your guests.

All the place cards will be saved in your Google Drive folder. Advanced users may also [combine PDFs](https://digitalinspiration.com/docs/document-studio/google-sheets/combine-google-slides) and generate a single high-resolution PDF file ideal for printing. For small gatherings, you may even embed pictures of your guests in the place card for a more personalized touch.
