#!/usr/bin/env node
'use strict';

/* eslint-disable no-console */

/*
 * Dependencies.
 */

var pack = require('./package.json');
var metaphone = require('./');

/*
 * Detect if a value is expected to be piped in.
 */

var expextPipeIn = !process.stdin.isTTY;

/*
 * Arguments.
 */

var argv = process.argv.slice(2);

/*
 * Command.
 */

var command = pack.name;

/**
 * Get the distance for a word.
 *
 * @param {Array.<string>} values - List of words.
 * @return {string}
 */
function phonetics(values) {
    return values.map(metaphone).join(' ');
}

/**
 * Help.
 *
 * @return {string}
 */
function help() {
    return [
        '',
        'Usage: ' + command + ' [options] <words...>',
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
        '$ ' + command + ' considerations detestable',
        '# ' + phonetics(['considerations', 'detestable']),
        '',
        '# output phonetics from stdin',
        '$ echo "hiccups vileness" | ' + command,
        '# ' + phonetics(['hiccups', 'vileness']),
        ''
    ].join('\n  ') + '\n';
}

/**
 * Get the phonetics for zero or more words.
 *
 * @param {Array.<string>} values - List of words.
 */
function getPhonetics(values) {
    if (values.length) {
        console.log(phonetics(values));
    } else {
        process.stderr.write(help());
        process.exit(1);
    }
}

/*
 * Program.
 */

if (
    argv.indexOf('--help') !== -1 ||
    argv.indexOf('-h') !== -1
) {
    console.log(help());
} else if (
    argv.indexOf('--version') !== -1 ||
    argv.indexOf('-v') !== -1
) {
    console.log(pack.version);
} else if (argv.length) {
    getPhonetics(argv.join(' ').split(/\s+/g));
} else if (!expextPipeIn) {
    getPhonetics([]);
} else {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (data) {
        getPhonetics(data.trim().split(/\s+/g));
    });
}
