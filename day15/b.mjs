import { readFile } from "fs/promises"

const input = (await readFile("./input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((x) => x.split("").map(Number))

function addWrapped(a, b) {
  return a + b > 9 ? a + b - 9 : a + b
}

// expand right
const expandedRight = input.map((row) => {
  const expandedRow = new Array(row.length * 5)
  row.forEach((value, index) => {
    expandedRow[index] = value
    expandedRow[index + row.length] = addWrapped(value, 1)
    expandedRow[index + row.length * 2] = addWrapped(value, 2)
    expandedRow[index + row.length * 3] = addWrapped(value, 3)
    expandedRow[index + row.length * 4] = addWrapped(value, 4)
  })
  return expandedRow
})

// expand bottom
const expandedBottom = new Array(input.length * 5)
expandedRight.forEach((row, index) => {
  expandedBottom[index] = row
  expandedBottom[index + input.length] = row.map((x) => addWrapped(x, 1))
  expandedBottom[index + input.length * 2] = row.map((x) => addWrapped(x, 2))
  expandedBottom[index + input.length * 3] = row.map((x) => addWrapped(x, 3))
  expandedBottom[index + input.length * 4] = row.map((x) => addWrapped(x, 4))
})

const unVisited = new Set()
const visited = new Set()
const nodes = {}

expandedBottom.forEach((row, rowIdx) => {
  row.forEach((cost, idx) => {
    const adjacent = [
      [rowIdx - 1, idx],
      [rowIdx, idx + 1],
      [rowIdx + 1, idx],
      [rowIdx, idx - 1],
    ]
      .filter(
        ([x, y]) =>
          x >= 0 && y >= 0 && x < expandedBottom.length && y < row.length
      )
      .map(([x, y]) => `${x},${y}`)
    const key = `${rowIdx},${idx}`
    unVisited.add(key)
    nodes[key] = {
      key,
      cost: Number(cost),
      tentativeCost: rowIdx === 0 && idx === 0 ? 0 : Number.POSITIVE_INFINITY,
      adjacent,
    }
  })
})

let currentKey = "0,0"
const goalKey = `${expandedBottom.length - 1},${expandedBottom[0].length - 1}`
let iterations = 0
const queue = []

while (!visited.has(goalKey)) {
  iterations += 1
  const current = nodes[currentKey]
  const neighbours = current.adjacent.map((x) => nodes[x])
  neighbours.forEach((x) => {
    const newTentativeCost = current.tentativeCost + x.cost
    if (newTentativeCost < x.tentativeCost) {
      if (x.tentativeCost === Number.POSITIVE_INFINITY) {
        queue.push(x.key)
      }
      x.tentativeCost = newTentativeCost
    }
  })

  visited.add(currentKey)
  unVisited.delete(currentKey)
  queue.shift()

  if (queue.length > 0) {
    queue.sort((a, b) => nodes[a].tentativeCost - nodes[b].tentativeCost)
    currentKey = queue[0]
  }
}

console.log(nodes[goalKey].tentativeCost)
