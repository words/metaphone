# metaphone [![Build Status](https://travis-ci.org/wooorm/metaphone.svg?branch=master)](https://travis-ci.org/wooorm/metaphone) [![Coverage Status](https://img.shields.io/coveralls/wooorm/metaphone.svg)](https://coveralls.io/r/wooorm/metaphone?branch=master)

The [original metaphone](http://en.wikipedia.org/wiki/Metaphone) algorithm in JavaScript.

For even better results, combine it with a stemmer (e.g., my own porter stemmer [implementation](https://github.com/wooorm/stemmer)).

## Installation

NPM:
```sh
$ npm install metaphone
```

Component.js:
```sh
$ component install wooorm/metaphone
```

## Usage

```js
var metaphone = require('metaphone');

metaphone("hiccups"); // "HKKPS"
metaphone("detestable"); // "TTSTBL"
metaphone("vileness"); // "FLNS"
metaphone("detestable") === metaphone("tetestble"); // true
```

With [stemmer](https://github.com/wooorm/stemmer):
```js
var metaphone = require('metaphone'),
    stemmer = require('stemmer');

metaphone(stemmer("hiccups")); // HKKP
metaphone(stemmer("detestable")); // TTST
metaphone(stemmer("vileness")); // FL

metaphone(stemmer("detestable")) === metaphone(stemmer("tetest")); // true
```

## License

  MIT
