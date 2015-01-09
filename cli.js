#!/usr/bin/env node
'use strict';

/*
 * Dependencies.
 */

var metaphone,
    pack;

pack = require('./package.json');
metaphone = require('./');

/*
 * Detect if a value is expected to be piped in.
 */

var expextPipeIn;

expextPipeIn = !process.stdin.isTTY;

/*
 * Arguments.
 */

var argv;

argv = process.argv.slice(2);

/*
 * Command.
 */

var command;

command = Object.keys(pack.bin)[0];

/**
 * Get the distance for a word.
 *
 * @param {Array.<string>} values
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
 * Get the edit distance for a list containing one word.
 *
 * @param {Array.<string>} values
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
