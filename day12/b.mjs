import { readFile } from "fs/promises"

const input = (await readFile("./input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((x) => x.split("-"))

const routes = input.reduce((acc, current) => {
  const [from, to] = current
  const existingFrom = (acc[from] || []).filter((x) => x !== "start")
  const existingTo = (acc[to] || []).filter((x) => x !== "start")
  return {
    ...acc,
    [from]: [...existingFrom, to],
    [to]: [...existingTo, from],
  }
}, {})

function hasSmallCaveVisitedTwice(caves) {
  const smallCaves = caves.filter((x) => x.match(/([a-z])+/))
  const smallCavesUnique = new Set(smallCaves)

  return smallCaves.length > smallCavesUnique.size
}

function findDistinctPaths(position = "start", graph = ["start"]) {
  if (position === "end") {
    return graph.join(",")
  }

  const possibleNext = routes[position].filter(
    (x) =>
      !(
        x.match(/([a-z])+/) &&
        graph.includes(x) &&
        hasSmallCaveVisitedTwice(graph)
      )
  )

  return possibleNext.flatMap((x) => findDistinctPaths(x, [...graph, x]))
}

const distinctPaths = findDistinctPaths()

console.log("routes map: ", routes)
// console.log("distincts paths: ", distinctPaths)
console.log("distinct path count: ", distinctPaths.length)
