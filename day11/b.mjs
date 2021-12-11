import { readFile } from "fs/promises"

const input = (await readFile("./input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((x) => x.split("").map(Number))

const steps = 100
const colLength = input[0].length
const rowLength = input.length
let stepCount = 0

function increment() {
  input.forEach((row, rowIdx) => {
    row.forEach((value, colIdx) => {
      input[rowIdx][colIdx] += 1
    })
  })
  input.forEach((row, rowIdx) => {
    row.forEach((value, colIdx) => {
      if (value > 9) {
        glow(rowIdx, colIdx)
      }
    })
  })
}

function glow(rowIdx, colIdx) {
  input[rowIdx][colIdx] = 0

  const adjacent = [
    [rowIdx - 1, colIdx], // top
    [rowIdx - 1, colIdx + 1], // top-right
    [rowIdx, colIdx + 1], // right
    [rowIdx + 1, colIdx + 1], // bottom-right
    [rowIdx + 1, colIdx], // bottom
    [rowIdx + 1, colIdx - 1], // bottom-left
    [rowIdx, colIdx - 1], // left
    [rowIdx - 1, colIdx - 1], //top-left
  ]

  adjacent.forEach(([x, y]) => {
    if (
      x >= 0 &&
      x < rowLength &&
      y >= 0 &&
      y < colLength &&
      input[x][y] !== 0
    ) {
      input[x][y] += 1
      if (input[x][y] > 9) {
        glow(x, y)
      }
    }
  })
}

function print() {
  input.forEach((line) => {
    console.log(line.join(""))
  })
}

while (!input.flat().every((x) => x === 0)) {
  increment()
  stepCount += 1
}

print()
console.log("step count: ", stepCount)
