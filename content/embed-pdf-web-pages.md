---
title: 'A Better Way to Embed PDF Documents in Web Pages'
date: '2020-02-08'
slug: '/embed-pdf-200208'
category: 'Internet'
description: 'Learn how to embed content from PDF pages into your website using the new Adobe PDF viewer and offer an improved PDF reading experience to your readers.'
tags:
  - 'PDF'
  - 'Embed'
  - 'Archives'
---

How do you embed a PDF document into your website for inline viewing? One popular option is that you upload the PDF file to an online storage service, something like Google Drive or Microsoft's OneDrive, make the file public and then copy-paste the IFRAME code provided by these services to quickly embed the document in any website.

Here's a sample PDF embed code for Google Drive that works across all browsers.

```html
<iframe
  frameborder="0"
  scrolling="no"
  width="640"
  height="480"
  src="https://drive.google.com/file/d/<<FILE_ID>>/preview"
>
</iframe>
```

This is the most common method for embedding PDFs - it is simple, it just works but the downside is that you have no control over how the PDF files are presented in your web pages.

If you prefer to offer a more customized and immersive reading experience for PDFs in your website, check out the new [Adobe View SDK](https://www.adobe.io/apis/documentcloud/dcsdk/viewsdk.html). This is part of the Adobe Document Cloud platform but doesn't cost a penny.

Here are some unique features that make this PDF embed solution stand out:

- You can add annotation tools inside the PDF viewer. Anyone can annotate the embedded PDF and download the modified file.
- If you have embedded a lengthy document with multiple pages, readers can use the thumbnail view to quickly jump to any page.
- The PDF viewer can be customized to hide options for downloading and printing PDF files.
- There's built-in analytics so you know how many people saw your PDF file and how they interacted with the document.
- And my favorite feature of ViewSDK is the inline embed mode. Let me explain that in detail.

### Display PDF Pages Inline like Images and Videos

In Inline Mode, and this is unique to Adobe View SDK, all pages of the embedded PDF document are displayed at once so your site visitors do not have to scroll another document with the parent web page. The PDF controls are hidden from the user and the PDF pages blend with images and other HTML content on your web page.

To learn more, check this [live demo](https://codepen.io/labnol/full/oNXgevg) - here the PDF document contains 7 pages but all are displayed at once like one long web page thus offering smooth navigation.

### How to Embed PDFs with the Adobe View SDK

It does take a few extra steps to use the View SDK. Go to [adobe.io](https://www.adobe.io/apis/documentcloud/dcsdk/gettingstarted.html) and create a new set of credentials for your website. Please note that credentials are valid for one domain only so if you have multiple websites, you'd need a different set of credentials for them.

Next, open the [playground](https://www.adobe.com/go/dcviewsdk_demo) and generate the embed code. You need to replace the `clientId` with your set of credentials. The `url` in the sample code should point to the location of your PDF file.

```html
<div id="adobe-dc-view" style="width: 800px;"></div>
<script src="https://documentcloud.adobe.com/view-sdk/main.js"></script>
<script type="text/javascript">
  document.addEventListener('adobe_dc_view_sdk.ready', function () {
    var adobeDCView = new AdobeDC.View({
      clientId: '<<YOUR_CLIENT_ID>>',
      divId: 'adobe-dc-view',
    });
    adobeDCView.previewFile(
      {
        content: { location: { url: '<<PDF Location>>' } },
        metaData: { fileName: '<<PDF File Name>>' },
      },
      {
        embedMode: 'IN_LINE',
        showDownloadPDF: false,
        showPrintPDF: false,
      }
    );
  });
</script>
```

Check out the [official docs](https://www.adobe.io/apis/documentcloud/dcsdk/docs.html) and the [code repository](https://github.com/adobe/dc-view-sdk-samples) for more samples.
