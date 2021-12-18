import { readFile } from "fs/promises"

const input = (await readFile("./input.txt"))
  .toString()
  .trim()
  .split("\n")
  .filter((x) => x !== "")

let [polymer, ...instructions] = input

const steps = 40

polymer = polymer.split("")
instructions = instructions
  .map((x) => x.split(" -> "))
  .reduce((acc, [a, b]) => {
    return { ...acc, [a]: b }
  }, {})

for (let i = 0; i < steps; i++) {
  polymer = polymer.flatMap((x, idx, array) => {
    if (idx === 0) {
      return [x]
    }
    const key = `${array[idx - 1]}${x}`
    return [instructions[key], x]
  })
}

const elements = [...new Set(polymer)]

const counts = elements.map((x) =>
  polymer.reduce((acc, current) => (x === current ? acc + 1 : acc), 0)
)

const min = Math.min(...counts)
const max = Math.max(...counts)

const result = max - min

console.log("elements: ", elements)
console.log("counts: ", counts)

console.log("result: ", result)
