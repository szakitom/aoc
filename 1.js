import fs from 'fs'

let data = fs.readFileSync('1.input', 'utf8').split('\n')
let count = 0
let last = data[0] + data[1] + data[2]
while (data.length >= 3) {
  const [a, b, c, ...rest] = data
  let sum = Number(a) + Number(b) + Number(c)

  if (last < sum) {
    count++
  }
  last = sum
  data.shift()
}

console.log(count)
