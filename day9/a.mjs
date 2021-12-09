import { readFile } from "fs/promises"

const input = (await readFile("./input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((x) => x.split("").map(Number))

const rowCount = input.length
const colCount = input[0].length

function getAdjacent(x, y) {
  const left = y > 0 ? input[x][y - 1] : null
  const right = y < colCount - 1 ? input[x][y + 1] : null
  const top = x > 0 ? input[x - 1][y] : null
  const bottom = x < rowCount - 1 ? input[x + 1][y] : null
  return [top, right, bottom, left].filter((x) => x !== null)
}

const lowPoints = []

for (let row = 0; row < rowCount; row++) {
  for (let col = 0; col < colCount; col++) {
    const value = input[row][col]
    const adjacent = getAdjacent(row, col)
    const minAdjacent = Math.min(...adjacent)
    if (value < minAdjacent) {
      lowPoints.push(value)
    }
  }
}

const risk = lowPoints.map((x) => x + 1).reduce((a, b) => a + b)
console.log(risk)
