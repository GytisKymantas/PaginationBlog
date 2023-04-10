---
title: 'How to Hide Empty AdSense Slots When No Ads are not Available'
date: '2022-01-30'
slug: '/hide-adsense-ad-units-220130'
category: 'Internet'
description: 'When there are no advertisers available for a specific page, Google AdSense will replace the ad units on that page with a blank space. You can easily hide the empty slots with the help of CSS'
tags:
  - 'Google Adsense'
  - 'Archives'
---

If you are using Google AdSense to monetize your website, you may have noticed that there are instances when there are no ads showing up on one or more pages.

This is likely because Google AdSense is not able to find any advertisers that are probably willing to bid on your page at that time. Or may be you have blocked specific categories of advertisers from bidding on your page.

## When Ads Are Available

Here's a page with a Google AdSense ad unit placed somewhere in the middle of the page.

## When Ads Are Unavailable

And here's the same page with the same Google AdSense ad unit but with the ad unit replaced with a blank space as the ad inventory is not available.

## Behind the Scenes

When any Google AdSense ad unit on your website sends an ad request to Google’s servers, the AdSense server either responds with an ad or it sets the status of the ad unit to [unfilled](https://support.google.com/adsense/answer/10762946?hl=en) meaning that there are no ads to serve at that time.

If you would not like to see any whitespace in your website because of unavailability of ads, you can easily hide the unfilled ad units with CSS.

Open your website template and add the following CSS to the `<head>` section of your HTML:

```html
<style>
  ins.adsbygoogle[data-ad-status='unfilled'] {
    display: none !important;
  }
</style>
```

Now if there are any empty ad slots on your website, they will collapse and will not be displayed. You may also consider replacing the unfilled AdSense ad unit with a fallback image that internally links to one of your own pages.
