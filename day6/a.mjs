import { readFile } from "fs/promises"

const input = (await readFile("./input.txt"))
  .toString()
  .trim()
  .split(",")
  .map(Number)

const max = 8
const queue = []

for (let i = 0; i <= max; i++) {
  const count = input.filter((x) => x === i).length
  queue.push(count)
}

// const iterations = 80
const iterations = 256

for (let i = 0; i < iterations; i++) {
  const current = queue.shift()
  queue[6] += current
  queue.push(current)
}

const count = queue.reduce((a, b) => a + b)

console.log(count)
