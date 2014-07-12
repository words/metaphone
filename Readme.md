# metaphone [![Build Status](https://travis-ci.org/wooorm/metaphone.svg?branch=master)](https://travis-ci.org/wooorm/metaphone) [![Coverage Status](https://img.shields.io/coveralls/wooorm/metaphone.svg)](https://coveralls.io/r/wooorm/metaphone?branch=master)

[![browser support](https://ci.testling.com/wooorm/metaphone.png) ](https://ci.testling.com/wooorm/metaphone)

---

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

## Other Metaphone implementations

- [NaturalNode/natural](https://github.com/NaturalNode/natural) — Currently (14/07/12) contains a small [bug](https://github.com/NaturalNode/natural/issues/169).
- [Katee/metaphone](https://github.com/Katee/metaphone) — Not a node package.
- [Yomguithereal/clj-fuzzy](https://github.com/Yomguithereal/clj-fuzzy) — Clojure, bit slow.

## Benchmark

Run the benchmark yourself:

```sh
$ npm run install-benchmark # Just once of course.
$ npm run benchmark
```

On a MacBook Air, it runs about 134,000 op/s, which is a bit faster than natural.

```
           metaphone — this module
  134 op/s » op/s * 1,000

           natural — more options
  116 op/s » op/s * 1,000

           Katee/metafone — pretty buggy
   53 op/s » op/s * 1,000

           clj-fuzzy — pretty buggy
    7 op/s » op/s * 1,000
```

## License

  MIT
