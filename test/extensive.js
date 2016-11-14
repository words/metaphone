'use strict';

/* eslint-env mocha */

var fs = require('fs');
var assert = require('assert');
var wordList = require('word-list');
var metaphone = require('..');

var readFile = fs.readFileSync;
var equal = assert.equal;

var words = readFile(wordList, 'utf-8').split('\n');
var baseline = readFile('./test/fixtures.txt', 'utf-8').split('\n');

describe('metaphone()', function () {
  words.forEach(function (value, index) {
    it('should work on "' + value + '"', function () {
      try {
        equal(metaphone(value), baseline[index]);
      } catch (err) {
        err.message += ' (source: ' + value + ')';
        throw err;
      }
    });
  });
});
