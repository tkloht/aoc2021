import { readFile } from "fs/promises"

const input = (await readFile("./input.txt")).toString().trim().split("\n")

console.log(input)
