// @ts-check

/** @type {Record.<Color, string>} */
export const COLORS = {
  "blue": "#a0c6f6",
  "green": "#b8e6a9",
  "orange": "#f1b971",
  "purple": "#c2acf1",
  "red": "#f39d9d",
};

/** @type {Grid} */
export const TUTORIAL_CELL_GRID = [
  [
    { row: 0, col: 0, value: 75, color: "orange", animation: "none" },
    { row: 0, col: 1, value: 1, color: "red", animation: "none" },
    { row: 0, col: 2, value: 35, color: "purple", animation: "none" },
  ],
  [
    { row: 1, col: 0, value: 2, color: "green", animation: "none" },
    { row: 1, col: 1, value: 885, color: "green", animation: "none" },
    { row: 1, col: 2, value: 40, color: "blue", animation: "none" },
  ],
];

/** @type {Record.<number, Difficulty>} */
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

/** @type {GameState} */
export const INITIAL_GAME_STATE = {
  backgroundColor: "blue",
  level: {
    numberToFind: 75,
    grid: TUTORIAL_CELL_GRID,
  },
  difficultyNumber: 0,
  strikes: 0,
};
