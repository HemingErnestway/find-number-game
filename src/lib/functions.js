// @ts-check

import { ANIMATIONS, COLORS, DIFFICULTIES, DIFFICULTY_LEVEL_SPAN } from "@/lib/constants";

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
 * Get next `difficultyNumber` value.
 *
 * @param {number} difficultyNumber
 * @param {number} levelNumber
 * @param { "happy" | "strike" } path
 * @returns {number}
 */
export function nextDifficulty(levelNumber, difficultyNumber, path) {
  if (DIFFICULTY_LEVEL_SPAN[difficultyNumber] === "endless") {
    switch (path) {
      case "happy": return 7; // stay
      case "strike": return 6; // decrease
    }
  }

  const nextLevelNumber = levelNumber + (path === "happy" ? 1 : -1);

  if (DIFFICULTY_LEVEL_SPAN[difficultyNumber].includes(nextLevelNumber)) {
    return difficultyNumber; // stay if levels use same difficulty
  }

  switch (path) {
    case "happy": return difficultyNumber + 1; // increase
    case "strike": return difficultyNumber - 1 || 1; // decrease
  }
}

/**
 * Generate `numberToPick` and `grid` for the next level.
 *
 * @param {number} levelNumber
 * @param {number} difficultyNumber
 * @returns {Level}
 */
export function generateLevel(levelNumber, difficultyNumber) {
  const difficulty = DIFFICULTIES[difficultyNumber];
  const cellValues = generateCellValues(difficultyNumber);

  /** @type {GridCell[]} */
  const cells = [];

  for (let i = 0; i < difficulty.rows; ++i) {
    for (let j = 0; j < difficulty.cols; ++j) {
      cells.push({
        row: i,
        col: j,
        value: cellValues[i * difficulty.cols + j],
        color: sample(Object.keys(COLORS)),
        animation: difficulty.animationsOn ? sample(ANIMATIONS) : null,
      });
    }
  }

  return {
    levelNumber: levelNumber,
    numberToFind: sample(cellValues),
    grid: arrayToMatrix(cells, difficulty.cols),
  };
}

/**
 * Formats number of seconds as `123:56` string.
 *
 * @param {number} seconds
 * @returns {string}
 */
export function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}
