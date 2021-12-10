import { readFile } from "fs/promises"

const openingCharacters = ["(", "[", "{", "<"]
const closingCharacters = [")", "]", "}", ">"]

const costMap = {
  "(": 1,
  "[": 2,
  "{": 3,
  "<": 4,
}

const input = (await readFile("./input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((x) => x.split(""))

const missingCharacters = input.map(findMissingCharacters).filter(Boolean)

const cost = missingCharacters.map(calculateCost)

console.log("cost: ", cost)
const medianIdx = Math.ceil(cost.length / 2) - 1
const median = cost.sort((a, b) => a - b)[medianIdx]

console.log("median: ", median)

function calculateCost(line) {
  return line.reduceRight((acc, current) => {
    return acc * 5 + costMap[current]
  }, 0)
}

function findMissingCharacters(line) {
  const openingQueue = []
  while (line.length) {
    const currentCharacter = line.shift()
    if (openingCharacters.includes(currentCharacter)) {
      openingQueue.push(currentCharacter)
    } else {
      const openingCharacter = openingQueue.pop()
      if (
        closingCharacters.indexOf(currentCharacter) !==
        openingCharacters.indexOf(openingCharacter)
      ) {
        return null
      }
    }
  }

  return openingQueue
}
