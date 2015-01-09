#!/usr/bin/env node
'use strict';

/*
 * Dependencies.
 */

var metaphone,
    pack;

metaphone = require('./');
pack = require('./package.json');

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
 * Help.
 */
function help() {
    console.log([
        '',
        'Usage: ' + command + ' [options] string',
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
        '# output phonetics of given value',
        '$ ' + command + ' detestable',
        '# TTSTBL',
        '',
        '# output phonetics from stdin',
        '$ echo "vileness" | ' + command,
        '# FLNS'
    ].join('\n  ') + '\n');
}

/*
 * Program.
 */

if (
    argv.indexOf('--help') !== -1 ||
    argv.indexOf('-h') !== -1
) {
    help();
} else if (
    argv.indexOf('--version') !== -1 ||
    argv.indexOf('-v') !== -1
) {
    console.log(pack.version);
} else if (argv.length === 1) {
    console.log(metaphone(argv[0]));
} else if (argv.length) {
    help();
} else {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (data) {
        console.log(metaphone(data.trim()));
    });
}
