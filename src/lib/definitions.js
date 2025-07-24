// @ts-check

/** @typedef { "blue" | "green" | "orange" | "purple" | "red" } Color */

/** @type {Object.<Color, string>} */
export const COLORS = {
  "blue": "#a0c6f6",
  "green": "#b8e6a9",
  "orange": "#f1b971",
  "purple": "#c2acf1",
  "red": "#f39d9d",
};

/** @typedef { "none" | "scale" | "tilt" | "pulse" } Animation */

/**
 * @typedef {Object} GridCell
 * @property {number} value
 * @property {Color} color
 * @property {Animation} animation
 */

/** @typedef {GridCell[][]} Grid */

/** @type {Grid} */
export const TUTORIAL_CELL_GRID = [
  [
    { value: 75, color: "orange", animation: "none" },
    { value: 1, color: "red", animation: "none" },
    { value: 35, color: "purple", animation: "none" },
  ],
  [
    { value: 2, color: "green", animation: "none" },
    { value: 885, color: "green", animation: "none" },
    { value: 40, color: "blue", animation: "none" },
  ],
];

/**
 * @typedef {Object} Difficulty
 * @property {number} rows
 * @property {number} cols
 * @property {number} numberLength
 * @property {boolean} animationsOn
 **/

/** @type {Object.<number, Difficulty>} */
export const DIFFICULTIES = {
  // tutorial difficulty, predefined numbers of different lengths
  0: { rows: 2, cols: 3, numberLength: -1, animationsOn: false },
  // game difficulties
  1: { rows: 2, cols: 3, numberLength: 1, animationsOn: false },
  2: { rows: 2, cols: 3, numberLength: 2, animationsOn: false },
  3: { rows: 2, cols: 3, numberLength: 3, animationsOn: true },
  4: { rows: 3, cols: 4, numberLength: 3, animationsOn: true },
  5: { rows: 4, cols: 4, numberLength: 3, animationsOn: true },
  6: { rows: 4, cols: 4, numberLength: 4, animationsOn: true },
  7: { rows: 5, cols: 5, numberLength: 4, animationsOn: true },
};

/**
 * @typedef {Object} GameState
 * @property {Color} backgroundColor
 * @property {Grid} cellGrid
 * @property {number} difficultyLevel
 * @property {number} strikes
 */

/** @type {GameState} */
export const INITIAL_GAME_STATE = {
  backgroundColor: "blue",
  cellGrid: TUTORIAL_CELL_GRID,
  difficultyLevel: 0,
  strikes: 0,
};
