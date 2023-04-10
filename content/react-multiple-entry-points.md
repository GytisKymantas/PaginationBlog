---
title: 'Create React App with Multiple Entry Points'
date: '2021-05-12'
slug: '/code/react-multiple-entry-points-210512'
description: 'How to build a multi-page React application with multiple entry points using Create React App without ejecting.'
category: 'Code'
tags:
  - 'Javascript'
---

The Create React App frameworks lets you easily build single page applications but it doesn't support multiple entry points. To give you an example, if a website outputs separate home pages for mobile and desktop clients, the pages could be sharing some common React components between them, and it may thus not be practical to build two completely separate React applications.

Also see: [Bundle React App with Gulp](/code/bundle-react-app-single-file-200514)

CRA doesn't support multiple entry points but there are couple of ways to solve this problem.

**Option 1** Eject from the Create React App using the `npm run eject` command and update the entry inside `webpack.config.js` file to include multiple entry points.

**Option 2** Use an alternate build tool like [Vite.js](https://vitejs.dev/guide/build.html#multi-page-app) that includes support for multiple entry points out of the box.

**Option 3** Use the [rewired app](https://github.com/timarney/react-app-rewired#how-to-rewire-your-create-react-app-project) - it lets you easily make changes and small tweaks to the default Webpack configuration without ejecting the app.

**Option 4** Use `REACT_APP` environment variables to specify the target component and then use ES5 dynamic imports to load the corresponding app component as shown in [this example](https://github.com/lamassu/lamassu-server/blob/77c75b9c876d1a707b8bdd4a315c059f1bc76fcb/new-lamassu-admin/src/index.js).

### Multiple Entry Points for Create React App

If you intend to use the Create React App configuration without ejecting it, here's a simple workaround that will help you define multiple entry points and the output will be bundle in separate folders.

Inside the `src` folder, create two components.

```js
// ./src/Desktop.js
import React from 'react';

const Desktop = () => {
  return <h1>For Desktop</h1>;
};

export default Desktop;
```

```js
// ./src/Mobile.js
import React from 'react';

const Mobile = () => {
  return <h1>For Mobile</h1>;
};

export default Mobile;
```

The default entry file `index.js` looks something like this:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

Next, edit your package.json file and add commands, one per build target.

```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "build:mobile": "cp src/Mobile.js src/App.js && npm run build && mv build build-mobile",
    "build:desktop": "cp src/Desktop.js src/App.js && npm run build && mv build build-desktop"
  }
```

Run `npm run build:mobile` when the build target is mobile or `npm run build:desktop` for the desktop entry point.
