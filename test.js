import assert from 'node:assert'
import util from 'node:util'
import cp from 'node:child_process'
import fs from 'node:fs'
import {URL} from 'node:url'
import {PassThrough} from 'node:stream'
import test from 'node:test'
import {metaphone} from './index.js'

const exec = util.promisify(cp.exec)

/** @type {import('type-fest').PackageJson} */
const pack = JSON.parse(
  String(fs.readFileSync(new URL('package.json', import.meta.url)))
)

const own = {}.hasOwnProperty

test('metaphone()', function () {
  assert.equal(metaphone(''), '', "should work on `''`")
  // @ts-expect-error
  assert.equal(metaphone(false), '', 'should work on `false`')
  // @ts-expect-error
  assert.equal(metaphone(undefined), '', 'should work on `undefined`')
  // @ts-expect-error
  assert.equal(metaphone(null), '', 'should work on `null`')

  assert.equal(metaphone(' f o '), 'F', 'should ignore white-space')
  assert.equal(metaphone('0f1o2'), 'F', 'should ignore digits')
  assert.equal(metaphone('0 1 2'), '', 'should work without letters')
  assert.equal(
    metaphone('Agrippa'),
    'AKRP',
    'should drop duplicate adjacent letters'
  )
  assert.equal(metaphone('wy'), '', 'should work on initial w')

  assert.equal(metaphone('oo'), 'O', 'should work on initial vowels (`oo`)')
  assert.equal(metaphone('ee'), 'E', 'should work on initial vowels (`ee`)')
  assert.equal(metaphone('ii'), 'I', 'should work on initial vowels (`ii`)')
  assert.equal(metaphone('uu'), 'U', 'should work on initial vowels (`uu`)')
  assert.equal(metaphone('sci'), 'S', 'should work on c preceded by s')
  assert.equal(metaphone('acceptingness'), 'AKSPTNKNS', 'should work on gn')
  assert.equal(metaphone('kool-aid'), 'KLT', 'should work on ck')
  assert.equal(
    metaphone('abandonware'),
    'ABNTNWR',
    'should work on w followed by a vowel'
  )
  assert.equal(
    metaphone('hiccups'),
    'HKKPS',
    "should not drop duplicate adjacent C's"
  )
  assert.equal(
    metaphone('knack'),
    'NK',
    'should drop the initial K when followed by N'
  )
  assert.equal(
    metaphone('gnarl'),
    'NRL',
    'should drop the initial G when followed by N'
  )
  assert.equal(
    metaphone('pneumatics'),
    'NMTKS',
    'should drop the initial P when followed by N'
  )
  assert.equal(
    metaphone('aerial'),
    'ERL',
    'should drop the initial A when followed by E'
  )
  assert.equal(
    metaphone('wrestler'),
    'RSTLR',
    'should drop the initial W when followed by R'
  )
  assert.equal(
    metaphone('climb'),
    'KLM',
    'should drop the final B when preceded by M'
  )

  // ...which in turn will be transformed to `ks` later.
  assert.equal(
    metaphone('arithmetician'),
    'AR0MTXN',
    'should transform C to X if followed by IA'
  )

  // ...which in turn will be transformed to `ks` later.
  assert.equal(
    metaphone('abroach'),
    'ABRX',
    'should transform C to X, if not preceded by S and followed by H'
  )

  assert.equal(
    metaphone('discharge'),
    'TSXRJ',
    'should NOT transform C to X, if preceded by S and followed by H'
  )

  // ...which in turn will be transformed to `x` later.
  // ...which in turn will be transformed to `ks` later.
  assert.equal(
    metaphone('vicious'),
    'FSS',
    'should transform C to S if followed by I'
  )
  assert.equal(
    metaphone('vice'),
    'FS',
    'should transform C to S if followed by E'
  )
  assert.equal(
    metaphone('conspiracy'),
    'KNSPRS',
    'should transform C to S if followed by Y'
  )

  assert.equal(
    metaphone('abject'),
    'ABJKT',
    "should transform remaining C's to K"
  )

  assert.equal(
    metaphone('abridge'),
    'ABRJ',
    'should transform D to J if followed by GE'
  )

  assert.equal(
    metaphone('sedgy'),
    'SJ',
    'should transform D to J if followed by GY'
  )

  assert.equal(
    metaphone('grudging'),
    'KRJNK',
    'should transform D to J if followed by GI'
  )

  assert.equal(
    metaphone('abandon'),
    'ABNTN',
    "should transform remaining D's to assert"
  )

  assert.equal(
    metaphone('affright'),
    'AFRFT',
    'should drop G if followed by H and something else'
  )

  assert.equal(
    metaphone('arraign'),
    'ARN',
    'should drop G if followed by N or NED, and $'
  )
  assert.equal(
    metaphone('assigned'),
    'ASNT',
    'should drop G if followed by N or NED, and $'
  )
  assert.equal(
    metaphone('agile'),
    'AJL',
    'should transform G to J if not preceded by G, and followed by I'
  )
  assert.equal(
    metaphone('allege'),
    'ALJ',
    'should transform G to J if not preceded by G, and followed by E'
  )
  assert.equal(
    metaphone('apology'),
    'APLJ',
    'should transform G to J if not preceded by G, and followed by Y'
  )
  assert.equal(metaphone('young'), 'YNK', "should transform remaining G's to K")
  assert.equal(
    metaphone('pharaoh'),
    'FR',
    'should drop H when preceded by a vowel and not followed by a vowel'
  )
  assert.equal(metaphone('antick'), 'ANTK', 'should transform CK to K')
  assert.equal(metaphone('alphabet'), 'ALFBT', 'should transform PH to F')
  assert.equal(metaphone('aqua'), 'AK', 'should transform Q to K')

  // ...which in turn will be transformed to `ks` later.
  assert.equal(
    metaphone('abash'),
    'ABX',
    'should transform S to X when followed by H'
  )

  // ...which in turn will be transformed to `ks` later.
  assert.equal(
    metaphone('Asia'),
    'AX',
    'should transform S to X when followed by IA'
  )

  assert.equal(
    metaphone('decision'),
    'TSXN',
    'should transform S to X when followed by IO'
  )
  assert.equal(
    metaphone('dalmatian'),
    'TLMXN',
    'should transform assert to X when followed by IA'
  )
  assert.equal(
    metaphone('alteration'),
    'ALTRXN',
    'should transform assert to X when followed by IO'
  )
  assert.equal(
    metaphone('although'),
    'AL0',
    'should transform TH to 0 (a zero)'
  )
  assert.equal(metaphone('dispatch'), 'TSPX', 'should drop T if followed by CH')
  assert.equal(metaphone('above'), 'ABF', 'should transform V to F')
  assert.equal(
    metaphone('whale'),
    'WL',
    'should transform WH to W if preceded by ^ (start-of-string)'
  )

  assert.equal(
    metaphone('allow'),
    'AL',
    'should drop W if not followed by a vowel'
  )

  assert.equal(
    metaphone('Xanthippe'),
    'SN0P',
    'should transform X to S if preceded by ^ (start-of-string)'
  )

  assert.equal(metaphone('axe'), 'AKS', "should transform remaining X's to KS")

  assert.equal(
    metaphone('betrays'),
    'BTRS',
    'should drop Y if not followed by a vowel'
  )

  assert.equal(metaphone('amazed'), 'AMST', 'should transform Z to S')

  assert.equal(
    metaphone('appearance'),
    'APRNS',
    'should drop all vowels unless preceded by ^ (start-of-string)'
  )

  assert.equal(
    metaphone('HICCUPS'),
    metaphone('hiccups'),
    'should not ignore casing (1)'
  )
  assert.equal(
    metaphone('HiCcUpS'),
    metaphone('hiccups'),
    'should not ignore casing (2)'
  )
})

