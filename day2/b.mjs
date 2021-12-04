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
  ({ horizontal, depth, aim }, { direction, value }) => {
    switch (direction) {
      case "forward":
        return {
          horizontal: horizontal + value,
          depth: depth + aim * value,
          aim,
        };
      case "up":
        return { horizontal, depth, aim: aim - value };
      case "down":
        return { horizontal, depth, aim: aim + value };
      default:
        return { horizontal, depth, aim };
    }
  },
  { horizontal: 0, depth: 0, aim: 0 }
);

console.log(result.depth * result.horizontal);
