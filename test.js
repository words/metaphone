'use strict'

var exec = require('child_process').exec
var PassThrough = require('stream').PassThrough
var test = require('tape')
var version = require('./package').version
var metaphone = require('.')

test('metaphone()', function(t) {
  t.equal(metaphone(''), '', "should work on `''`")
  t.equal(metaphone(false), '', 'should work on `false`')
  t.equal(metaphone(undefined), '', 'should work on `undefined`')
  t.equal(metaphone(null), '', 'should work on `null`')

  t.equal(metaphone(' f o '), 'F', 'should ignore white-space')
  t.equal(metaphone('0f1o2'), 'F', 'should ignore digits')
  t.equal(metaphone('0 1 2'), '', 'should work without letters')
  t.equal(
    metaphone('Agrippa'),
    'AKRP',
    'should drop duplicate adjacent letters'
  )
  t.equal(metaphone('wy'), '', 'should work on initial w')

  t.equal(metaphone('oo'), 'O', 'should work on initial vowels (`oo`)')
  t.equal(metaphone('ee'), 'E', 'should work on initial vowels (`ee`)')
  t.equal(metaphone('ii'), 'I', 'should work on initial vowels (`ii`)')
  t.equal(metaphone('uu'), 'U', 'should work on initial vowels (`uu`)')
  t.equal(metaphone('sci'), 'S', 'should work on c preceded by s')
  t.equal(metaphone('acceptingness'), 'AKSPTNKNS', 'should work on gn')
  t.equal(metaphone('kool-aid'), 'KLT', 'should work on ck')
  t.equal(
    metaphone('abandonware'),
    'ABNTNWR',
    'should work on w followed by a vowel'
  )
  t.equal(
    metaphone('hiccups'),
    'HKKPS',
    "should not drop duplicate adjacent C's"
  )
  t.equal(
    metaphone('knack'),
    'NK',
    'should drop the initial K when followed by N'
  )
  t.equal(
    metaphone('gnarl'),
    'NRL',
    'should drop the initial G when followed by N'
  )
  t.equal(
    metaphone('pneumatics'),
    'NMTKS',
    'should drop the initial P when followed by N'
  )
  t.equal(
    metaphone('aerial'),
    'ERL',
    'should drop the initial A when followed by E'
  )
  t.equal(
    metaphone('wrestler'),
    'RSTLR',
    'should drop the initial W when followed by R'
  )
  t.equal(
    metaphone('climb'),
    'KLM',
    'should drop the final B when preceded by M'
  )

  // ...which in turn will be transformed to `ks` later.
  t.equal(
    metaphone('arithmetician'),
    'AR0MTXN',
    'should transform C to X if followed by IA'
  )

  // ...which in turn will be transformed to `ks` later.
  t.equal(
    metaphone('abroach'),
    'ABRX',
    'should transform C to X, if not preceded by S and followed by H'
  )

  t.equal(
    metaphone('discharge'),
    'TSXRJ',
    'should NOT transform C to X, if preceded by S and followed by H'
  )

  // ...which in turn will be transformed to `x` later.
  // ...which in turn will be transformed to `ks` later.
  t.equal(
    metaphone('vicious'),
    'FSS',
    'should transform C to S if followed by I'
  )
  t.equal(metaphone('vice'), 'FS', 'should transform C to S if followed by E')
  t.equal(
    metaphone('conspiracy'),
    'KNSPRS',
    'should transform C to S if followed by Y'
  )

  t.equal(metaphone('abject'), 'ABJKT', "should transform remaining C's to K")

  t.equal(
    metaphone('abridge'),
    'ABRJ',
    'should transform D to J if followed by GE'
  )

  t.equal(metaphone('sedgy'), 'SJ', 'should transform D to J if followed by GY')

  t.equal(
    metaphone('grudging'),
    'KRJNK',
    'should transform D to J if followed by GI'
  )

  t.equal(metaphone('abandon'), 'ABNTN', "should transform remaining D's to T")

  t.equal(
    metaphone('affright'),
    'AFRFT',
    'should drop G if followed by H and something else'
  )

  t.equal(
    metaphone('arraign'),
    'ARN',
    'should drop G if followed by N or NED, and $'
  )
  t.equal(
    metaphone('assigned'),
    'ASNT',
    'should drop G if followed by N or NED, and $'
  )
  t.equal(
    metaphone('agile'),
    'AJL',
    'should transform G to J if not preceded by G, and followed by I'
  )
  t.equal(
    metaphone('allege'),
    'ALJ',
    'should transform G to J if not preceded by G, and followed by E'
  )
  t.equal(
    metaphone('apology'),
    'APLJ',
    'should transform G to J if not preceded by G, and followed by Y'
  )
  t.equal(metaphone('young'), 'YNK', "should transform remaining G's to K")
  t.equal(
    metaphone('pharaoh'),
    'FR',
    'should drop H when preceded by a vowel and not followed by a vowel'
  )
  t.equal(metaphone('antick'), 'ANTK', 'should transform CK to K')
  t.equal(metaphone('alphabet'), 'ALFBT', 'should transform PH to F')
  t.equal(metaphone('aqua'), 'AK', 'should transform Q to K')

  // ...which in turn will be transformed to `ks` later.
  t.equal(
    metaphone('abash'),
    'ABX',
    'should transform S to X when followed by H'
  )

  // ...which in turn will be transformed to `ks` later.
  t.equal(
    metaphone('Asia'),
    'AX',
    'should transform S to X when followed by IA'
  )

  t.equal(
    metaphone('decision'),
    'TSXN',
    'should transform S to X when followed by IO'
  )
  t.equal(
    metaphone('dalmatian'),
    'TLMXN',
    'should transform T to X when followed by IA'
  )
  t.equal(
    metaphone('alteration'),
    'ALTRXN',
    'should transform T to X when followed by IO'
  )
  t.equal(metaphone('although'), 'AL0', 'should transform TH to 0 (a zero)')
  t.equal(metaphone('dispatch'), 'TSPX', 'should drop T if followed by CH')
  t.equal(metaphone('above'), 'ABF', 'should transform V to F')
  t.equal(
    metaphone('whale'),
    'WL',
    'should transform WH to W if preceded by ^ (start-of-string)'
  )

  t.equal(metaphone('allow'), 'AL', 'should drop W if not followed by a vowel')

  t.equal(
    metaphone('Xanthippe'),
    'SN0P',
    'should transform X to S if preceded by ^ (start-of-string)'
  )

  t.equal(metaphone('axe'), 'AKS', "should transform remaining X's to KS")

  t.equal(
    metaphone('betrays'),
    'BTRS',
    'should drop Y if not followed by a vowel'
  )

  t.equal(metaphone('amazed'), 'AMST', 'should transform Z to S')

  t.equal(
    metaphone('appearance'),
    'APRNS',
    'should drop all vowels unless preceded by ^ (start-of-string)'
  )

  t.equal(
    metaphone('HICCUPS'),
    metaphone('hiccups'),
    'should not ignore casing (1)'
  )
  t.equal(
    metaphone('HiCcUpS'),
    metaphone('hiccups'),
    'should not ignore casing (2)'
  )

  t.end()
})

