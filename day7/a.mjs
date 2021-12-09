import { readFile } from "fs/promises"

const input = (await readFile("./input.txt"))
  .toString()
  .trim()
  .split(",")
  .map(Number)

const min = Math.min(...input)
const max = Math.max(...input)

const costs = {}

for (let i = min; i <= max; i++) {
  costs[i] = calculateFuel(input, i)
}

const minCostPosition = Object.entries(costs).reduce(
  (acc, [position, fuel]) => {
    if (fuel < acc[1]) {
      return [position, fuel]
    }
    return acc
  }
)[1]

console.log(minCostPosition)

function calculateFuel(currentPositions, destination) {
  return currentPositions
    .map((x) => Math.abs(x - destination))
    .reduce((a, b) => a + b)
}
