---
title: "How to Get your Visitor's Location from their IP address"
date: '2020-09-22'
slug: '/visitor-country-ip-address-200822'
category: 'Internet'
description: 'Use JavaScript to detect the country and location of your website visitors from their IP address and serve different payment options or offer purchasing power parity.'
tags:
  - 'Paypal'
  - 'Google Maps'
  - 'Javascript'
  - 'Archives'
---

The PayPal website mentions a list of [200 countries](https://www.paypal.com/in/webapps/mpp/country-worldwide) where the PayPal service is officially available. There are about 46 countries and regions left where buyers cannot transact using PayPal.

As highlighted in the Google Map above, the regions where PayPal is not available includes Afghanistan, Bangladesh, Cuba, Ghana, Iraq, Iran, North Korea, Lebanon, Liberia, Libya, Pakistan, Palestine, Sudan, Syria, Turkey and Uzbekistan.

If you have a [digital goods store](/internet/sell-digital-products-online/28554/) that relies exclusively on the PayPal service for processing payments, you could be losing business as customers from countries like Bangladesh, Turkey or Pakistan would not be able to make payments.

As an alternative, you can sign-up for a non-US payment processing service - Paddle and FastSpring are good alternatives - and offer these as payment options on the checkout screen to customers who land on your website from countries where PayPal is unavailable.

### Detect the Country of your Website Visitors

I have implemented a similar technique for my [Google add-ons](https://digitalinspiration.com/) website and it seems to work well. The website uses PayPal and Stripe as the default payment handler but if someone lands from a non-supported country, the PayPal buttons are hidden and they are offered an option to checkout with Paddle.

To get the website visitor's location, I use the [ip2c.org](https://about.ip2c.org/) service that quickly resolves the visitor's IP address to their country. If you fetch the [ip2c.org/self](https://ip2c.org/self) service, it returns the ISO code of the country of the computer that made the HTTP request.

```JavaScript
const getVisitorCountry = () => {
  return new Promise((resolve, reject) => {
    window
      .fetch("https://ip2c.org/self")
      .then((response) => response.text())
      .then((data) => {
        const [status, country] = String(data).split(";");
        if (status !== "1") {
          throw new Error("Unable to fetch country");
        }
        resolve(country);
      })
      .catch(() => {
        resolve("US");
      });
  });
};

getVisitorCountry().then((country) => {
  if (["PK", "BD", "TR", "AF"].indexOf(country) !== -1) {
    // show Paddle Buttons
  } else {
    // show PayPal buttons
  }
});

```

Some online stores follow the "Purchasing Power Parity" theory ([learn more](http://pubdocs.worldbank.org/en/332341517441011666/PPP-brochure-2017-webformat-rev.pdf)) where non-tangible goods like video courses and software licenses are priced dynamically depending on the country of customers. The above client-side approach for detecting the visitor's location can be help in such scenarios as well.
