import { readFile } from "fs/promises"

const input = (await readFile("./input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((x) => {
    const [source, destination] = x.split(" -> ")
    return { source, destination }
  })

const exploded = input.map(explodeLine).flat()
console.log(" exploded coordinates: ", exploded)

const aggregated = {}

for (let current of exploded) {
  aggregated[current] = aggregated[current] ? aggregated[current] + 1 : 1
}

const overlapCoordinates = Object.entries(aggregated).filter(
  ([_, count]) => count > 1
)

console.log(overlapCoordinates.length)

function explodeLine({ source, destination }) {
  let [currentX, currentY] = source.split(",").map(Number)
  let [destinationX, destinationY] = destination.split(",").map(Number)
  const result = [source]

  while (currentY !== destinationY || currentX !== destinationX) {
    if (currentY !== destinationY) {
      currentY = currentY < destinationY ? currentY + 1 : currentY - 1
    }
    if (currentX !== destinationX) {
      currentX = currentX < destinationX ? currentX + 1 : currentX - 1
    }
    result.push(`${currentX},${currentY}`)
  }

  return result
}