// Tests that this module returns the same results as Natural.
// See: <https://github.com/NaturalNode/natural>.
test('Compatibility with Natural', function () {
  /** @type {Record<string, string>} */
  const fixtures = {
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
  /** @type {string} */
  let key

  for (key in fixtures) {
    if (own.call(fixtures, key)) {
      assert.equal(metaphone(key), fixtures[key], key)
    }
  }
})

test('cli', async function () {
  assert.deepEqual(
    await exec('./cli.js michael'),
    {stdout: 'MXL\n', stderr: ''},
    'one'
  )

  assert.deepEqual(
    await exec('./cli.js detestable vileness'),
    {stdout: 'TTSTBL FLNS\n', stderr: ''},
    'one'
  )

  await new Promise(function (resolve) {
    const input = new PassThrough()
    const subprocess = cp.exec('./cli.js', function (error, stdout, stderr) {
      assert.deepEqual(
        [error, stdout, stderr],
        [null, 'TTSTBL FLNS\n', ''],
        'stdin'
      )
    })
    assert(subprocess.stdin, 'expected stdin on `subprocess`')
    input.pipe(subprocess.stdin)
    input.write('detestable')
    setImmediate(function () {
      input.end(' vileness')
      setImmediate(resolve)
    })
  })

  const h = await exec('./cli.js -h')
  assert.ok(/\sUsage: metaphone/.test(h.stdout), '-h')

  const help = await exec('./cli.js --help')
  assert.ok(/\sUsage: metaphone/.test(help.stdout), '-h')

  assert.deepEqual(
    await exec('./cli.js -v'),
    {stdout: pack.version + '\n', stderr: ''},
    '-v'
  )

  assert.deepEqual(
    await exec('./cli.js --version'),
    {stdout: pack.version + '\n', stderr: ''},
    '--version'
  )
})
