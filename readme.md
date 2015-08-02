# metaphone [![Build Status](https://img.shields.io/travis/wooorm/metaphone.svg)](https://travis-ci.org/wooorm/metaphone) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/metaphone.svg)](https://codecov.io/github/wooorm/metaphone)

[**Metaphone**](http://en.wikipedia.org/wiki/metaphone) algorithm in
JavaScript. No cruft. Real fast.

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install metaphone
```

**metaphone** is also available for [bower](http://bower.io/#install-packages),
[component](https://github.com/componentjs/component), and
[duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and globals
module, [uncompressed](metaphone.js) and
[compressed](metaphone.min.js).

## Usage

```js
var metaphone = require('metaphone');

console.log(metaphone('hiccups')); // 'HKKPS'
console.log(metaphone('detestable')); // 'TTSTBL'
console.log(metaphone('vileness')); // 'FLNS'
console.log(metaphone('detestable') === metaphone('tetestble')); // true
```

```js
var metaphone = require('metaphone');
var stemmer = require('stemmer');

console.log(metaphone(stemmer('hiccups'))); // HKKP
console.log(metaphone(stemmer('detestable'))); // TTST
console.log(metaphone(stemmer('vileness'))); // FL

console.log(metaphone(stemmer('detestable')) === metaphone(stemmer('tetest'))); // true
```

## CLI

Install:

```bash
npm install --global metaphone
```

Use:

```text
Usage: metaphone [options] <words...>

Fast Metaphone implementation

Options:

  -h, --help           output usage information
  -v, --version        output version number

Usage:

# output phonetics
$ metaphone considerations detestable
# KNSTRXNS TTSTBL

# output phonetics from stdin
$ echo "hiccups vileness" | metaphone
# HKKPS FLNS
```

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
