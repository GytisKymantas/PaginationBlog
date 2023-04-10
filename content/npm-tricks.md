---
title: 'Useful NPM Tips and Tricks for Developers to Boost Productivity'
date: '2023-03-31'
slug: '/npm-command-tricks-210824'
category: 'Internet'
description: 'This is a collection of useful npm tips and tricks that every developer should know. Learn how to automate tasks, check for vulnerabilities, manage dependencies, and more, to increase your productivity and efficiency.'
tags:
  - 'Archives'
  - 'Javascript'
  - 'Code'
---

NPM, short for Node Package Manager, is a widely-used tool for managing JavaScript packages in a project. It allows developers to install and update packages, as well as manage dependencies and scripts. NPM comes bundled with Node.js, so if you have Node installed on your machine, you automatically have access to NPM as well.

## npm Commands You Should Know

This is not a tutorial for learning npm, the [official docs](https://docs.npmjs.com/about-npm) are a good place to get started, but a collection of tips and tricks that will help you do more with the `npm` utility. Whether you're a seasoned developer or just starting out, these tips can help you be more efficient and productive in your work with npm.

### Instantly run packages without installing

The NPM registry is a treasure trove for finding packages that do useful stuff and they aren't just for [programmers](/internet/useful-tools-for-programmers/29227/).

For instance, the `speed-test` package shows the speed of your internet connection. The `emoj` package helps you search for emojis from the terminal. And the `wifi-passwords` package can help you [find the password](/software/find-wi-fi-network-password/28949/) of your current WiFi network.

You can run these utility packages directly from the command line using the [npx](https://www.npmjs.com/package/npx) command.

```shell
npx speed-test
npx emoj unicorn
npx public-ip-cli
npx wifi-password-cli
```

### Get package details

Use the `npm view` command to get details of any npm package, including the repository URL, the dependencies and the date when the package was last updated.

```shell
npm view eslint
```

### Install npm packages faster

You've probably used `npm install` to install packages, and dependencies, in the local `node_modules` folder of a project. Replace this command with [npm-ci](https://docs.npmjs.com/cli/v7/commands/npm-ci) and you'll be able to install packages significantly faster.

```shell
npm ci
```

If a node_modules folder is already present, it will be automatically removed before `npm ci` begins to install packages.

### Recover space

If you have been working with npm packages for some time, the various `node_modules` folders on the disks could be consuming several gigabytes of space. The very useful [npkill](https://github.com/voidcosmos/npkill) finds all node_modules folders on your system and lets you delete them interactively.

```shell
npx npkill
```

### Quickly download a Git repository

Most developers use the `git clone` command to download a Git repository. However, this also downloads the entire git history making the process slower. The [degit](https://www.npmjs.com/package/degit) package can download the latest commit to the master branch locally and you need not specify the full Github URL.

```shell
npx degit username/repo
npx degit labnol/apps-script-starter
```

### List installed packages

Generate a list of all npm packages that are installed on the system with global scope. Remove the `-g` flag to list only packages installed in the current project directory.

```shell
npm ls --depth=0
npm ls -g
```

### Find unused dependencies

The [depcheck](https://github.com/depcheck/depcheck) command will list all the npm packages that are not used in the project based on the dependencies in `package.json`.

```shell
npx depcheck
```

Use the command `npm uninstall <package-name>` to uninstall any unused package.

### Find unused source files

The [unimported](https://github.com/smeijer/unimported) package will find all the unused files and dependencies in your JavaScript / TypeScript projects.

```shell
npx unimported
```

### Find outdated dependencies

Get a list of all outdated packages in your current project. This command checks every single module listed in the `package.json` file and compares it with the latest version available in the NPM registry.

Add the `-g` flag to get all outdated packages that are installed globally on the system.

```shell
npm outdated
npm outdated -g
```

### Update the package versions

The `npm outdated` command will list all packages in your current project that are outdated and a newer version is available. Add the `-g` flag to list outdated packages that are installed in the global scope.

The [ncu](https://github.com/raineorshine/npm-check-updates) command will update the `package.json` file with the latest version of the packages listed in the `dependencies` and `devDependencies` sections.

Or use the `npm-check -u` command to update packages to their latest version in interactive mode.

```shell
npm outdated
npm outdated -g
npm-check
npm-check -u
ncu -u
```

### Remove extra packages

Use the [prune](https://docs.npmjs.com/cli/v7/commands/npm-prune) command to remove all packages that are installed locally but not listed in the `package.json` file. If the --dry-run flag is used then no changes will be made.

```shell
npm prune
```

Alternatively, you can remove the `node_modules` folder and run `npm ci` again.

### Find vulnerable packages

Run the `audit` command to check for vulnerabilities in the packages listed in the `dependencies` and `devDependencies` sections. Add the `fix` flag to automatically apply the fixes, if any.

```shell
npm audit
npm audit fix
```

## Useful NPM Package Websites

- [bundlephobia.com](https://bundlephobia.com/) - Upload your `package.json` file and get an idea of how much it would cost (size-wise) to install the dependencies.
- [diff.intrinsic.com](https://diff.intrinsic.com/) - Compare any two versions of a npm package and know which files have changed in the update.
- [npmtrends.com](https://www.npmtrends.com/) - Compare the relative popularity of packages across the npm registry based on the number of downloads.
