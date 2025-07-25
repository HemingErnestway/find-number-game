// @ts-check

/** @type {Record.<GameColor, string>} */
export const COLORS = {
  "blue": "#3c527a",
  "green": "#3b7139",
  "orange": "#805d3c",
  "purple": "#633e78",
  "red": "#8e485c",
};

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

/** @type {Record.<number, LevelSpan>} */
export const DIFFICULTY_LEVEL_SPAN = {
  0: "tutorial",
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
    levelNumber: 0,
    numberToFind: 75,
    grid: TUTORIAL_CELL_GRID,
  },
  difficultyNumber: 0,
  bonus: 1,
};

/** @type {Record.<GameAnimation, CellAnimationGSAP>} */
export const ANIMATION_TWEEN_VARS = {
  "scale": {
    target: "cell",
    fromVars: {},
    toVars: {
      scale: 0.5,
      ease: "power1.in",
      duration: 0.4,
      repeat: -1,
      yoyo: true,
    },
  },
  "tilt": {
    target: "text",
    fromVars: {
      rotation: -15,
    },
    toVars: {
      rotation: 15,
      ease: "power1.inOut",
      duration: 0.2,
      repeat: -1,
      yoyo: true,
    },
  },
  "pulse": {
    target: "cell",
    fromVars: {},
    toVars: {
      opacity: 0,
      ease: "power1.in",
      duration: 0.4,
      repeat: -1,
      yoyo: true,
    },
  },
};
