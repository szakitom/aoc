import fs from 'fs'

const data = fs.readFileSync('4.input', 'utf8').split('\n')

const splits = []
let temp = []

data.forEach((item) => {
  if (item === '') {
    splits.push(temp)
    temp = []
  } else {
    temp.push(item)
  }
})

const [commandsRaw, ...boardsRaw] = splits

const boards = [...boardsRaw].map((board) => {
  const convertedBoard = board
    .map((row) => row.split(' ').filter((item) => item !== ''))
    .flat()
  return convertedBoard.map((item) => {
    return { value: Number(item), marked: false }
  })
})

const mark = (boards, value) => {
  boards.forEach((board) => {
    const index = board.findIndex((item) => item.value === value)
    if (index !== -1) {
      board[index].marked = true
    }
  })
}

const checkRows = (board) => {
  for (let y = 0; y < 25; y += 5) {
    const test = []
    for (let x = 0; x < 5; x++) {
      test.push(board[x + y].marked)
    }
    const check = test.every((marked) => marked)
    if (check) {
      return true
    }
  }
  return false
}

const checkColumns = (board) => {
  for (let x = 0; x < 5; x++) {
    const test = []
    for (let y = 0; y < 25; y += 5) {
      test.push(board[y + x].marked)
    }
    const check = test.every((marked) => marked)
    if (check) {
      return true
    }
  }
  return false
}

const checkWin = (boards) => {
  const winners = []
  boards.forEach((board, index) => {
    if (checkRows(board)) {
      winners.push(index)
    }

    if (checkColumns(board)) {
      if (!winners.includes(index)) {
        winners.push(index)
      }
    }
  })
  return winners
}
const commands = commandsRaw.map((raw) => {
  return raw.split(',').map((command) => Number(command))
})[0]

const firstWinner = () => {
  const firstWinnerBoards = [...boards]
  let winner

  for (let command of commands) {
    mark(firstWinnerBoards, command)
    const winners = checkWin(firstWinnerBoards)
    if (winners.length > 0) {
      winner = { index: winners[0], number: command }
      break
    }
  }

  const unmarked = firstWinnerBoards[winner.index].filter(
    (item) => !item.marked
  )

  const sum = unmarked.reduce((acc, curr) => {
    return acc + curr.value
  }, 0)

  console.log(`Final score: ${sum * winner.number}`)
}

const lastWinner = () => {
  const lastWinnerBoards = [...boards]
  const wonBoards = []
  for (let command of commands) {
    mark(lastWinnerBoards, command)
    const winners = checkWin(lastWinnerBoards)
    if (winners.length > 0) {
      winners.forEach((index, i) => {
        wonBoards.push({
          board: lastWinnerBoards.splice(index - i, 1)[0],
          number: command,
        })
      })
    }
  }
  const last = wonBoards.pop()

  const unmarked = last.board.filter((item) => !item.marked)
  const sum = unmarked.reduce((acc, curr) => {
    return acc + curr.value
  }, 0)

  console.log(`Final score for last winner: ${sum * last.number}`)
}
firstWinner()
lastWinner()
