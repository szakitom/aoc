import fs from 'fs'

const data = fs.readFileSync('11.input.sample', 'utf8').split('\n').slice(0, -1)

const map = data.map((row) =>
  row.split('').map((cell) => ({ value: Number(cell), flashed: false }))
)

const flash = (x, y) => {
  if (x - 1 >= 0) {
    map[y][x - 1].value += 1
  }
  if (x + 1 < map[y].length) {
    map[y][x + 1].value += 1
  }
  if (y - 1 >= 0) {
    map[y - 1][x].value += 1
  }
  if (y + 1 < map.length) {
    map[y + 1][x].value += 1
  }
  if (x - 1 >= 0 && y - 1 >= 0) {
    map[y - 1][x - 1].value += 1
  }
  if (x - 1 >= 0 && y + 1 < map.length) {
    map[y + 1][x - 1].value += 1
  }
  if (x + 1 < map[y].length && y - 1 >= 0) {
    map[y - 1][x + 1].value += 1
  }
  if (x + 1 < map[y].length && y + 1 < map.length) {
    map[y + 1][x + 1].value += 1
  }
}

const checkFlash = () => {
  const changed = []
  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.value > 9 && !cell.flashed) {
        flash(x, y)
        cell.flashed = true
        changed.push({ x, y })
      }
    })
  })
  if (changed.length !== 0) {
    checkFlash()
  }
}

const step = () => {
  let flashes = 0
  map.forEach((row) => {
    row.forEach((cell) => {
      cell.value += 1
    })
  })

  checkFlash()

  map.forEach((row) => {
    row.forEach((cell) => {
      if (cell.flashed) {
        flashes += 1
        cell.flashed = false
        cell.value = 0
      }
    })
  })
  return flashes
}

let sum = 0
let found

for (let i = 0; i < 100; i++) {
  const count = step()
  if (count === 100) {
    found = i
  }
  sum += count
}

console.log('Part one: ', sum)

let iter = 100
while (!found) {
  const count = step()
  if (count === 100) {
    found = iter
  }
  iter++
}

console.log('Part two: ', found + 1)
