// @ts-check

/** @type {Record.<GameColor, string>} */
export const COLORS = {
  "blue": "#4db8ec",
  "green": "#94c94d",
  "orange": "#f28e37",
  "purple": "#8e3dcb",
  "red": "#fc73b0",
};

/** @type {GameAnimation[]} */
export const ANIMATIONS = ["scale", "pulse", "tilt"];

/** @type {Grid} */
export const TUTORIAL_CELL_GRID = [
  [
    { row: 0, col: 0, value: 75, color: "orange", animation: null },
    { row: 0, col: 1, value: 1, color: "red", animation: null },
    { row: 0, col: 2, value: 35, color: "purple", animation: null },
  ],
  [
    { row: 1, col: 0, value: 2, color: "green", animation: null },
    { row: 1, col: 1, value: 885, color: "green", animation: null },
    { row: 1, col: 2, value: 40, color: "blue", animation: null },
  ],
];

/** @type {Record.<number, Difficulty>} */
export const DIFFICULTIES = {
  // game difficulties
  1: { rows: 2, cols: 3, numberLength: 1, animationsOn: false },
  2: { rows: 2, cols: 3, numberLength: 2, animationsOn: false },
  3: { rows: 2, cols: 3, numberLength: 3, animationsOn: true },
  4: { rows: 3, cols: 4, numberLength: 3, animationsOn: true },
  5: { rows: 4, cols: 4, numberLength: 3, animationsOn: true },
  6: { rows: 4, cols: 4, numberLength: 4, animationsOn: true },
  7: { rows: 5, cols: 5, numberLength: 4, animationsOn: true },
};

/** @type {Record.<number, LevelSpan>} */
export const DIFFICULTY_LEVEL_SPAN = {
  1: [1],
  2: [2],
  3: [3],
  4: [4, 5],
  5: [6],
  6: [7],
  7: "endless",
};

/** @type {GameState} */
export const INITIAL_GAME_STATE = {
  backgroundColor: "blue",
  level: {
    levelNumber: 1,
    numberToFind: 75,
    grid: TUTORIAL_CELL_GRID,
  },
  difficultyNumber: 1,
  bonus: 1,
  gameOver: false,
};
