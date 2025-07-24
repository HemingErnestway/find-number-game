// @ts-check

import { COLORS, DIFFICULTIES } from "@/lib/constants";

/**
 * Pick a random value from array.
 *
 * @template T
 * @param {T[]} array
 * @returns {T}
 */
export function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Create 2d matrix from a flat array, e.g. [1, 2, 3, 4] -> [[1, 2], [3, 4]].
 *
 * @template T
 * @param {T[]} array
 * @param {number} cols
 * @returns {T[][]}
 */
export function arrayToMatrix(array, cols) {
  return array.reduce((rows, key, index) => (
    index % cols === 0
      ? rows.push([key])
      : rows[rows.length - 1].push(key)
  ) && rows, []);
}

/**
 * Generate all required cell values for level.
 *
 * @param {number} difficultyNumber
 * @returns {number[]}
 */
export function generateCellValues(difficultyNumber) {
  const difficulty = DIFFICULTIES[difficultyNumber];
  const totalCells = difficulty.rows * difficulty.cols;

  const cellValues = new Set();

  while (cellValues.size !== totalCells)  {
    const number = Math.floor(Math.random() * Math.pow(10, difficulty.numberLength));
    if (String(number).length === difficulty.numberLength) {
      cellValues.add(number);
    }
  }

  return [...cellValues];
}

/**
 * Generate `numberToPick` and `grid` for the next level.
 *
 * @param {number} difficultyNumber
 * @returns {Level}
 */
export function generateLevel(difficultyNumber) {
  const difficulty = DIFFICULTIES[difficultyNumber];
  const cellValues = generateCellValues(difficultyNumber);
  console.log(cellValues)

  /** @type {GridCell[]} */
  const cells = [];

  for (let i = 0; i < difficulty.rows; ++i) {
    for (let j = 0; j < difficulty.cols; ++j) {
      cells.push({
        row: i,
        col: j,
        value: cellValues[i * difficulty.cols + j],
        color: sample(Object.keys(COLORS)),
        animation: "none",
      });
    }
  }

  console.log("cells", cells)

  return {
    numberToFind: sample(cellValues),
    grid: arrayToMatrix(cells, difficulty.cols),
  };
}
