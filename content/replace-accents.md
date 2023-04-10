---
title: 'How to Replace Accented Characters (diacritics) with English letters in Google Sheets'
date: '2021-07-09T01:10:10.000Z'
slug: '/replace-accented-characters-210709'
category: 'Code'
description: "The Google Sheets function will convert diacritics letters or characters with accents to their simple Latin equivalent. For instance, á or à will change to 'a',  ê or ë will be replaced with e and so on."
tags:
  - 'Google Sheets'
  - 'Google Apps Script'
---

The `REMOVE_ACCENTED` function for Google Sheets will replace all accented characters in the referenced cell, like the letters è, õ, ā, ĝ and so on with their normal Latin equivalents.

To get started, make a copy of the [Google Sheet](https://docs.google.com/spreadsheets/d/1aBuAYwXUKOeMNZJGRLWB9N4lB5Mp_ivbBd029-uycmA/edit#gid=0), go to the Tools menu, choose Script Editor and copy the entire code to your clipboard.

Now open your own Google Sheet and paste the same code inside the Script editor of your sheet. Save and you should be able to use the `REMOVE_ACCENTED` function in your own sheets.

| Input String                       | Output string                      |
| ---------------------------------- | ---------------------------------- |
| A História de Malú e João Miguel   | A Historia de Malu e Joao Miguel   |
| Símbolo de su unidad y permanencia | Simbolo de su unidad y permanencia |
| Tomás Gutiérrez Alea               | Tomas Gutierrez Alea               |
| Miguel Ángel Félix Gallardo        | Miguel Angel Felix Gallardo        |

Internally, this function uses the [deburr](https://lodash.com/docs/4.17.15#deburr) function of the popular `lodash` library that converts Latin-1 Supplement and Latin Extended-A letters to basic Latin letters and also removes any combining diacritical marks.

### Find and Replace Accented Letters in Spreadsheets

```js
const latinRegEx = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
const comboRegEx = `[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]`;

/** Used to map Latin Unicode letters to basic Latin letters. */
const latinUnicodeLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',
  '\xc1': 'A',
  '\xc2': 'A',
  '\xc3': 'A',
  '\xc4': 'A',
  '\xc5': 'A',
  '\xe0': 'a',
  '\xe1': 'a',
  '\xe2': 'a',
  '\xe3': 'a',
  '\xe4': 'a',
  '\xe5': 'a',
  '\xc7': 'C',
  '\xe7': 'c',
  '\xd0': 'D',
  '\xf0': 'd',
  '\xc8': 'E',
  '\xc9': 'E',
  '\xca': 'E',
  '\xcb': 'E',
  '\xe8': 'e',
  '\xe9': 'e',
  '\xea': 'e',
  '\xeb': 'e',
  '\xcc': 'I',
  '\xcd': 'I',
  '\xce': 'I',
  '\xcf': 'I',
  '\xec': 'i',
  '\xed': 'i',
  '\xee': 'i',
  '\xef': 'i',
  '\xd1': 'N',
  '\xf1': 'n',
  '\xd2': 'O',
  '\xd3': 'O',
  '\xd4': 'O',
  '\xd5': 'O',
  '\xd6': 'O',
  '\xd8': 'O',
  '\xf2': 'o',
  '\xf3': 'o',
  '\xf4': 'o',
  '\xf5': 'o',
  '\xf6': 'o',
  '\xf8': 'o',
  '\xd9': 'U',
  '\xda': 'U',
  '\xdb': 'U',
  '\xdc': 'U',
  '\xf9': 'u',
  '\xfa': 'u',
  '\xfb': 'u',
  '\xfc': 'u',
  '\xdd': 'Y',
  '\xfd': 'y',
  '\xff': 'y',
  '\xc6': 'Ae',
  '\xe6': 'ae',
  '\xde': 'Th',
  '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',
  '\u0102': 'A',
  '\u0104': 'A',
  '\u0101': 'a',
  '\u0103': 'a',
  '\u0105': 'a',
  '\u0106': 'C',
  '\u0108': 'C',
  '\u010a': 'C',
  '\u010c': 'C',
  '\u0107': 'c',
  '\u0109': 'c',
  '\u010b': 'c',
  '\u010d': 'c',
  '\u010e': 'D',
  '\u0110': 'D',
  '\u010f': 'd',
  '\u0111': 'd',
  '\u0112': 'E',
  '\u0114': 'E',
  '\u0116': 'E',
  '\u0118': 'E',
  '\u011a': 'E',
  '\u0113': 'e',
  '\u0115': 'e',
  '\u0117': 'e',
  '\u0119': 'e',
  '\u011b': 'e',
  '\u011c': 'G',
  '\u011e': 'G',
  '\u0120': 'G',
  '\u0122': 'G',
  '\u011d': 'g',
  '\u011f': 'g',
  '\u0121': 'g',
  '\u0123': 'g',
  '\u0124': 'H',
  '\u0126': 'H',
  '\u0125': 'h',
  '\u0127': 'h',
  '\u0128': 'I',
  '\u012a': 'I',
  '\u012c': 'I',
  '\u012e': 'I',
  '\u0130': 'I',
  '\u0129': 'i',
  '\u012b': 'i',
  '\u012d': 'i',
  '\u012f': 'i',
  '\u0131': 'i',
  '\u0134': 'J',
  '\u0135': 'j',
  '\u0136': 'K',
  '\u0137': 'k',
  '\u0138': 'k',
  '\u0139': 'L',
  '\u013b': 'L',
  '\u013d': 'L',
  '\u013f': 'L',
  '\u0141': 'L',
  '\u013a': 'l',
  '\u013c': 'l',
  '\u013e': 'l',
  '\u0140': 'l',
  '\u0142': 'l',
  '\u0143': 'N',
  '\u0145': 'N',
  '\u0147': 'N',
  '\u014a': 'N',
  '\u0144': 'n',
  '\u0146': 'n',
  '\u0148': 'n',
  '\u014b': 'n',
  '\u014c': 'O',
  '\u014e': 'O',
  '\u0150': 'O',
  '\u014d': 'o',
  '\u014f': 'o',
  '\u0151': 'o',
  '\u0154': 'R',
  '\u0156': 'R',
  '\u0158': 'R',
  '\u0155': 'r',
  '\u0157': 'r',
  '\u0159': 'r',
  '\u015a': 'S',
  '\u015c': 'S',
  '\u015e': 'S',
  '\u0160': 'S',
  '\u015b': 's',
  '\u015d': 's',
  '\u015f': 's',
  '\u0161': 's',
  '\u0162': 'T',
  '\u0164': 'T',
  '\u0166': 'T',
  '\u0163': 't',
  '\u0165': 't',
  '\u0167': 't',
  '\u0168': 'U',
  '\u016a': 'U',
  '\u016c': 'U',
  '\u016e': 'U',
  '\u0170': 'U',
  '\u0172': 'U',
  '\u0169': 'u',
  '\u016b': 'u',
  '\u016d': 'u',
  '\u016f': 'u',
  '\u0171': 'u',
  '\u0173': 'u',
  '\u0174': 'W',
  '\u0175': 'w',
  '\u0176': 'Y',
  '\u0177': 'y',
  '\u0178': 'Y',
  '\u0179': 'Z',
  '\u017b': 'Z',
  '\u017d': 'Z',
  '\u017a': 'z',
  '\u017c': 'z',
  '\u017e': 'z',
  '\u0132': 'IJ',
  '\u0133': 'ij',
  '\u0152': 'Oe',
  '\u0153': 'oe',
  '\u0149': "'n",
  '\u017f': 's',
};

const basePropertyOf = (object) => (key) => object[key];
const characterMap = basePropertyOf(latinUnicodeLetters);

/**
 * Replace accented characters in Google Sheets with English letters.
 *
 * @param {string} input The input string with accented characters.
 * @return The input without accented characters.
 * @customfunction
 */
function REPLACE_ACCENTED(input) {
  if (input && typeof input === 'string') {
    return input.replace(latinRegEx, characterMap).replace(comboRegEx, '');
  }
  return input;
}
```
