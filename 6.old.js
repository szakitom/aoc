import fs from 'fs'

const data = fs
  .readFileSync('6.input.sample', 'utf8')
  .split('\n')
  .slice(0, -1)[0]
  .split(',')

let fishes = data.map((fish) => Number(fish))

const days = 256

const day = () => {
  const newFishes = []
  const changedFishes = fishes.map((fish) => {
    if (fish === 0) {
      newFishes.push(8)
      return 6
    }
    return fish - 1
  })
  return [...changedFishes, ...newFishes]
}

for (let i = 0; i < days; i++) {
  fishes = day()
}

console.log(fishes.length)
