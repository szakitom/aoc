import fs from 'fs'

const data = fs
  .readFileSync('6.input', 'utf8')
  .split('\n')
  .slice(0, -1)[0]
  .split(',')

let rawFishes = data.map((fish) => Number(fish))

let fishes = rawFishes.reduce((acc, curr) => {
  const index = acc.findIndex((item) => item.age === curr)
  if (index === -1) {
    acc.push({ age: curr, count: 1 })
  } else {
    acc[index].count += 1
  }
  return acc
}, [])

const DAYS = 256

const day = () => {
  let newFishes = 0
  const changedFishes = fishes.map((fish) => {
    if (fish.age === 0) {
      newFishes += fish.count
      return { age: 6, count: fish.count }
    } else {
      return { age: fish.age - 1, count: fish.count }
    }
  })

  return [...changedFishes, { age: 8, count: newFishes }]
}

for (let i = 0; i < DAYS; i++) {
  fishes = day()
}

let sum = 0
fishes.forEach((fish) => (sum += fish.count))
console.log(sum)
