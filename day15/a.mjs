import { readFile } from "fs/promises"

const input = (await readFile("./input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((x) => x.split(""))

const unVisited = new Set()
const visited = new Set()
const nodes = {}

input.forEach((row, rowIdx) => {
  row.forEach((cost, idx) => {
    const adjacent = [
      [rowIdx - 1, idx],
      [rowIdx, idx + 1],
      [rowIdx + 1, idx],
      [rowIdx, idx - 1],
    ]
      .filter(
        ([x, y]) => x >= 0 && y >= 0 && x < input.length && y < row.length
      )
      .map(([x, y]) => `${x},${y}`)
    const key = `${rowIdx},${idx}`
    unVisited.add(key)
    nodes[key] = {
      cost: Number(cost),
      tentativeCost: rowIdx === 0 && idx === 0 ? 0 : Number.POSITIVE_INFINITY,
      adjacent,
    }
  })
})

let currentKey = "0,0"
const goalKey = `${input.length - 1},${input[0].length - 1}`
let iterations = 0

while (iterations < 10000 && !visited.has(goalKey)) {
  iterations += 1
  const current = nodes[currentKey]
  const neighbours = current.adjacent.map((x) => nodes[x])
  neighbours.forEach((x) => {
    const newTentativeCost = current.tentativeCost + x.cost
    if (newTentativeCost < x.tentativeCost) {
      x.tentativeCost = newTentativeCost
    }
  })

  visited.add(currentKey)
  unVisited.delete(currentKey)

  if (unVisited.size > 0) {
    currentKey = [...unVisited].reduce((acc, key) => {
      if (nodes[key].tentativeCost < nodes[acc].tentativeCost) {
        return key
      } else {
        return acc
      }
    })
  }
}

console.log(nodes[goalKey].tentativeCost)
