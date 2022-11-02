# metaphone

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[Metaphone][wiki] phonetic algorithm.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`metaphone(value)`](#metaphonevalue)
*   [CLI](#cli)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Related](#related)
*   [Contribute](#contribute)
*   [Security](#security)
*   [License](#license)

## What is this?

This package exposes a phonetic algorithm.
That means it gets a certain string (typically an English word), and turns it
into a code, which can then be compared to other codes (of other words), to
check if they are (likely) pronounced the same.

## When should I use this?

You’re probably dealing with natural language, and know you need this, if
you’re here!

Depending on your needs, [`double-metaphone`][double-metaphone] might be better.

Depending on your goals, you likely want to additionally use a stemmer (such as
[`stemmer`][stemmer]).

## Install

This package is [ESM only][esm].
In Node.js (version 14.14+, 16.0+), install with [npm][]:

```sh
npm install metaphone
```

In Deno with [`esm.sh`][esmsh]:

```js
import {metaphone} from 'https://esm.sh/metaphone@2'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {metaphone} from 'https://esm.sh/metaphone@2?bundle'
</script>
```

## Use

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

With [`stemmer`][stemmer]:

```js
import {metaphone} from 'metaphone'
import {stemmer} from 'stemmer'

metaphone(stemmer('acceptingness')) // => 'AKSPTNK'
metaphone(stemmer('allegrettos')) // => 'ALKRT'
```

## API

This package exports the identifier `metaphone`.
There is no default export.

### `metaphone(value)`

Get the metaphone code from a given value.

###### `value`

Value to use (`string`, required).

##### Returns

Metaphone code for `value` (`string`).

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

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

This package is at least compatible with all maintained versions of Node.js.
As of now, that is Node.js 14.14+ and 16.0+.
It also works in Deno and modern browsers.

## Related

*   [`double-metaphone`][double-metaphone]
    — double metaphone algorithm
*   [`soundex-code`](https://github.com/words/soundex-code)
    — soundex algorithm
*   [`stemmer`](https://github.com/words/stemmer)
    — porter stemmer algorithm
*   [`dice-coefficient`](https://github.com/words/dice-coefficient)
    — sørensen–dice coefficient
*   [`levenshtein-edit-distance`](https://github.com/words/levenshtein-edit-distance)
    — levenshtein edit distance
*   [`syllable`](https://github.com/words/syllable)
    — syllable count of English words

## Contribute

Yes please!
See [How to Contribute to Open Source][contribute].

## Security

This package is safe.

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

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[contribute]: https://opensource.guide/how-to-contribute/

[license]: license

[author]: https://wooorm.com

[wiki]: https://en.wikipedia.org/wiki/Metaphone

[stemmer]: https://github.com/words/stemmer

[double-metaphone]: https://github.com/words/double-metaphone
