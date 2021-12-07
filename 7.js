import fs from 'fs'

const data = fs
  .readFileSync('7.input', 'utf8')
  .split('\n')
  .slice(0, -1)[0]
  .split(',')

const positions = data.map((crab) => Number(crab))
const max = Math.max(...positions)

const fuels = []

const alignTo = (index) => {
  let sum = 0
  positions.forEach((position) => {
    sum += Math.abs(index - position)
  })
  fuels.push(sum)
}

const consumptions = []

const align = (index) => {
  let sum = 0
  positions.forEach((position) => {
    const distance = Math.abs(index - position)
    const consumption = ((1 + distance) * distance) / 2
    sum += consumption
  })
  consumptions.push(sum)
}

for (let i = 0; i <= max; i++) {
  alignTo(i)
  align(i)
}

const min = Math.min(...fuels)
const minConsumption = Math.min(...consumptions)
console.log('Part 1', min)
console.log('Part 2', minConsumption)
