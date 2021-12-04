import { readFile } from "fs/promises";

const input = (await readFile("./input.txt")).toString().trim();

let [queue, ...boards] = input.split("\n\n");

queue = queue.split(",");
boards = boards.map((x) =>
  x.split("\n").map((y) =>
    y
      .trim()
      .split(/\s+/)
      .map((z) => ({ marked: false, value: z }))
  )
);

let result = null;
let currentNumber;
while (!result && queue.length > 0) {
  currentNumber = queue.shift();
  boards = boards.map((x) => markBoard(x, currentNumber));
  result = boards.find(boardHasBingo);
}

console.log(calculateResult({ board: result, currentNumber }));

function markBoard(board, number) {
  return board.map((row) =>
    row.map((x) => (x.value === number ? { ...x, marked: true } : x))
  );
}

function boardHasBingo(board) {
  const rowHasBingo = board
    .map((row) => row.every((x) => x.marked))
    .some(Boolean);

  const columns = board[0].map((_x, idx) => board.map((y) => y[idx].marked));

  const columnHasBingo = columns.map((col) => col.every(Boolean)).some(Boolean);

  return rowHasBingo || columnHasBingo;
}

function calculateResult({ board, currentNumber }) {
  const unmarkedNumbers = board
    .flat()
    .filter((x) => !x.marked)
    .map((x) => Number(x.value))
    .reduce((a, b) => a + b);

  return unmarkedNumbers * Number(currentNumber);
}
