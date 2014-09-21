'use strict';

var metaphone,
    assert;

/**
 * Module dependencies.
 */

metaphone = require('..');
assert = require('assert');

/**
 * Unit tests.
 */

describe('metaphone(value)', function () {
    it('should be of type `function`', function () {
        assert(typeof metaphone === 'function');
    });

    it('should drop duplicate adjacent letters', function () {
        assert(metaphone('Agrippa') === 'AKRP');
    });

    it('should not drop duplicate adjacent C\'s', function () {
        assert(metaphone('hiccups') === 'HKKPS');
    });

    it('should drop the initial K when followed by N', function () {
        assert(metaphone('knack') === 'NK');
    });

    it('should drop the initial G when followed by N', function () {
        assert(metaphone('gnarl') === 'NRL');
    });

    it('should drop the initial P when followed by N', function () {
        assert(metaphone('pneumatics') === 'NMTKS');
    });

    it('should drop the initial A when followed by E', function () {
        assert(metaphone('aerial') === 'ERL');
    });

    it('should drop the initial W when followed by R', function () {
        assert(metaphone('wrestler') === 'RSTLR');
    });

    it('should drop the final B when preceded by M', function () {
        assert(metaphone('climb') === 'KLM');
    });

    it('should transform C to X if followed by IA', function () {
        // ...which in turn will be transformed to `ks` later.
        assert(metaphone('arithmetician') === 'AR0MTKSN');
    });

    it('should transform C to X, if not preceded by S and followed by H',
        function () {
            // ...which in turn will be transformed to `ks` later.
            assert(metaphone('abroach') === 'ABRKSH');
        }
    );

    it('should NOT transform C to X, if preceded by S and followed by H',
        function () {
            assert(metaphone('discharge') === 'TSKHRJ');
        }
    );

    it('should transform C to S if followed by I', function () {
        // ...which in turn will be transformed to `x` later.
        // ...which in turn will be transformed to `ks` later.
        assert(metaphone('vicious') === 'FKSS');
    });

    it('should transform C to S if followed by E', function () {
        assert(metaphone('vice') === 'FS');
    });

    it('should transform C to S if followed by Y', function () {
        assert(metaphone('conspiracy') === 'KNSPRS');
    });

    it('should transform remaining C\'s to K', function () {
        assert(metaphone('abject') === 'ABJKT');
    });

    it('should transform D to J if followed by GE', function () {
        assert(metaphone('abridge') === 'ABRJJ');
    });

    it('should transform D to J if followed by GY', function () {
        assert(metaphone('sedgy') === 'SJJ');
    });

    it('should transform D to J if followed by GI', function () {
        assert(metaphone('grudging') === 'KRJJNK');
    });

    it('should transform remaining D\'s to T', function () {
        assert(metaphone('abandon') === 'ABNTN');
    });

    it('should drop G if followed by H, and not $ (end-of-string) or ' +
        'vowel', function () {
            assert(metaphone('affright') === 'AFRT');
        }
    );

    it('should drop G if followed by N or NED, and $ (end-of-string)',
        function () {
            assert(metaphone('arraign') === 'ARN');

            assert(metaphone('assigned') === 'ASKNT');
        }
    );

    it('should transform G to J if not preceded by G, and followed by I',
        function () {
            assert(metaphone('agile') === 'AJL');
        }
    );

    it('should transform G to J if not preceded by G, and followed by E',
        function () {
            assert(metaphone('allege') === 'ALJ');
        }
    );

    it('should transform G to J if not preceded by G, and followed by Y',
        function () {
            assert(metaphone('apology') === 'APLJ');
        }
    );

    it('should transform remaining G\'s to K', function () {
        assert(metaphone('young') === 'YNK');
    });

    it('should drop H when preceded by a vowel and not followed by a vowel',
        function () {
            assert(metaphone('pharaoh') === 'FR');
        }
    );

    it('should transform CK to K', function () {
        assert(metaphone('antick') === 'ANTK');
    });

    it('should transform PH to F', function () {
        assert(metaphone('alphabet') === 'ALFBT');
    });

    it('should transform Q to K', function () {
        assert(metaphone('aqua') === 'AK');
    });

    it('should transform S to X when followed by H', function () {
        // ...which in turn will be transformed to `ks` later.
        assert(metaphone('abash') === 'ABKSH');
    });

    it('should transform S to X when followed by IA', function () {
        // ...which in turn will be transformed to `ks` later.
        assert(metaphone('Asia') === 'AKS');
    });

    it('should transform S to X when followed by IO', function () {
        assert(metaphone('decision') === 'TSKSN');
    });

    it('should transform T to X when followed by IA', function () {
        assert(metaphone('dalmatian') === 'TLMXN');
    });

    it('should transform T to X when followed by IO', function () {
        assert(metaphone('alteration') === 'ALTRXN');
    });

    it('should transform TH to 0 (a zero)', function () {
        assert(metaphone('although') === 'AL0KH');
    });

    it('should drop T if followed by CH', function () {
        assert(metaphone('dispatch') === 'TSPTKSH');
    });

    it('should transform V to F', function () {
        assert(metaphone('above') === 'ABF');
    });

    it('should transform WH to W if preceded by ^ (start-of-string)',
        function () {
            assert(metaphone('whale') === 'WL');
        }
    );

    it('should drop W if not followed by a vowel', function () {
        assert(metaphone('allow') === 'AL');
    });

    it('should transform X to S if preceded by ^ (start-of-string)',
        function () {
            assert(metaphone('Xanthippe') === 'SN0P');
        }
    );

    it('should transform remaining X\'s to KS', function () {
        assert(metaphone('axe') === 'AKS');
    });

    it('should drop Y if not followed by a vowel', function () {
        assert(metaphone('betrays') === 'BTRS');
    });

    it('should transform Z to S', function () {
        assert(metaphone('amazed') === 'AMST');
    });

    it('should drop all vowels unless preceded by ^ (start-of-string)',
        function () {
            assert(metaphone('appearance') === 'APRNS');
        }
    );

    it('should not ignore casing', function () {
        var result = metaphone('hiccups');
        assert(metaphone('HICCUPS') === result);
        assert(metaphone('HiCcUpS') === result);
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
        'ablaze' : 'ABLS',
        'transition' : 'TRNSXN',
        'astronomical' : 'ASTRNMKL',
        'buzzard' : 'BSRT',
        'wonderer' : 'WNTRR',
        'district' : 'TSTRKT',
        'hockey' : 'HK',
        'capital' : 'KPTL',
        'penguin' : 'PNKN',
        'garbonzo' : 'KRBNS',
        'lightning' : 'LTNNK',
        'light' : 'LT'
    };

    Object.keys(fixtures).forEach(function (fixture) {
        var result;

        result = fixtures[fixture];

        it('should process `' + fixture + '` to `' + result + '`',
            function () {
                assert(metaphone(fixture) === result);
            }
        );
    });
});
