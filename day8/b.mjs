import { readFile } from "fs/promises"

const lines = (await readFile("./input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((x) => {
    let [patterns, output] = x.split(/\s\|\s/)
    patterns = patterns.split(" ").map((y) => new Set(y))
    output = output.split(" ").map((y) => new Set(y))
    return { patterns, output }
  })

const digits = lines.map((line) => {
  const knownPatterns = getKnownPatterns(line.patterns)
  console.log(" known patterns: ", knownPatterns)
  return line.output.map((x) => mapOutputToDigit(x, knownPatterns)).join("")
})

console.log(">>> digits: ", digits)

const result = digits.map(Number).reduce((a, b) => a + b)

console.log(result)

function getKnownPatterns(outputs) {
  return {
    1: outputs.find((x) => x.size === 2),
    4: outputs.find((x) => x.size === 4),
    7: outputs.find((x) => x.size === 3),
    8: outputs.find((x) => x.size === 7),
  }
}

function contains(x, y) {
  for (let i of y) {
    if (!x.has(i)) {
      return false
    }
  }
  return true
}

function mapOutputToDigit(pattern, knownPatterns) {
  const one = knownPatterns["1"]
  const fourWitoutOne = knownPatterns["4"]
  for (let x of one) {
    fourWitoutOne.delete(x)
  }
  console.log("foutWithoutOne", fourWitoutOne)

  if (pattern.size === 2) {
    return "1"
  }
  if (pattern.size === 5) {
    if (contains(pattern, one)) {
      return "3"
    }
    if (contains(pattern, fourWitoutOne)) {
      return "5"
    }
    return "2"
    // if contains 1: 3
    // if contains the four-without-one: 5
    // else 2
  }
  if (pattern.size === 4) {
    return "4"
  }
  if (pattern.size === 3) {
    return "7"
  }
  if (pattern.size === 7) {
    return "8"
  }
  if (pattern.size === 6) {
    if (!contains(pattern, one)) {
      return "6"
    }
    if (!contains(pattern, fourWitoutOne)) {
      return "0"
    }
    return "9"
    // if not includes 1 -> 6
    // if not includes 4 -> 9
    // else 0
    // else 9 or 0
  }
}
