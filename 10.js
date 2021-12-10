import fs from 'fs'

const data = fs.readFileSync('10.input.sample', 'utf8').split('\n').slice(0, -1)

const pairs = {
  '}': '{',
  ')': '(',
  '>': '<',
  ']': '[',
}

const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const checkLine = (line) => {
  const chars = []
  const c = line.split('')
  let corrupt
  for (const char of c) {
    if (['[', '(', '{', '<'].includes(char)) {
      chars.push(char)
    } else {
      const last = chars.pop()
      if (pairs[char] !== last) {
        corrupt = char
      }
    }
  }

  if (chars.length === 0 && !corrupt) {
    return { reason: 'ok', value: null, chars }
  } else if (chars.length !== 0 && !corrupt) {
    return { reason: 'incomplete', value: null, chars }
  } else {
    return { reason: 'corrupt', value: corrupt, chars }
  }
}

let sum = 0

const missings = []
data.forEach((line) => {
  const resp = checkLine(line)
  if (resp.value) {
    sum += points[resp.value]
  }
  if (resp.reason === 'incomplete') {
    missings.push(resp.chars)
  }
})
console.log('Part one: ', sum)

const missingPoints = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
}

const sums = []

missings.forEach((missing) => {
  sum = 0
  missing.reverse().forEach((char) => {
    sum *= 5
    sum += missingPoints[char]
  })
  sums.push(sum)
})

const middle = sums.sort((a, b) => a - b)[Math.floor(sums.length / 2)]

console.log('Part two: ', middle)
