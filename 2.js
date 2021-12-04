import fs from 'fs'

const data = fs.readFileSync('2.input', 'utf8').split('\n')
let depth = 0
let position = 0
let aim = 0

data.forEach((line) => {
  const [command, amount] = line.split(' ')
  console.log(command, amount)
  switch (command) {
    case 'down':
      aim += Number(amount)
      break
    case 'up':
      aim -= Number(amount)
      break
    case 'forward':
      position += Number(amount)
      depth += Number(amount) * aim
      break
    default:
      break
  }
})

console.log(`Depth: ${depth}, Position: ${position}`)
console.log(depth * position)