// Tests that this module returns the same results as Natural.
// See: <https://github.com/NaturalNode/natural>.
test('Compatibility with Natural', function(t) {
  var fixtures = {
    ablaze: 'ABLS',
    transition: 'TRNSXN',
    astronomical: 'ASTRNMKL',
    buzzard: 'BSRT',
    wonderer: 'WNTRR',
    district: 'TSTRKT',
    hockey: 'HK',
    capital: 'KPTL',
    penguin: 'PNKN',
    garbonzo: 'KRBNS',
    lightning: 'LFTNNK',
    light: 'LFT'
  }

  Object.keys(fixtures).forEach(assert)

  t.end()

  function assert(input) {
    t.equal(metaphone(input), fixtures[input], input)
  }
})

test('cli', function(t) {
  var input = new PassThrough()
  var helps = ['-h', '--help']
  var versions = ['-v', '--version']

  t.plan(7)

  exec('./cli.js michael', function(err, stdout, stderr) {
    t.deepEqual([err, stdout, stderr], [null, 'MXL\n', ''], 'one')
  })

  exec('./cli.js detestable vileness', function(err, stdout, stderr) {
    t.deepEqual([err, stdout, stderr], [null, 'TTSTBL FLNS\n', ''], 'two')
  })

  var subprocess = exec('./cli.js', function(err, stdout, stderr) {
    t.deepEqual([err, stdout, stderr], [null, 'TTSTBL FLNS\n', ''], 'stdin')
  })

  input.pipe(subprocess.stdin)
  input.write('detestable')
  setImmediate(function() {
    input.end(' vileness')
  })

  helps.forEach(function(flag) {
    exec('./cli.js ' + flag, function(err, stdout, stderr) {
      t.deepEqual(
        [err, /\sUsage: metaphone/.test(stdout), stderr],
        [null, true, ''],
        flag
      )
    })
  })

  versions.forEach(function(flag) {
    exec('./cli.js ' + flag, function(err, stdout, stderr) {
      t.deepEqual([err, stdout, stderr], [null, version + '\n', ''], flag)
    })
  })
})
