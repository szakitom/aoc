import fs from 'fs'

console.log('WARNING: extremely inefficient!!')
const TASK = 1

const data = fs.readFileSync('5.input.sample', 'utf8').split('\n').slice(0, -1)

const ranges = data.map((entry) => {
  const [from, to] = entry.split(' -> ')
  const [x1, y1] = from.split(',')
  const [x2, y2] = to.split(',')
  return { x1: Number(x1), y1: Number(y1), x2: Number(x2), y2: Number(y2) }
})

const simpleLines = ranges.filter(
  (range) => range.x1 === range.x2 || range.y1 === range.y2
)

let lines
if (TASK === 1) {
  lines = [...simpleLines]
} else {
  lines = ranges
}

const expandDiagonal = (line) => {
  const { x1, x2, y1, y2 } = line
  const yCount = Math.max(y1, y2) - Math.min(y1, y2)
  const xCount = Math.max(x1, x2) - Math.min(x1, x2)
  const count = Math.max(yCount, xCount)
  let iY = 1
  let iX = 1
  if (y1 > y2) {
    iY = -1
  }
  if (x1 > x2) {
    iX = -1
  }
  const points = []
  for (let y = 0; y <= count; y++) {
    points.push({ x: x1 + y * iX, y: y1 + y * iY })
  }
  return points
}
const expand = (line) => {
  const points = []
  const { x1, x2, y1, y2 } = line
  for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      points.push({ x, y })
    }
  }
  return points
}

const expanded = lines
  .map((line) => {
    if (line.x1 === line.x2 || line.y1 === line.y2) {
      return expand(line)
    } else {
      return expandDiagonal(line)
    }
  })
  .flat()

const merged = expanded.reduce((acc, curr) => {
  const find = acc.findIndex(
    (i) => i.coord.x === curr.x && i.coord.y === curr.y
  )
  if (find === -1) {
    acc.push({ coord: curr, count: 1 })
  } else {
    acc[find].count += 1
  }
  return acc
}, [])

const count = merged.filter((item) => item.count >= 2)
console.log('Overlappinng with at least 2: ', count.length)
