import { readFile } from "fs/promises";

const input = (await readFile("./input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((x) => {
    const [direction, value] = x.split(" ");
    return { direction, value: Number(value) };
  });

const result = input.reduce(
  ({ horizontal, depth }, { direction, value }) => {
    switch (direction) {
      case "forward":
        return { horizontal: horizontal + value, depth };
      case "up":
        return { horizontal, depth: depth - value };
      case "down":
        return { horizontal, depth: depth + value };
      default:
        return { horizontal, depth };
    }
  },
  { horizontal: 0, depth: 0 }
);

console.log(result.depth * result.horizontal);
