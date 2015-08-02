'use strict';

/* eslint-env mocha */

var fs = require('fs');
var assert = require('assert');
var wordList = require('word-list');
var metaphone = require('..');

/*
 * Methods.
 */

var readFile = fs.readFileSync;
var equal = assert.equal;

/*
 * Fixtures.
 */

var words = readFile(wordList, 'utf-8').split('\n');
var baseline = readFile('./test/fixtures.txt', 'utf-8').split('\n');

describe('metaphone()', function () {
    it('should work on falseys', function () {
        equal(metaphone(''), '');
        equal(metaphone(false), '');
        equal(metaphone(undefined), '');
        equal(metaphone(null), '');
    });

    it('should ignore white-space', function () {
        equal(metaphone(' f o '), 'F');
    });

    it('should ignore digits', function () {
        equal(metaphone('0f1o2'), 'F');
    });

    it('should work without letters', function () {
        equal(metaphone('0 1 2'), '');
    });

    words.forEach(function (value, index) {
        it('should work on "' + value + '"', function () {
            try {
                equal(metaphone(value), baseline[index]);
            } catch (e) {
                e.message += ' (source: ' + value + ')'
                throw e;
            }
        });
    });
});
