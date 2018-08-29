# metaphone [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

[Metaphone algorithm][source].

## API

Install:

```bash
npm install metaphone
```

Use:

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

Install:

```sh
npm install -g metaphone
```

Use:

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

[travis-badge]: https://img.shields.io/travis/words/metaphone.svg

[travis]: https://travis-ci.org/words/metaphone

[codecov-badge]: https://img.shields.io/codecov/c/github/words/metaphone.svg

[codecov]: https://codecov.io/github/words/metaphone

[license]: license

[author]: http://wooorm.com

[source]: http://en.wikipedia.org/wiki/metaphone

[stemmer]: https://github.com/words/stemmer
