import { readFile } from "fs/promises"

let [coordinates, foldInstructions] = (await readFile("./input.txt"))
  .toString()
  .trim()
  .split("\n\n")

foldInstructions = foldInstructions
  .split("\n")
  .map((x) => x.replace("fold along ", ""))

coordinates = coordinates.split("\n").map((x) => x.split(",").map(Number))

while (foldInstructions.length) {
  let [direction, pivot] = foldInstructions.shift().split("=")
  pivot = Number(pivot)

  if (direction === "y") {
    coordinates = coordinates.map(([x, y]) => {
      if (y < pivot) {
        return [x, y]
      } else {
        const diff = y - pivot
        return [x, pivot - diff]
      }
    })
  } else {
    coordinates = coordinates.map(([x, y]) => {
      if (x < pivot) {
        return [x, y]
      } else {
        const diff = x - pivot
        return [pivot - diff, y]
      }
    })
  }
}

print()

console.log(
  "visible dot counts:",
  new Set(coordinates.map((x) => x.join())).size
)

function print() {
  const xMax = Math.max(...coordinates.map(([x, _y]) => x))
  const yMax = Math.max(...coordinates.map(([_x, y]) => y))

  const grid = new Array(yMax + 1)
    .fill("")
    .map(() => new Array(xMax + 1).fill(" "))

  for (let coordinate of coordinates) {
    let [x, y] = coordinate
    grid[y][x] = "#"
  }

  console.log(grid.map((x) => x.join("")).join("\n"))
}
