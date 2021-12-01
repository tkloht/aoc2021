import { readFile } from "fs/promises";

const result = (await readFile("./input.txt"))
  .toString()
  .split("\n")
  .map(Number)
  .reduce(
    (acc, current, index, array) => {
      const window = [current, array[index + 1], array[index + 2]].filter(
        Boolean
      );
      const windowSum = window.reduce((a, b) => a + b, 0);
      if (
        window.length === 3 &&
        acc.previous !== null &&
        windowSum > acc.previous
      ) {
        return { increasedCount: acc.increasedCount + 1, previous: windowSum };
      }
      return { ...acc, previous: windowSum };
    },
    { previous: null, increasedCount: 0 }
  );

console.log("result: ", result);
