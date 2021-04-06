/* eslint-env browser */

import {metaphone} from 'metaphone'

var $input = document.querySelector('input')
var $output = document.querySelector('output')

$input.addEventListener('input', oninputchange)

oninputchange()

function oninputchange() {
  $output.textContent = metaphone($input.value)
}
