'use strict'

/* eslint-env browser */

var metaphone = require('metaphone')

var $input = document.querySelector('input')
var $output = document.querySelector('output')

$input.addEventListener('input', oninputchange)

oninputchange()

function oninputchange() {
  $output.textContent = metaphone($input.value)
}
