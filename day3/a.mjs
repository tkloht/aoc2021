import { readFile } from "fs/promises";

const input = await (
  await readFile("./input.txt")
)
  .toString()
  .trim()
  .split("\n")
  .map((x) => x.split(""));

const columns = input[0].map((_x, idx) => input.map((y) => y[idx]));

const counts = columns.map((c) =>
  c.reduce(
    (acc, current) => {
      return { ...acc, [current]: acc[current] + 1 };
    },
    { 1: 0, 0: 0 }
  )
);

const gamma = counts.map((x) => (x[0] < x[1] ? "1" : "0")).join("");
const epsilon = counts.map((x) => (x[0] < x[1] ? "0" : "1")).join("");

const decimals = {
  gamma: parseInt(gamma, 2),
  epsilon: parseInt(epsilon, 2),
};

console.log(decimals.gamma * decimals.epsilon);
