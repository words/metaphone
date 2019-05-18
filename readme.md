# metaphone

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[Metaphone algorithm][source].

## Install

[npm][]:

```sh
npm install metaphone
```

## API

```js
var metaphone = require('metaphone')

metaphone('michael') // => 'MXL'
metaphone('crevalle') // => 'KRFL'
metaphone('Filipowitz') // => 'FLPWTS'
metaphone('Xavier') // => 'SFR'
metaphone('delicious') // => 'TLSS'
metaphone('acceptingness') // => 'AKSPTNKNS'
metaphone('allegrettos') // => 'ALKRTS'
```

With [stemmer][]:

```js
var metaphone = require('metaphone')
var stemmer = require('stemmer')

metaphone(stemmer('acceptingness')) // => 'AKSPTNK'
metaphone(stemmer('allegrettos')) // => 'ALKRT'
```

## CLI

```txt
Usage: metaphone [options] <words...>

Metaphone implementation

Options:

  -h, --help           output usage information
  -v, --version        output version number

Usage:

# output phonetics
$ metaphone considerations detestable
# KNSTRXNS TTSTBL

# output phonetics from stdin
$ echo 'hiccups vileness' | metaphone
# HKKPS FLNS

# with stemmer
$ echo 'vileness' | stemmer | metaphone
# FL
```

## Related

*   [`double-metaphone`](https://github.com/words/double-metaphone)
    — Double Metaphone implementation
*   [`soundex-code`](https://github.com/words/soundex-code)
    — Fast Soundex implementation
*   [`stemmer`](https://github.com/words/stemmer)
    — Porter Stemmer algorithm
*   [`dice-coefficient`](https://github.com/words/dice-coefficient)
    — Sørensen–Dice coefficient
*   [`levenshtein-edit-distance`](https://github.com/words/levenshtein-edit-distance)
    — Levenshtein edit distance
*   [`syllable`](https://github.com/words/syllable)
    — Syllable count in an English word

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/words/metaphone.svg

[build]: https://travis-ci.org/words/metaphone

[coverage-badge]: https://img.shields.io/codecov/c/github/words/metaphone.svg

[coverage]: https://codecov.io/github/words/metaphone

[downloads-badge]: https://img.shields.io/npm/dm/metaphone.svg

[downloads]: https://www.npmjs.com/package/metaphone

[size-badge]: https://img.shields.io/bundlephobia/minzip/metaphone.svg

[size]: https://bundlephobia.com/result?p=metaphone

[npm]: https://www.npmjs.com

[license]: license

[author]: https://wooorm.com

[source]: https://en.wikipedia.org/wiki/metaphone

[stemmer]: https://github.com/words/stemmer
