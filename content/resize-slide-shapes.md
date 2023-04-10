---
title: 'Make all Shapes the Same Size in Google Slides'
date: '2021-10-10'
slug: '/code/resize-google-slide-shapes-201010'
category: 'Code'
description: 'Make all shapes in Google Slides the same size as the height and width of the first shape.'
tags:
  - 'Google Apps Script'
  - 'Google Slides'
---

Microsoft PowerPoint has this really useful feature that lets you to easily resize multiple shapes in a slide to the same size. You can select the shapes you want to resize and then click on the **Format Pane** button. Here, under the Size and Position tab, you can resize the shapes to the required size.

Google Slides doesn't allow you to resize multiple shapes in a slide but you can use Google Apps Script to do the same thing. Go to the Tools menu and select **Script Editor**. Here copy-paste the code below and click on the **Run** button.

It will match the height and width of the first shape in the slide and resize all the shapes in the slide to the same height and width. The shapes are also reposition such that there's equal distance between the shapes and the top edge of the shapes are in alignment.

```js
const resizeSlideShapes = () => {
  const SPACING = 20;
  const [slide] = SlidesApp.getActivePresentation().getSlides();
  const [baseShape, ...targetShapes] = slide.getShapes();

  // Is the shape rectangular or triangular
  const shapeType = baseShape.getShapeType();

  // Get the shape height and width
  const height = baseShape.getHeight();
  const width = baseShape.getWidth();

  // Get the co-ordinates of the base shape
  const topPosition = baseShape.getTop();
  const leftPosition = baseShape.getLeft();

  targetShapes
    .filter((shape) => shape.getShapeType() === shapeType)
    .forEach((shape, index) => {
      shape.setHeight(height);
      shape.setWidth(width);
      shape.setTop(topPosition);
      shape.setLeft(leftPosition + (width + SPACING) * (index + 1));
    });
};
```

The Google Script can handle both **Rectangle** and **Triangle** shapes. Please note that the first shape in the slide is the base shape and will determine the height and width of the other shapes in the same slide.

### Match Rectangle Shapes

### Match Triangle Shapes

You can use the same technique to recolor shapes and make all shapes the same color. You can play around with the shapes template [here](https://docs.google.com/presentation/d/1_UlIWlDJybWtheHYes3wIdJF2XAyohA-1pBZxiWPEpQ/edit#slide=id.p).
