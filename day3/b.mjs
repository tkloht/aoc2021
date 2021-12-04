import { readFile } from "fs/promises";

const input = await (
  await readFile("./input.txt")
)
  .toString()
  .trim()
  .split("\n")
  .map((x) => x.split(""));

const getColumns = (rows) => rows[0].map((_x, idx) => rows.map((y) => y[idx]));

function getCounts(columns) {
  return columns.map((c) =>
    c.reduce(
      (acc, current) => {
        return { ...acc, [current]: acc[current] + 1 };
      },
      { 1: 0, 0: 0 }
    )
  );
}

function filterByCriteria(columns, criteria, idx) {
  return columns.filter((x) => x[idx] === criteria[idx]);
}

let colIdx = 0;
let rows = input;

while (rows.length > 1) {
  const columns = getColumns(rows);
  const counts = getCounts(columns);
  const oxigenCriteria = counts[colIdx][0] > counts[colIdx][1] ? "0" : "1";

  rows = rows.filter((x) => x[colIdx] === oxigenCriteria);
  colIdx = (colIdx + 1) % columns.length;
}

const oxigenResult = rows[0].join(" ");
rows = input;
colIdx = 0;

while (rows.length > 1) {
  const columns = getColumns(rows);
  const counts = getCounts(columns);
  const co2Criteria = counts[colIdx][1] < counts[colIdx][0] ? "1" : "0";

  rows = rows.filter((x) => x[colIdx] === co2Criteria);
  colIdx = (colIdx + 1) % columns.length;
}

const co2Result = rows[0].join("");

console.log(parseInt(oxigenResult, 2) * parseInt(co2Result, 2));
