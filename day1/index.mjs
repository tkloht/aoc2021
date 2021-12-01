import { readFile } from "fs/promises";

const input = (await readFile("./input.txt"))
  .toString()
  .split("\n")
  .map(Number)
  .reduce(
    (acc, current) => {
      if (acc.previous !== null && current > acc.previous) {
        return { increasedCount: acc.increasedCount + 1, previous: current };
      }
      return { ...acc, previous: current };
    },
    { previous: null, increasedCount: 0 }
  );

console.log("input: ", input);

export default input;
