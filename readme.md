# metaphone

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[Metaphone algorithm][source].

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install metaphone
```

## API

This package exports the following identifiers: `metaphone`.
There is no default export.

```js
import {metaphone} from 'metaphone'

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

[build-badge]: https://github.com/words/metaphone/workflows/main/badge.svg

[build]: https://github.com/words/metaphone/actions

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
