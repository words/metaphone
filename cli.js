#!/usr/bin/env node
'use strict'

var pack = require('./package.json')
var metaphone = require('.')

var argv = process.argv.slice(2)

if (argv.indexOf('--help') !== -1 || argv.indexOf('-h') !== -1) {
  console.log(help())
} else if (argv.indexOf('--version') !== -1 || argv.indexOf('-v') !== -1) {
  console.log(pack.version)
} else if (argv.length === 0) {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', function(data) {
    console.log(phonetics(data))
  })
} else {
  console.log(phonetics(argv.join(' ')))
}

function phonetics(values) {
  return values
    .split(/\s+/g)
    .map(metaphone)
    .join(' ')
}

function help() {
  return (
    [
      '',
      'Usage: ' + pack.name + ' [options] <words...>',
      '',
      pack.description,
      '',
      'Options:',
      '',
      '  -h, --help           output usage information',
      '  -v, --version        output version number',
      '',
      'Usage:',
      '',
      '# output phonetics',
      '$ ' + pack.name + ' considerations detestable',
      '# ' + phonetics('considerations detestable'),
      '',
      '# output phonetics from stdin',
      "$ echo 'hiccups vileness' | " + pack.name,
      '# ' + phonetics('hiccups vileness'),
      '',
      '# with stemmer',
      "$ echo 'vileness' | stemmer | " + pack.name,
      '# ' + phonetics('vile')
    ].join('\n  ') + '\n'
  )
}
