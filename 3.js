import fs from 'fs'

const data = fs.readFileSync('3.input', 'utf8').split('\n').slice(0, -1)

const numbers = []
data.reduce((acc, curr) => {
  const num = curr.split('')
  for (let i in num) {
    if (!acc[i]) {
      acc[i] = 0
    }
    acc[i] += Number(num[i])
  }
  return acc
}, numbers)

let gamma = ''
let epsilon = ''

numbers.forEach((number) => {
  if (number > data.length / 2) {
    gamma += 1
    epsilon += 0
  } else {
    gamma += 0
    epsilon += 1
  }
})

const gammaDec = parseInt(gamma, 2)
const epsilonDec = parseInt(epsilon, 2)

console.log(`Consumption: ${gammaDec * epsilonDec}`)

let oxigenList = data
let co2List = data

numbers.forEach((number, index) => {
  const countOxigen = oxigenList
    .map((item) => item[index])
    .reduce((acc, curr) => {
      return acc + Number(curr)
    }, 0)
  const countCO2 = co2List
    .map((item) => item[index])
    .reduce((acc, curr) => {
      return acc + Number(curr)
    }, 0)
  const findOxigen = countOxigen >= oxigenList.length / 2 ? 1 : 0
  const findCO2 = countCO2 >= co2List.length / 2 ? 0 : 1
  if (oxigenList.length >= 2) {
    oxigenList = oxigenList.filter((n) => {
      return Number(n[index]) === findOxigen
    })
  }
  if (co2List.length >= 2) {
    co2List = co2List.filter((n) => {
      return Number(n[index]) === findCO2
    })
  }
})

let oxigen
let co2

if (oxigenList.length === 1 && co2List.length === 1) {
  oxigen = parseInt(oxigenList[0], 2)
  co2 = parseInt(co2List[0], 2)
  console.log(`Oxigen: ${oxigen}`)
  console.log(`CO2: ${co2}`)
} else {
  console.log('more than one after filter')
}

console.log(`Life support rating: ${oxigen * co2}`)
