import { readFile } from "fs/promises"

const openingCharacters = ["(", "[", "{", "<"]
const closingCharacters = [")", "]", "}", ">"]

const costMap = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
}

const input = (await readFile("./input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((x) => x.split(""))

const illegalCharacters = input.map(findIllegalCharacter).filter(Boolean)
console.log(illegalCharacters)
const cost = illegalCharacters.map((x) => costMap[x]).reduce((a, b) => a + b)

console.log("cost: ", cost)

function findIllegalCharacter(line) {
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
        return currentCharacter
      }
    }
  }

  return null
}
