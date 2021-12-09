import fs from 'fs'

const data = fs.readFileSync('9.input.sample', 'utf8').split('\n').slice(0, -1)

const map = data.map((row) => row.split(''))
const smalls = []
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    let top
    let bottom
    let right
    let left
    if (y - 1 >= 0) {
      top = Number(map[y - 1][x])
    }
    if (y + 1 < map.length) {
      bottom = Number(map[y + 1][x])
    }
    if (x - 1 >= 0) {
      left = Number(map[y][x - 1])
    }
    if (x + 1 < map[y].length) {
      right = Number(map[y][x + 1])
    }
    const item = Number(map[y][x])
    const smallest = Math.min(
      ...[left, right, top, bottom].filter((i) => i !== undefined)
    )
    if (smallest > item) {
      smalls.push({ value: item, x, y })
    }
  }
}

let sum = 0

smalls.forEach((small) => (sum += small.value + 1))

console.log('Part one: ', sum)

const find = (center, direction, cells, workMap) => {
  const { x, y } = center
  const { x: dX, y: dY } = direction
  if (y < 0 || y > map.length - 1 || x < 0 || x > map[y].length - 1) {
    return cells
  }
  if (Number(map[y][x]) !== 9) {
    if (!workMap[y][x].visited) {
      cells.push({ value: Number(map[y][x]), x, y })
      workMap[y][x].visited = true
    }
    if (Math.abs(dY) === 0) {
      if (y + 1 < map.length && !workMap[y + 1][x]?.visited) {
        find({ x, y: y + 1 }, { x: 0, y: 1 }, cells, workMap)
      }
      if (y - 1 >= 0 && !workMap[y - 1][x]?.visited) {
        find({ x, y: y - 1 }, { x: 0, y: -1 }, cells, workMap)
      }
    }
    if (Math.abs(dX) === 0) {
      if (x + 1 < map[y].length && !workMap[y][x + 1]?.visited) {
        find({ x: x + 1, y }, { x: 1, y: 0 }, cells, workMap)
      }
      if (x - 1 >= 0 && !workMap[y][x - 1]?.visited) {
        find({ x: x - 1, y }, { x: -1, y: 0 }, cells, workMap)
      }
    }
  } else {
    return cells
  }

  find({ x: x + dX, y: y + dY }, direction, cells, workMap)
  return cells
}

const basins = []

const visit = (small) => {
  const workMap = map.map((row, y) => {
    const cells = row.map((_, x) => {
      if (x === small.x && y === small.y) {
        return { visited: true }
      }
      return { visited: false }
    })
    return cells
  })

  const lefts = find(
    { x: small.x - 1, y: small.y },
    { x: -1, y: 0 },
    [],
    workMap
  )
  const rights = find(
    { x: small.x + 1, y: small.y },
    { x: 1, y: 0 },
    [],
    workMap
  )
  const tops = find(
    { x: small.x, y: small.y - 1 },
    { x: 0, y: -1 },
    [],
    workMap
  )
  const bottoms = find(
    { x: small.x, y: small.y + 1 },
    { x: 0, y: 1 },
    [],
    workMap
  )
  basins.push([small, ...lefts, ...rights, ...tops, ...bottoms].length)
}

smalls.forEach((small) => {
  visit(small)
})

const [a, b, c] = basins.sort((a, b) => b - a)
console.log('Part two: ', a * b * c)
