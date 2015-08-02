'use strict';

/* eslint-env mocha */

var assert = require('assert');
var metaphone = require('..');

/*
 * Methods.
 */

var equal = assert.equal;

/*
 * Fixtures.
 */

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

    it('should drop duplicate adjacent letters', function () {
        equal(metaphone('Agrippa'), 'AKRP');
    });

    it('should work on initial w', function () {
        equal(metaphone('wy'), '');
    });

    it('should work on initial vowels', function () {
        equal(metaphone('oo'), 'O');
        equal(metaphone('ee'), 'E');
        equal(metaphone('ii'), 'I');
        equal(metaphone('uu'), 'U');
    });

    it('should work on c preceded by s', function () {
        equal(metaphone('sci'), 'S');
    });

    it('should work on gn', function () {
        equal(metaphone('acceptingness'), 'AKSPTNKNS');
    });

    it('should work on ck', function () {
        equal(metaphone('kool-aid'), 'KLT');
    });

    it('should work on w followed by a vowel', function () {
        equal(metaphone('abandonware'), 'ABNTNWR');
    });

    it('should not drop duplicate adjacent C\'s', function () {
        equal(metaphone('hiccups'), 'HKKPS');
    });

    it('should drop the initial K when followed by N', function () {
        equal(metaphone('knack'), 'NK');
    });

    it('should drop the initial G when followed by N', function () {
        equal(metaphone('gnarl'), 'NRL');
    });

    it('should drop the initial P when followed by N', function () {
        equal(metaphone('pneumatics'), 'NMTKS');
    });

    it('should drop the initial A when followed by E', function () {
        equal(metaphone('aerial'), 'ERL');
    });

    it('should drop the initial W when followed by R', function () {
        equal(metaphone('wrestler'), 'RSTLR');
    });

    it('should drop the final B when preceded by M', function () {
        equal(metaphone('climb'), 'KLM');
    });

    it('should transform C to X if followed by IA', function () {
        // ...which in turn will be transformed to `ks` later.
        equal(metaphone('arithmetician'), 'AR0MTXN');
    });

    it('should transform C to X, if not preceded by S and followed by H',
        function () {
            // ...which in turn will be transformed to `ks` later.
            equal(metaphone('abroach'), 'ABRX');
        }
    );

    it('should NOT transform C to X, if preceded by S and followed by H',
        function () {
            equal(metaphone('discharge'), 'TSXRJ');
        }
    );

    it('should transform C to S if followed by I', function () {
        // ...which in turn will be transformed to `x` later.
        // ...which in turn will be transformed to `ks` later.
        equal(metaphone('vicious'), 'FSS');
    });

    it('should transform C to S if followed by E', function () {
        equal(metaphone('vice'), 'FS');
    });

    it('should transform C to S if followed by Y', function () {
        equal(metaphone('conspiracy'), 'KNSPRS');
    });

    it('should transform remaining C\'s to K', function () {
        equal(metaphone('abject'), 'ABJKT');
    });

    it('should transform D to J if followed by GE', function () {
        equal(metaphone('abridge'), 'ABRJ');
    });

    it('should transform D to J if followed by GY', function () {
        equal(metaphone('sedgy'), 'SJ');
    });

    it('should transform D to J if followed by GI', function () {
        equal(metaphone('grudging'), 'KRJNK');
    });

    it('should transform remaining D\'s to T', function () {
        equal(metaphone('abandon'), 'ABNTN');
    });

    it('should drop G if followed by H, and not $ (end-of-string) or ' +
        'vowel', function () {
            equal(metaphone('affright'), 'AFRFT');
        }
    );

    it('should drop G if followed by N or NED, and $ (end-of-string)',
        function () {
            equal(metaphone('arraign'), 'ARN');

            equal(metaphone('assigned'), 'ASNT');
        }
    );

    it('should transform G to J if not preceded by G, and followed by I',
        function () {
            equal(metaphone('agile'), 'AJL');
        }
    );

    it('should transform G to J if not preceded by G, and followed by E',
        function () {
            equal(metaphone('allege'), 'ALJ');
        }
    );

    it('should transform G to J if not preceded by G, and followed by Y',
        function () {
            equal(metaphone('apology'), 'APLJ');
        }
    );

    it('should transform remaining G\'s to K', function () {
        equal(metaphone('young'), 'YNK');
    });

    it('should drop H when preceded by a vowel and not followed by a vowel',
        function () {
            equal(metaphone('pharaoh'), 'FR');
        }
    );

    it('should transform CK to K', function () {
        equal(metaphone('antick'), 'ANTK');
    });

    it('should transform PH to F', function () {
        equal(metaphone('alphabet'), 'ALFBT');
    });

    it('should transform Q to K', function () {
        equal(metaphone('aqua'), 'AK');
    });

    it('should transform S to X when followed by H', function () {
        // ...which in turn will be transformed to `ks` later.
        equal(metaphone('abash'), 'ABX');
    });

    it('should transform S to X when followed by IA', function () {
        // ...which in turn will be transformed to `ks` later.
        equal(metaphone('Asia'), 'AX');
    });

    it('should transform S to X when followed by IO', function () {
        equal(metaphone('decision'), 'TSXN');
    });

    it('should transform T to X when followed by IA', function () {
        equal(metaphone('dalmatian'), 'TLMXN');
    });

    it('should transform T to X when followed by IO', function () {
        equal(metaphone('alteration'), 'ALTRXN');
    });

    it('should transform TH to 0 (a zero)', function () {
        equal(metaphone('although'), 'AL0');
    });

    it('should drop T if followed by CH', function () {
        equal(metaphone('dispatch'), 'TSPX');
    });

    it('should transform V to F', function () {
        equal(metaphone('above'), 'ABF');
    });

    it('should transform WH to W if preceded by ^ (start-of-string)',
        function () {
            equal(metaphone('whale'), 'WL');
        }
    );

    it('should drop W if not followed by a vowel', function () {
        equal(metaphone('allow'), 'AL');
    });

    it('should transform X to S if preceded by ^ (start-of-string)',
        function () {
            equal(metaphone('Xanthippe'), 'SN0P');
        }
    );

    it('should transform remaining X\'s to KS', function () {
        equal(metaphone('axe'), 'AKS');
    });

    it('should drop Y if not followed by a vowel', function () {
        equal(metaphone('betrays'), 'BTRS');
    });

    it('should transform Z to S', function () {
        equal(metaphone('amazed'), 'AMST');
    });

    it('should drop all vowels unless preceded by ^ (start-of-string)',
        function () {
            equal(metaphone('appearance'), 'APRNS');
        }
    );

    it('should not ignore casing', function () {
        var result = metaphone('hiccups');
        equal(metaphone('HICCUPS'), result);
        equal(metaphone('HiCcUpS'), result);
    });
});

/**
 * Tests that this module returns the same results
 * as Natural.
 *
 * Source:
 *   https://github.com/NaturalNode/natural
 */

describe('Compatibility with Natural', function () {
    var fixtures = {
        'ablaze': 'ABLS',
        'transition': 'TRNSXN',
        'astronomical': 'ASTRNMKL',
        'buzzard': 'BSRT',
        'wonderer': 'WNTRR',
        'district': 'TSTRKT',
        'hockey': 'HK',
        'capital': 'KPTL',
        'penguin': 'PNKN',
        'garbonzo': 'KRBNS',
        'lightning': 'LFTNNK',
        'light': 'LFT'
    };

    Object.keys(fixtures).forEach(function (fixture) {
        var result;

        result = fixtures[fixture];

        it('should process `' + fixture + '` to `' + result + '`',
            function () {
                equal(metaphone(fixture), result);
            }
        );
    });
});
