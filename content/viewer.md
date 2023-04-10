---
title: 'View Microsoft Office Files in the Browser without Downloading'
date: '2022-02-18T21:45:44.000Z'
slug: '/internet/google-docs-viewer-alternative/26591/'
category: 'Internet'
description: "Office Web Apps Viewer and Google Drive Viewer can come handy when you don't have any Office suite installed on your computer or when you would like to quickly preview any online Office file in the browser without having to download it locally."
tags:
  - 'Archives'
  - 'Embed'
  - 'Google Docs'
  - 'Microsoft Office'
---

You can use the `filetype:` operator in Google to search for Office files of specific types. For instance, a query like ` invoice template filetype:xls` will find public Excel spreadsheets that match the search query. Similarly, you can find Word documents and PowerPoint presentations on the Internet by appending `filetype:doc` or `filetype:ppt` to the search query.

How do you view a file that you found on the Internet in the browser itself?

All modern browsers have built-in support for PDF files so you can view them directly in the browser without downloading the file to your computer. However, if you are working with Office files, you can use [simple URL hacks](/internet/direct-links-for-google-drive/28356/) to view the file inside Google Docs or Microsoft Office Viewer.

## View Office Files in Browser

We've two sample files, an Excel spreadsheet and a Word file, hosted on the Internet. The file URLs are provided below and the requirement is to view these files directly in the browser.

```
https://www.labnol.org/files/word.docx [Word document]
https://www.labnol.org/files/excel.xlsx [Excel spreadsheet]
```

### Google Drive Viewer

Google Drive includes a built-in viewer feature that allows you to view Office files directly in the browser without downloading them. The files are streamed from the hosting website and not uploaded to your Google Drive either.

To view the file, replace `FILE_URL` with the link of the file you want to view ([see example](https://drive.google.com/viewer?url=https://www.labnol.org/files/word.docx))

```
https://drive.google.com/viewer?url=FILE_URL
```

If you would like to embed an Office file in your website with the Google Drive viewer, the HTMl would be as below.
You would need to replace the actual URL of the document and may also adjust the height and width attributes of the IFRAME tag.

```html
<iframe
  src="https://drive.google.com/viewer?embedded=true&hl=en-US&url=FILE_URL"
  width="500px"
  height="350px"
  frameborder="0"
></iframe>
```

### Microsoft Office Viewer

Similar to Google Drive Viewer, Microsoft Office also offers a online document viewer to help you to view Word documents, Excel Spreadsheets and PowerPoint decks directly in the browser without downloading them.

Simply replace `FILE_URL` with the URL of the Office file. ([see example](https://view.officeapps.live.com/op/view.aspx?src=https://www.labnol.org/files/excel.xlsx))

```
https://view.officeapps.live.com/op/view.aspx?src=FILE_URL
```

In addition to previewing Office files, the Office Web Apps Viewer tool can also be used for embedding Microsoft Office documents into your website or blog. The embed code would be something like this:

```html
<iframe
  src="https://view.officeapps.live.com/op/embed.aspx?src=FILE_URL"
  width="500px"
  height="350px"
  frameborder="0"
></iframe>
```

While Office Web Apps viewer is definitely a better option that Google Docs Viewer, a limitation is that it only works with Office Files, Google Drive Viewer can also handle PDFs, [Photoshop files](/internet/photoshop-and-google-docs/18730/) and even AutoCAD drawings.
