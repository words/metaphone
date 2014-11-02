# metaphone [![Build Status](https://img.shields.io/travis/wooorm/metaphone.svg?style=flat)](https://travis-ci.org/wooorm/metaphone) [![Coverage Status](https://img.shields.io/coveralls/wooorm/metaphone.svg?style=flat)](https://coveralls.io/r/wooorm/metaphone?branch=master)

A fast implementation of the [original metaphone](http://en.wikipedia.org/wiki/Metaphone) algorithm.

For even better results, combine it with a stemmer (e.g., my own porter stemmer [implementation](https://github.com/wooorm/stemmer)).

## Installation

npm:
```sh
$ npm install metaphone
```

Component:
```sh
$ component install wooorm/metaphone
```

Bower:
```sh
$ bower install metaphone
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

## Other Metaphone implementations

- [NaturalNode/natural](https://github.com/NaturalNode/natural);
- [Katee/metaphone](https://github.com/Katee/metaphone) — Not a node package.

## Benchmark

On a MacBook Air, it runs about 136,000 op/s, which is a bit faster than natural.

```
           metaphone — this module
  136 op/s » op/s * 1,000

           natural — more options
  113 op/s » op/s * 1,000

           Katee/metafone — pretty buggy
   45 op/s » op/s * 1,000
```

## License

MIT © Titus Wormer
