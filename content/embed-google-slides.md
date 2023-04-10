---
title: 'How to Embed Google Slides Like a Pro!'
date: '2020-06-15'
slug: '/embed-google-slides-200615'
category: 'Internet'
tags:
  - 'Google Slides'
  - 'Embed'
  - 'Archives'
---

It takes 2 easy steps to embed any Google Slides deck in your website. Open Google Slides, go to the File Menu and choose Publish to web. Your presentation becomes public and you are presented with an IFRAME HTML tag that you can copy-paste in any web page.

```html
<iframe
  src="https://docs.google.com/presentation/d/e/xxxx/embed"
  frameborder="0"
  width="800"
  height="600"
></iframe>
```

## Customize your Google Slide Embeds

The embedded Google Slides player can be easily customized by modifying the `src` attribute of the IFRAME tag.

### Auto Start the Embedded Slideshow

Append `start=true` to the URL and the slideshow will auto-play as soon as someone opens your webpage. Or set `start=false` and the slideshow will only play when the visitor click the play icon in the slides player.

### Change the duration of slides

With `start` set to true, you can add `delayms=1000` to the URL to specify the time (in milliseconds) for which each slide should display before auto-advancing to the next one. For instance, `start=true&delayms=6000`, the slideshow will autoplay and the slides will auto-advance every 6 seconds (6000 ms).

### Play the slideshow in Loop

Add `restart=true` to the slideshow URL and it will play in a loop, meaning it will auto-advance to the first slide after the last one.

### Start from a Specific Slide

Your embedded Google Slides presentation will always start from the first slide in the deck. You can however customize the URL to start the slideshow from a specific slide by adding `slide=id.p#` to the URL, where # is the slide number.

For instance, if you wish to embed a slideshow with 8 seconds gap and starting from the 4th slide, your URL would be:

`https://docs.google.com/presentation/d/e/xxxx/embed?start=true&delayms=8000&slide=id.p4`

### Remove the Google Branding and Player Control

The Google Slides player displays the controls and Google branding in the bottom bar. However, if you wish to play the slideshow in kiosk mode without any player controls or Google Branding, just adding `rm=minimal` to the IFRAME link (rm = Render Mode)

### Make the Google Slides player Responsive

The embed code provided by Google Slides has a fixed height and width and will thus display at the same size on both desktops and mobile screens. You can however make the player responsive with a little bit of CSS as detailed below.

1. Remove the height, width and other parameters from the IFRAME tag:

```html
<iframe src="https://docs.google.com/presentation/d/e/xxxx/embed"></iframe>`
```

2. Add this CSS to your HTML page. The `padding-bottom` is set to 56.25% for 16x9 ratio (9/16\*100) so the height of the player would be 56.25% of the player's width. Set the value to 75% for a 4:3 ratio.

```html
<style>
  .responsive-google-slides {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 Ratio */
    height: 0;
    overflow: hidden;
  }
  .responsive-google-slides iframe {
    border: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
</style>
```

3. Wrap the original IFRAME inside the responsive class and you are good to go. Here's a [live demo](https://codepen.io/labnol/pen/xxZEGZX?editors=1100#code-area).

```html
<div class="responsive-google-slides">
  <iframe src="https://docs.google.com/presentation/d/e/xxxx/embed"></iframe>
</div>
```

Also see: 🦋 [Secret Google Docs URL Tricks](/internet/direct-links-for-google-drive/28356/)
