---
title: 'How to Download Speaker Notes in Google Slides'
date: '2020-06-10'
slug: '/code/download-speaker-notes-google-slides-200710'
category: 'Code'
tags:
  - 'Google Apps Script'
  - 'Google Slides'
  - 'Archives'
---

With [Creator Studio](https://gsuite.google.com/marketplace/app/creator_studio/509621243108), you can easily convert your Google Slides presentation into animated GIFs and [video slideshows](/internet/save-google-slides-video/32168/). The add-on can also extract speaker notes from your slides and export them as a text file in Google Drive.

To get started, open your deck in Google Slides, go to the Addons menu and choose Creator Studio. Next, select the Speaker Notes menu and you'll see just the speaker notes of all slides in a popup window that you can download and print.

### How are Speaker Notes Generated

Internally, the app uses Google Apps Script to export Speaker Notes from your Google presentation and writes them to a text file inside Google Drive.

```javascript
const downloadSpeakerNotes = () => {
  // Get the current Google Slide
  const presentation = SlidesApp.getActivePresentation();

  // Find all the slides in the current presentation
  const slides = presentation.getSlides();

  // Iterate through each slide and extract the notes
  const notes = slides
    .map((slide, index) => {
      const note = slide.getNotesPage().getSpeakerNotesShape().getText().asString();
      return { index, note };
    })
    // Filter slides that have no speaker notes
    .filter(({ note }) => note)
    .map(({ note, index }) => {
      return [`Slide #${index + 1}`, '---', note].join('\n');
    })
    .join('\n');

  // Create a file in Google Drive for storing notes
  const file = DriveApp.createFile('Speaker Notes', notes);

  // Print the file download URL in the Logger window
  Logger.log(file.getDownloadUrl());
};
```

### Export Speaker Notes PDF in Google Slides

Google Slides has a built-in option for exporting your slides as a PDF file and this can be configured to also include the speaker notes.

Open your deck in Google Slides, go to the File menu and choose Print Settings and Preview. Here choose the "1 slide with note" option and click the "Download PDF" button to export your speaker notes as PDF.

It just works but the only downside with this approach is that it generates a bloated PDF that isn't perfect for printing. Also, the slides are always includd with the speakers notes in the PDF, there's currently no option to save the speaker notes only.
