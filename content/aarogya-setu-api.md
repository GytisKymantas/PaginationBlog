---
title: 'How Businesses can Check Health Status of Employees with Aarogya Setu'
date: '2020-08-23'
slug: '/aarogya-setu-api-200823'
category: 'Code'
description: 'How employers can use the Aarogya Setu API to automatically check the health status and COVID-19 risk level of their staff members.'
tags:
  - 'India'
  - 'Google Apps Script'
  - 'Archives'
---

The Government of India has recently introduced an "open API" for [Aarogya Setu](https://aarogyasetu.gov.in/), the world's most popular [contact tracing app](/covid19-india-alerts-2004031) that has more than 110 million users across the Android and iOS platform. The Aarogya Setu API, in simple English, will help organizations automatically check the health status of their employees.

Currently, when an employee enters his or her office, they are required to show their Aarogya Setu app at the reception and are allowed entry only if the status is green meaning they haven't been in proximity of an infected person. With the API in places, business can automatically know the risk level of their employees.

This could save some effort since the HR department can create a Google Sheet with the phone numbers of all employees and a Google Script can automatically get the health status of each number in that list. The script can then email the list of employees who are at moderate or high risk for further action.

Also see: [Covid-19 India Tracker](/code/covid-19-india-tracker-200325)

### How to Use the Aarogya Setu API

You can sign-up for the API at [openapi.aarogyasetu.gov.in](https://openapi.aarogyasetu.gov.in/). This isn't a straightforward process - you have to send an email and approval is granted only if your business has more than 50 employees. Assuming your business has been granted access to the API, here's how you can use it with Google Sheets and Google Scripts.

```JavaScript
class AaryogyaSetu {
  constructor({ apiKey, userName, password }) {
    this.apiKey = apiKey;
    this.userName = userName;
    this.password = password;
    this.api = "https://api.aarogyasetu.gov.in";
    this.token = null;
  }

  /* Get the authorization token for the header
     The token is valid for 1 hour */
  getToken() {
    if (this.token === null) {
      const { token } = this.fetch("/token", {
        username: this.userName,
        password: this.password,
      });
      this.token = token;
    }
    return this.token;
  }

  /* Request Aarogya Setu status of a
     user using phone number of the user */
  getUserStatus(phone_number) {
    const { request_id, request_status } = this.fetch("/userstatus", {
      phone_number,
    });
    return request_status !== "Approved";
  }

  fetch(endpoint, payload) {
    const mimeType = "application/json";
    const headers = {
      Accept: mimeType,
      "Content-Type": mimeType,
      "x-api-key": this.apiKey,
    };
    if (endpoint !== "/token") {
      headers["Authorization"] = this.getToken();
    }
    const options = {
      method: "POST",
      contentType: mimeType,
      headers: headers,
      payload: JSON.stringify(payload),
    };
    const url = `${this.api}${endpoint}`;
    const response = UrlFetchApp.fetch(url, options);
    return JSON.parse(response.getContentText());
  }
}

/* The API key can be found in your Aarogya Setu dashboard */
const main = () => {
  const aarogyasetu = new AaryogyaSetu({
    apiKey: "xyz1234",
    username: "amit@labnol.org",
    password: "India1234",
  });

  const phoneNumber = "9760008500";
  const userStatus = aarogyasetu.getUserStatus(phoneNumber);
  if (!userStatus) {
    console.log(`The Aarogya Setu status of ${phoneNumber} was denied`);
  }
};
```

When you make a request to the Aarogya Setu API requesting the risk status of an employee identified by their phone number, a notification is sent to the Aarogya Setu user. If they approve the status (or if they have pre-approved the request earlier), a POST request is made to your callback URL with the help status of the user.

The Google Script can be [published as a web app](/code/19871-get-post-requests-google-script) with the `doPost` method and that be used as a callback URL for the Open API.
