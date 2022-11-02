const sh = 'X'
const th = '0'

/**
 * Get the phonetics according to the original Metaphone algorithm from a value
 *
 * @param {string} value
 * @returns {string}
 */
// eslint-disable-next-line complexity
export function metaphone(value) {
  let phonized = ''
  let index = 0

  /**
   * Add `characters` to `phonized`
   *
   * @param {string} characters
   */
  function phonize(characters) {
    phonized += characters
  }

  /**
   * Get the character offset by `offset` from the current character
   *
   * @param {number} offset
   */
  function at(offset) {
    return value.charAt(index + offset).toUpperCase()
  }

  /**
   * Create an `at` function with a bound `offset`
   *
   * @param {number} offset
   */
  function atFactory(offset) {
    return function () {
      return at(offset)
    }
  }

  value = String(value || '')

  if (!value) {
    return ''
  }

  const next = atFactory(1)
  const current = atFactory(0)
  const previous = atFactory(-1)

  // Find our first letter
  while (!alpha(current())) {
    if (!current()) {
      return ''
    }

    index++
  }

  switch (current()) {
    case 'A':
      // AE becomes E
      if (next() === 'E') {
        phonize('E')
        index += 2
      } else {
        // Remember, preserve vowels at the beginning
        phonize('A')
        index++
      }

      break
    // [GKP]N becomes N
    case 'G':
    case 'K':
    case 'P':
      if (next() === 'N') {
        phonize('N')
        index += 2
      }

      break

    // WH becomes H, WR becomes R, W if followed by a vowel
    case 'W':
      if (next() === 'R') {
        phonize(next())
        index += 2
      } else if (next() === 'H') {
        phonize(current())
        index += 2
      } else if (vowel(next())) {
        phonize('W')
        index += 2
      }

      // Ignore
      break
    // X becomes S
    case 'X':
      phonize('S')
      index++

      break
    // Vowels are kept (we did A already)
    case 'E':
    case 'I':
    case 'O':
    case 'U':
      phonize(current())
      index++
      break
    default:
      // Ignore
      break
  }

  // On to the metaphoning
  while (current()) {
    // How many letters to skip because an eariler encoding handled multiple
    // letters
    let skip = 1

    // Ignore non-alphas
    if (!alpha(current()) || (current() === previous() && current() !== 'C')) {
      index += skip
      continue
    }

    // eslint-disable-next-line default-case
    switch (current()) {
      // B -> B unless in MB
      case 'B':
        if (previous() !== 'M') {
          phonize('B')
        }

        break
      // 'sh' if -CIA- or -CH, but not SCH, except SCHW (SCHW is handled in S)
      // S if -CI-, -CE- or -CY- dropped if -SCI-, SCE-, -SCY- (handed in S)
      // else K
      case 'C':
        if (soft(next())) {
          // C[IEY]
          if (next() === 'I' && at(2) === 'A') {
            // CIA
            phonize(sh)
          } else if (previous() !== 'S') {
            phonize('S')
          }
        } else if (next() === 'H') {
          phonize(sh)
          skip++
        } else {
          // C
          phonize('K')
        }

        break
      // J if in -DGE-, -DGI- or -DGY-, else T
      case 'D':
        if (next() === 'G' && soft(at(2))) {
          phonize('J')
          skip++
        } else {
          phonize('T')
        }

        break
      // F if in -GH and not B--GH, D--GH, -H--GH, -H---GH
      // else dropped if -GNED, -GN,
      // else dropped if -DGE-, -DGI- or -DGY- (handled in D)
      // else J if in -GE-, -GI, -GY and not GG
      // else K
      case 'G':
        if (next() === 'H') {
          if (!(noGhToF(at(-3)) || at(-4) === 'H')) {
            phonize('F')
            skip++
          }
        } else if (next() === 'N') {
          if (!(!alpha(at(2)) || (at(2) === 'E' && at(3) === 'D'))) {
            phonize('K')
          }
        } else if (soft(next()) && previous() !== 'G') {
          phonize('J')
        } else {
          phonize('K')
        }

        break

      // H if before a vowel and not after C,G,P,S,T
      case 'H':
        if (vowel(next()) && !dipthongH(previous())) {
          phonize('H')
        }

        break
      // Dropped if after C, else K
      case 'K':
        if (previous() !== 'C') {
          phonize('K')
        }

        break
      // F if before H, else P
      case 'P':
        if (next() === 'H') {
          phonize('F')
        } else {
          phonize('P')
        }

        break
      // K
      case 'Q':
        phonize('K')
        break
      // 'sh' in -SH-, -SIO- or -SIA- or -SCHW-, else S
      case 'S':
        if (next() === 'I' && (at(2) === 'O' || at(2) === 'A')) {
          phonize(sh)
        } else if (next() === 'H') {
          phonize(sh)
          skip++
        } else {
          phonize('S')
        }

        break
      // 'sh' in -TIA- or -TIO-, else 'th' before H, else T
      case 'T':
        if (next() === 'I' && (at(2) === 'O' || at(2) === 'A')) {
          phonize(sh)
        } else if (next() === 'H') {
          phonize(th)
          skip++
        } else if (!(next() === 'C' && at(2) === 'H')) {
          phonize('T')
        }

        break
      // F
      case 'V':
        phonize('F')
        break
      case 'W':
        if (vowel(next())) {
          phonize('W')
        }

        break
      // KS
      case 'X':
        phonize('KS')
        break
      // Y if followed by a vowel
      case 'Y':
        if (vowel(next())) {
          phonize('Y')
        }

        break
      // S
      case 'Z':
        phonize('S')
        break
      // No transformation
      case 'F':
      case 'J':
      case 'L':
      case 'M':
      case 'N':
      case 'R':
        phonize(current())
        break
    }

    index += skip
  }

  return phonized
}

/**
 * Check whether `character` would make `'GH'` an `'F'`
 *
 * @param {string} character
 * @returns {boolean}
 */
function noGhToF(character) {
  character = char(character)

  return character === 'B' || character === 'D' || character === 'H'
}

/**
 * Check whether `character` would make a `'C'` or `'G'` soft
 *
 * @param {string} character
 * @returns {boolean}
 */
function soft(character) {
  character = char(character)
  return character === 'E' || character === 'I' || character === 'Y'
}

/**
 * Check whether `character` is a vowel
 *
 * @param {string} character
 * @returns {boolean}
 */
function vowel(character) {
  character = char(character)

  return (
    character === 'A' ||
    character === 'E' ||
    character === 'I' ||
    character === 'O' ||
    character === 'U'
  )
}

/**
 * Check whether `character` forms a dipthong when preceding H
 *
 * @param {string} character
 * @returns {boolean}
 */
function dipthongH(character) {
  character = char(character)

  return (
    character === 'C' ||
    character === 'G' ||
    character === 'P' ||
    character === 'S' ||
    character === 'T'
  )
}

/**
 * Check whether `character` is in the alphabet
 *
 * @param {string} character
 * @returns {boolean}
 */
function alpha(character) {
  const code = charCode(character)
  return code >= 65 && code <= 90
}

/**
 * Get the upper-case character code of the first character in `character`
 *
 * @param {string} character
 * @returns {number}
 */
function charCode(character) {
  // @ts-expect-error: it’s a numer.
  return char(character).codePointAt(0)
}

/**
 * Turn `character` into a single, upper-case character
 *
 * @param {string} character
 * @returns {string}
 */
function char(character) {
  return String(character).charAt(0).toUpperCase()
}
