import { readFile } from "fs/promises"

const lines = (await readFile("./input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((x) => {
    let [patterns, output] = x.split(/\s\|\s/)
    patterns = patterns.split(" ")
    output = output.split(" ")
    return { patterns, output }
  })

const digits = lines
  .map((x) => x.output.map(mapOutputToDigit).filter(Boolean))
  .flat().length
console.log(digits)

function mapOutputToDigit(pattern) {
  if (pattern.length === 2) {
    return "1"
  }
  if (pattern.length === 4) {
    return "4"
  }
  if (pattern.length === 3) {
    return "7"
  }
  if (pattern.length === 7) {
    return "8"
  }
  return undefined
}
