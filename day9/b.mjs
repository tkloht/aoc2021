import { readFile } from "fs/promises"

const input = (await readFile("./input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((x) => x.split("").map(Number))

const rowCount = input.length
const colCount = input[0].length

function getAdjacent(x, y) {
  const left = y > 0 ? { row: x, col: y - 1, value: input[x][y - 1] } : null
  const right =
    y < colCount - 1 ? { row: x, col: y + 1, value: input[x][y + 1] } : null
  const top = x > 0 ? { row: x - 1, col: y, value: input[x - 1][y] } : null
  const bottom =
    x < rowCount - 1 ? { row: x + 1, col: y, value: input[x + 1][y] } : null
  return [top, right, bottom, left].filter((x) => x !== null)
}

const lowPoints = []

for (let row = 0; row < rowCount; row++) {
  for (let col = 0; col < colCount; col++) {
    const value = input[row][col]
    const adjacent = getAdjacent(row, col).map((x) => x.value)
    const minAdjacent = Math.min(...adjacent)
    if (value < minAdjacent) {
      lowPoints.push({ value, row, col })
    }
  }
}

function expandBasin(basin) {
  const newElements = []
  for (let element of basin) {
    const adjacent = getAdjacent(element.row, element.col)
    adjacent.forEach((candidate) => {
      if (
        candidate.value !== 9 &&
        candidate.value > element.value &&
        !basin.some(
          (x) => x.row === candidate.row && x.col === candidate.col
        ) &&
        !newElements.some(
          (x) => x.row === candidate.row && x.col === candidate.col
        )
      ) {
        newElements.push(candidate)
      }
    })
  }

  if (newElements.length > 0) {
    console.log("expand again... ", basin.length + newElements.length)
    return expandBasin([...basin, ...newElements])
  }

  return basin.length
}

const basins = lowPoints.map((x) => expandBasin([x]))

console.log("basins after expand: ", basins)

const result = basins
  .sort((a, b) => a - b)
  .slice(-3)
  .reduce((a, b) => a * b)

console.log("result: ", result)
