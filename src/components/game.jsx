// @ts-check

"use client";

import css from "./game.module.css";

import { COLORS, INITIAL_GAME_STATE } from "@/lib/constants";
import { Cell } from "@/components/cell";
import { generateLevel, nextDifficulty, sample } from "@/lib/functions";
import { useTypedReducer } from "@/lib/hooks";

/**
 * @param {GameState} state
 * @param {Action} action
 * @returns {GameState}
 */
function reducer(state, action) {
  if (action.type === "response") {
    const cell = state.level.grid[action.payload.row][action.payload.col];

    const correctPick = cell.value === state.level.numberToFind;
    const isTutorial = state.level.levelNumber === 0;

    // happy path
    if (correctPick || isTutorial) {
      const nextDifficultyNumber = nextDifficulty(state.level.levelNumber, state.difficultyNumber);

      return {
        backgroundColor: sample(Object.keys(COLORS)),
        level: generateLevel(state.level.levelNumber + 1, nextDifficultyNumber),
        difficultyNumber: nextDifficultyNumber,
        bonus: (state.bonus + 1) > 5 ? 5 : state.bonus + 1,
      };
    }

    // strike path
    return {
      backgroundColor: sample(Object.keys(COLORS)),
      level: generateLevel(state.level.levelNumber, state.difficultyNumber),
      difficultyNumber: state.difficultyNumber,
      bonus: (state.bonus - 1) < 1 ? 1 : state.bonus - 1,
    };
  }
}

export function Game() {
  const [state, dispatch] = useTypedReducer(reducer, INITIAL_GAME_STATE);

  /**
   * @param {number} row
   * @param {number} col
   */
  function handleResponse(row, col) {
    dispatch({
      type: "response",
      payload: {
        row: row,
        col: col,
      },
    });
  }

  return (
    <div
      className={css["game"]}
      style={{ backgroundColor: COLORS[state.backgroundColor] }}
    >
      <div className={css["game__info-container"]}>
        <p className={css["game-info__status"]}>
          Level: {state.level.levelNumber}
        </p>
        <p className={css["game-info__status"]}>
          Difficulty: {state.difficultyNumber}
        </p>
        <p className={css["game-info__status"]}>
          Bonus: x{state.bonus}
        </p>
      </div>
      <div className={css["game__field"]}>
        <div className={css["game-field__number-to-find-container"]}>
          <p className={css["number-to-find-container__text"]}>
            Find number:
          </p>
          <p className={css["number-to-find-container__value"]}>
            {state.level.numberToFind}
          </p>
        </div>
        <div
          className={css["game-field__grid"]}
          style={{ gridTemplateColumns: `repeat(${state.level.grid[0].length}, 1fr)` }}
        >
          {state.level.grid.flat().map(cell => (
            <Cell
              cell={cell}
              handleResponse={handleResponse}
              key={cell.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
