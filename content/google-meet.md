---
title: 'How to Schedule a Meeting in Google Meet with Apps Script'
date: '2022-05-16T01:10:10.000Z'
slug: '/schedule-google-meeting-calendar-210529'
category: 'Code'
description: 'Learn how to setup a video meeting inside Google Meet with the Google Calendar API and Apps Script'
tags:
  - 'Google Apps Script'
  - 'Archives'
  - 'Google Calendar'
---

This Apps Script sample shows how you can programmatically schedule video meetings inside Google Meet with one or more participants using the [Google Calendar API](https://developers.google.com/calendar/v3/reference/events). It can be useful for teachers who wish to schedule regular meetings with their students but instead of manually creating meeting invites, they can easily automate the whole process for the entire class.

### Setup Google Meeting with Apps Script

Give your meeting a title, the start date, the meeting duration, the list of attendees and how often you wanted to be reminded of the upcoming Google meeting. A new meeting event will be added to your Google Calendar and you'll also be provided with a Google Meet link that you share with your students and colleagues through [mail merge](/software/mail-merge-with-gmail/13289/).

```js
const createGoogleMeeting = () => {
  // The default calendar where this meeting should be created
  const calendarId = 'primary';

  // Schedule a meeting for May 30, 2022 at 1:45 PM
  // January = 0, February = 1, March = 2, and so on
  const eventStartDate = new Date(2022, 5, 30, 13, 45);

  // Set the meeting duration to 45 minutes
  const eventEndDate = new Date(eventStartDate.getTime());
  eventEndDate.setMinutes(eventEndDate.getMinutes() + 45);

  const getEventDate = (eventDate) => {
    // Dates are computed as per the script's default timezone
    const timeZone = Session.getScriptTimeZone();

    // Format the datetime in `full-date T full-time` format
    return {
      timeZone,
      dateTime: Utilities.formatDate(eventDate, timeZone, "yyyy-MM-dd'T'HH:mm:ss"),
    };
  };

  // Email addresses and names (optional) of meeting attendees
  const meetingAttendees = [
    {
      displayName: 'Amit Agarwal',
      email: 'amit@labnol.org',
      responseStatus: 'accepted',
    },
    { email: 'student1@school.edu', responseStatus: 'needsAction' },
    { email: 'student2@school.edu', responseStatus: 'needsAction' },
    {
      displayName: 'Angus McDonald',
      email: 'assistant@school.edu',
      responseStatus: 'tentative',
    },
  ];

  // Generate a random id
  const meetingRequestId = Utilities.getUuid();

  // Send an email reminder a day prior to the meeting and also
  // browser notifications15 minutes before the event start time
  const meetingReminders = [
    {
      method: 'email',
      minutes: 24 * 60,
    },
    {
      method: 'popup',
      minutes: 15,
    },
  ];

  const { hangoutLink, htmlLink } = Calendar.Events.insert(
    {
      summary: 'Maths 101: Trigonometry Lecture',
      description: 'Analyzing the graphs of Trigonometric Functions',
      location: '10 Hanover Square, NY 10005',
      attendees: meetingAttendees,
      conferenceData: {
        createRequest: {
          requestId: meetingRequestId,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
      start: getEventDate(eventStartDate),
      end: getEventDate(eventEndDate),
      guestsCanInviteOthers: false,
      guestsCanModify: false,
      status: 'confirmed',
      reminders: {
        useDefault: false,
        overrides: meetingReminders,
      },
    },
    calendarId,
    { conferenceDataVersion: 1 }
  );

  Logger.log('Launch meeting in Google Meet: %s', hangoutLink);
  Logger.log('Open event inside Google Calendar: %s', htmlLink);
};
```

Also see: [Generate Add to Calendar Links](/calendar)

### Google Meeting with Recurring Schedule

The above code can be extended to create meetings that occur on a recurring schedule.

You need to simply add a `recurrence` attribute to the meeting event resource that specifies the recurring event in [RRULE notation](https://datatracker.ietf.org/doc/html/rfc7529). For instance, the following rule will schedule a recurring video meeting for your Maths lecture every week on Monday, Thursday for 8 times.

```js
{
  ...event,
  recurrence: ["RRULE:FREQ=WEEKLY;COUNT=8;INTERVAL=1;WKST=MO;BYDAY=MO,TH"];
}
```

Here are some other useful `RRULE` examples:

- `FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR` - Occurs every week except on weekends
- `FREQ=MONTHLY;INTERVAL=2;BYDAY=TU` - Occurs every Tuesday, every other month
- `INTERVAL=2;FREQ=WEEKLY` - Occurs every other week
- `FREQ=WEEKLY;INTERVAL=2;BYDAY=TU,TH;BYMONTH=12` - Occurs every other week in December on Tuesday and Thursday
- `FREQ=MONTHLY;INTERVAL=2;BYDAY=1SU,-1SU` - Occurs every other month on the first and last Sunday of the month
