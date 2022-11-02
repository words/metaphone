#!/usr/bin/env node
import fs from 'node:fs'
import process from 'node:process'
import {URL} from 'node:url'
import {metaphone} from './index.js'

/** @type {Record<string, unknown>} */
const pack = JSON.parse(
  String(fs.readFileSync(new URL('package.json', import.meta.url)))
)

const argv = process.argv.slice(2)

if (argv.includes('--help') || argv.includes('-h')) {
  console.log(help())
} else if (argv.includes('--version') || argv.includes('-v')) {
  console.log(pack.version)
} else if (argv.length === 0) {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', function (data) {
    console.log(phonetics(String(data)))
  })
} else {
  console.log(phonetics(argv.join(' ')))
}

/**
 * @param {string} values
 */
function phonetics(values) {
  return values
    .split(/\s+/g)
    .map((d) => metaphone(d))
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
