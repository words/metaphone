# metaphone [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

[Metaphone algorithm][source].

## API

Install:

```bash
npm install metaphone
```

Use:

```js
var metaphone = require('metaphone');

metaphone('michael'); //=> 'MXL'
metaphone('crevalle'); //=> 'KRFL'
metaphone('Filipowitz'); //=> 'FLPWTS'
metaphone('Xavier'); //=> 'SFR'
metaphone('delicious'); //=> 'TLSS'
metaphone('acceptingness'); //=> 'AKSPTNKNS'
metaphone('allegrettos'); //=> 'ALKRTS'
```

With [stemmer][]:

```js
var metaphone = require('metaphone');
var stemmer = require('stemmer');

metaphone(stemmer('acceptingness')); //=> 'AKSPTNK'
metaphone(stemmer('allegrettos')); //=> 'ALKRT'
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

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/metaphone.svg

[travis]: https://travis-ci.org/wooorm/metaphone

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/metaphone.svg

[codecov]: https://codecov.io/github/wooorm/metaphone

[license]: LICENSE

[author]: http://wooorm.com

[source]: http://en.wikipedia.org/wiki/metaphone

[stemmer]: https://github.com/wooorm/stemmer
