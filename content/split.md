---
title: 'How to Split a PDF file into Separate PDF Documents'
date: '2022-04-06'
slug: '/split-pdf-file-220406'
category: 'Code'
description: 'Learn how to split any PDF file into multiple PDF files from the command line without requiring Adobe Acrobat or any expensive PDF manipulation library'
tags:
  - 'PDF'
  - 'Javascript'
---

This tutorial describes how to extract pages from a PDF document from the command line. There are online tools available for splitting PDFs but if you prefer not to share your PDF files with a third-party, you can split them into separate pages easily from the command line.

## Split PDF Files

Assuming that you have `node` installed on your computer, run the following command in the terminal to initialize the environment:

```bash
$ mkdir pdf-split
$ cd pdf-split
$ npm init -y
```

Next, we'll install the popular `pdf-lib` package from the npm registry. PDF library is written in TypeScript and it is a very tool for creating and manipulating PDF files. You can learn more about PDF library at [js.org](https://pdf-lib.js.org/).

> In addition to splitting PDF files, the PDF library can also be used for merging multiple PDF files into a single PDF file. Or for rearranging the pages of a PDF file.

```bash
$ npm install --save pdf-lib
```

Next, we'll write a simple Node.js script that splits a PDF file into multiple PDF files. You need to provide the path of the input PDF file and the output folder.

```js
// split.pdf.js
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const splitPDF = async (pdfFilePath, outputDirectory) => {
  const data = await fs.promises.readFile(pdfFilePath);
  const readPdf = await PDFDocument.load(data);
  const { length } = readPdf.getPages();

  for (let i = 0, n = length; i < n; i += 1) {
    const writePdf = await PDFDocument.create();
    const [page] = await writePdf.copyPages(readPdf, [i]);
    writePdf.addPage(page);
    const bytes = await writePdf.save();
    const outputPath = path.join(outputDirectory, `Invoice_Page_${i + 1}.pdf`);
    await fs.promises.writeFile(outputPath, bytes);
    console.log(`Added ${outputPath}`);
  }
};

splitPDF('input/invoices.pdf', 'invoices').then(() =>
  console.log('All invoices have been split!').catch(console.error)
);
```

In the above example, we have a large PDF file that contains multiple invoices generated from the Tally accounting system. We want to split the PDF file into multiple PDF files such that each invoice is a separate PDF file.

You can run the above script in the terminal to split the PDF file.

```bash
$ node split.pdf.js
```

## Compress Large PDF files

The one downside of this approach is that the generated PDF files are large in size. You can however use the `ghostscript` command line utility to highly compress the size of split PDF files.

```bash
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.2 -r200 -dPDFSETTINGS=/screen -dEmbedAllFonts=true -dSubsetFonts=true -dPrinted=false -dNOPAUSE -dQUIET -dBATCH -sOutputFile=c12_{filename} {filename}
```

Also see: [Useful FFMPEG Commands](/internet/useful-ffmpeg-commands/28490/)
