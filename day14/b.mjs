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

let pairs = polymer
  .map((x, idx, array) => [x, array[idx + 1]])
  .filter((x) => x.every(Boolean))
  .map((x) => x.join(""))

let pairCounts = pairs.map((x, idx, array) => ({
  pair: x,
  count: array.filter((y) => x === y).length,
}))

let letterCounts = {}
polymer.forEach((x) => updateLetterCounts(x, 1))

for (let i = 0; i < steps; i++) {
  pairCounts = pairCounts
    .flatMap(({ pair, count }) => {
      const [a, b] = pair.split("")

      updateLetterCounts(instructions[pair], count)

      return [
        { count, pair: `${a}${instructions[pair]}` },
        { count, pair: `${instructions[pair]}${b}` },
      ]
    })
    .reduce((acc, current) => {
      const existing = acc.filter((x) => x.pair === current.pair)
      const rest = acc.filter((x) => x.pair !== current.pair)
      const count = existing.reduce((a, b) => a + b.count, current.count)
      return [...rest, { count, pair: current.pair }]
    }, [])
}

function updateLetterCounts(letter, count) {
  const existing = letterCounts[letter] || 0
  letterCounts[letter] = existing + count
}

const max = Math.max(...Object.values(letterCounts))
const min = Math.min(...Object.values(letterCounts))

console.log("result: ", max - min)
