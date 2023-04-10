---
title: 'Get Email Alerts When COVID-19 Vaccines Become Available Near You'
date: '2021-05-01T01:10:10.000Z'
slug: '/covid19-vaccine-tracker-210501'
category: 'Code'
description: 'Monitor the availability of Covid-19 Vaccines in your city and get email alerts when vaccine doses are available for people above 18 years of age.'
tags:
  - 'Google Apps Script'
  - 'India'
  - 'Coronavirus'
  - 'Archives'
---

India is currently in the midst of a second wave of the Coronavirus and this one is far more devastating than what we have seen last year. The country is reporting close to [400,000+ new cases](https://docs.google.com/spreadsheets/d/1swdjquWqq5tjMm9tpxMa-9C8rjCyWVWHs-ODdAXfWDw/edit?usp=sharing) every day but the actual count of daily infections could be much higher.

The COVID-19 vaccination program in India was earlier available to people above 45 years of age but starting May 1st, anyone above the age of 18 years can get vaccinated. That said, vaccine availability remains an issue countrywide and it is cumbersome to manually check slots every few hours.

## COVID-19 Vaccines Near Me

The government's official website - [cowin.gov.in](https://www.cowin.gov.in/home) - has a useful search section that allows you see the nearby vaccination centers in your city or zip code. You'll also know how many vaccine doses are available at a specific center and the earliest date when the vaccine slots are likely to open up.

Based on the public CoWIN API, I have developed an open-source vaccine tracker that will automatically monitor vaccine availability near your location and will send email alerts as stocks become available. If you have taken the first vaccine dose already, you can specify your vaccine preference - Covaxin or Covishield - and monitor availability of specific vaccine.

### Build your own Covid-19 Vaccine Tracker

**Step 1:** To get started, [click here](https://docs.google.com/spreadsheets/d/1NPBFLOvNpqGMKUzPEMKRczmV9nNer6Ysv8pEPhOsuPI/copy) to make a copy of the Vaccine Tracker Google Sheet in your Google Drive. You should complete this step on a desktop computer as Google add-ons are not available on mobile devices yet.

**Step 2:** Click the Vaccine Tracker menu (near the Help menu) and choose Enable as shown in the screenshot.

**Step 3:** You may see an authorization window. If you get an "unverified app" message, click the Advanced link and choose "Go to Vaccine Alerts". The app is 100% safe and [open-source](https://github.com/labnol/covid19-vaccine-tracker).

**Step 4:** Go to Step 2 now and choose the `Enable` menu again to launch the tracker. Enter one more pin codes (comma separated), the email address where you wish to receive the alerts and the age group for which you need to monitor vaccine availability.

You can specify the start date and vaccine availability will be checked only after that date. This is useful for people who have been monitored the first dose and need to find a slot after 4-6 weeks for the second vaccine dose.

The vaccine availability is checked every day by default but you can change the frequency to every 4 hours or every hour.

Click the `Create Email Alert` button and your system is up and running. Google Sheets will run this monitor every day and send an email at 8 am indicating the availability of vaccines in your specified areas.

`video: https://www.youtube.com/watch?v=cnFfiveEaZk`

Here's a copy of the email sent by the vaccine tracker.

### Stop Vaccine Notifications

If you have been vaccinated and would like the vaccine tracker to stop sending you email alerts, here are [the steps](https://twitter.com/labnol/status/1394525661767757825):

1. Go to [Script Triggers](https://script.google.com/home/triggers)
2. Click the 3-dot menu against Vaccine Alerts trigger
3. Click Delete Trigger from the menu as shown in the screenshot.
