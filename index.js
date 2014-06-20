'use strict';

var EXPRESSION_DUPLICATE_ADJACENT_LETTERS = /([^c])\1/g,
    EXPRESSION_INITIALS = /^(kn|gn|pn|ae|wr)/g,
    EXPRESSION_FINAL_MB = /(m)b$/g,
    EXPRESSION_C = /c/g,
    EXPRESSION_C_TO_X = /^ch|[^s]ch|cia/g,
    EXPRESSION_C_TO_S = /c([iey])/g,
    EXPRESSION_D_TO_J = /d(g[eiy])/g,
    EXPRESSION_D = /d/g,
    EXPRESSION_NOT_FINAL_G = /g(h[^aeiou])/g,
    /* All D's were transformed to T's, weird bug in the algorithm. */
    EXPRESSION_FINAL_GN_OR_GNED = /g(n(ed)?)$/g,
    /* Now, the spec says not to transform G to J when double G's occur. As
     * GG is already removed by duplicate adjacent letters, I'm ignoring
     * this here. */
    EXPRESSION_G_TO_J = /g([iey])/g,
    EXPRESSION_G = /g/g,
    EXPRESSION_H = /([aeiou])h([^aeiou]|$)/g,
    EXPRESSION_CK = /ck/g,
    EXPRESSION_PH = /ph/g,
    EXPRESSION_Q = /q/g,
    EXPRESSION_S = /s(h|ia|io)/g,
    EXPRESSION_T = /t(ia|io)/g,
    EXPRESSION_TH = /th/g,
    EXPRESSION_TCH = /tch/g,
    EXPRESSION_V = /v/g,
    EXPRESSION_WH = /^wh/g,
    EXPRESSION_W = /w([^aeiou]|$)/g,
    EXPRESSION_INITIAL_X = /^x/g,
    EXPRESSION_X = /x/g,
    EXPRESSION_Y = /y([^aeiou]|$)/g,
    EXPRESSION_Z = /z/,
    EXPRESSION_VOWELS = /[aeiou]/g;

function initials($0) {
    return $0.charAt(1);
}

function cToX($0) {
    return $0.replace(EXPRESSION_C, 'x');
}

function metaphone(value) {
    value = String(value)
        .toLowerCase()
        .replace(EXPRESSION_DUPLICATE_ADJACENT_LETTERS, '$1')
        .replace(EXPRESSION_INITIALS, initials)
        .replace(EXPRESSION_FINAL_MB, '$1')
        .replace(EXPRESSION_CK, 'k')
        .replace(EXPRESSION_C_TO_X, cToX)
        .replace(EXPRESSION_C_TO_S, 's$1')
        .replace(EXPRESSION_C, 'k')
        .replace(EXPRESSION_D_TO_J, 'j$1')
        .replace(EXPRESSION_D, 't')
        .replace(EXPRESSION_NOT_FINAL_G, '$1')
        .replace(EXPRESSION_FINAL_GN_OR_GNED, '$1')
        .replace(EXPRESSION_G_TO_J, 'j$1')
        .replace(EXPRESSION_G, 'k')
        .replace(EXPRESSION_H, '$1$2')
        .replace(EXPRESSION_PH, 'f')
        .replace(EXPRESSION_Q, 'k')
        .replace(EXPRESSION_S, 'x$1')
        .replace(EXPRESSION_INITIAL_X, 's')
        .replace(EXPRESSION_X, 'ks')
        .replace(EXPRESSION_T, 'x$1')
        .replace(EXPRESSION_TH, '0')
        .replace(EXPRESSION_TCH, 'ch')
        .replace(EXPRESSION_V, 'f')
        .replace(EXPRESSION_WH, 'w')
        .replace(EXPRESSION_W, '$1')
        .replace(EXPRESSION_Y, '$1')
        .replace(EXPRESSION_Z, 's');

    value = value.charAt(0) + value.slice(1).replace(EXPRESSION_VOWELS, '');

    return value.toUpperCase();
}

module.exports = metaphone;
