import fs from 'fs'

const data = fs.readFileSync('8.input', 'utf8').split('\n').slice(0, -1)

const originalMapping = {
  0: 'abcefg',
  1: 'cf',
  2: 'acdeg',
  3: 'acdfg',
  4: 'bcdf',
  5: 'abdfg',
  6: 'abdefg',
  7: 'acf',
  8: 'abcdefg',
  9: 'abcdfg',
}

// 1, 4, 7, 8 are unique

let sum = 0

data.forEach((row) => {
  const [input, output] = row.split(' | ')
  output.split(' ').forEach((number) => {
    if ([2, 4, 3, 7].includes(number.length)) {
      sum++
    }
  })
})

console.log('Part one: ', sum)

const map = (input) => {
  const knownNumbers = input
    .filter((number) => [2, 4, 3, 7].includes(number.length))
    .sort((a, b) => a.length - b.length)
  const unknownNumbers = input.filter(
    (number) => !knownNumbers.includes(number)
  )
  const mapping = {}
  const solvedChars = []
  const mappedsolvedChars = []
  knownNumbers.forEach((number, i) => {
    if (i === 3) {
      return
    }
    const chars = number.split('').filter((char) => !solvedChars.includes(char))

    const toIndex = Object.keys(originalMapping).find(
      (i) => originalMapping[i].length === number.length
    )
    const to = originalMapping[toIndex]
      .split('')
      .filter((char) => !mappedsolvedChars.includes(char))

    chars.forEach((char, index) => {
      if (!mapping[char]) {
        mapping[char] = to[index]
        solvedChars.push(char)
        mappedsolvedChars.push(to[index])
      }
    })
  })

  const guesses = unknownNumbers.filter((number) => number.length === 5)
  const find2 = guesses.find((guess) => {
    const remaining = guess
      .split('')
      .filter((char) => !solvedChars.includes(char))
    if (remaining.length === 2) {
      return remaining
    }
  })
  const two = find2.split('').filter((number) => !solvedChars.includes(number))
  const find5or3 = guesses
    .find((guess) => {
      const remaining = guess
        .split('')
        .filter((char) => !solvedChars.includes(char))
      if (remaining.length === 1) {
        return remaining
      }
    })
    .split('')
    .filter((number) => !solvedChars.includes(number))
  const pairOfG = two.filter((g) => find5or3.includes(g))[0]
  const pairOfE = two.filter((g) => !find5or3.includes(g))[0]
  mapping[pairOfG] = 'g'
  mapping[pairOfE] = 'e'
  solvedChars.push(pairOfE, pairOfG)
  mappedsolvedChars.push('e', 'g')
  const find1 = knownNumbers.find((number) => number.length === 2)
  const find4 = knownNumbers.find((number) => number.length === 4)
  const find7 = knownNumbers.find((number) => number.length === 3)
  const pairOfA = find7.split('').filter((g) => !find1.split('').includes(g))[0]
  const pairOfC = find7
    .split('')
    .filter((g) => find2.includes(g))
    .filter((g) => g !== pairOfA)[0]
  const pairOfF = find1.split('').find((g) => g !== pairOfC)
  const pairOfD = find2
    .split('')
    .filter((g) => ![pairOfA, pairOfC, pairOfE, pairOfG].includes(g))[0]
  const pairOfB = find4
    .split('')
    .filter((g) => ![pairOfC, pairOfD, pairOfF].includes(g))[0]

  const finalMapping = {
    [pairOfA]: 'a',
    [pairOfB]: 'b',
    [pairOfC]: 'c',
    [pairOfD]: 'd',
    [pairOfE]: 'e',
    [pairOfF]: 'f',
    [pairOfG]: 'g',
  }

  return finalMapping
}

const calcOutput = (output, mapping) => {
  const numbers = output.map((number) => {
    const remapped = number
      .split('')
      .map((char) => {
        return mapping[char]
      })
      .sort()
      .join('')
    return remapped
  })

  const values = numbers.map((number) => {
    const value = Object.keys(originalMapping).find(
      (index) => originalMapping[index] === number
    )
    return value
  })

  const finalValue = Number(values.join(''))
  return finalValue
}

const row = data[0]
const values = data.map((row) => {
  const [inputRaw, outputRaw] = row.split(' | ')
  let input = inputRaw.split(' ')
  let output = outputRaw.split(' ')

  const mapping = map(input)
  const number = calcOutput(output, mapping)
  return number
})

sum = 0

values.forEach((value) => (sum += value))

console.log('Part two: ', sum)
