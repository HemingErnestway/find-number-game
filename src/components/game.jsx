// @ts-check

"use client";

import css from "./game.module.css";

import { COLORS, INITIAL_GAME_STATE } from "@/lib/constants";
import { Cell } from "@/components/cell";
import { sample } from "@/lib/functions";
import { useTypedReducer } from "@/lib/hooks";

/**
 * @param {GameState} state
 * @param {Action} action
 * @returns {GameState}
 */
function reducer(state, action) {
  if (action.type === "response") {
    return {
      ...state,
      backgroundColor: sample(Object.keys(COLORS)),
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
          Strikes: {state.strikes}
        </p>
        <p className={css["game-info__status"]}>
          Difficulty: {state.difficultyLevel}
        </p>
      </div>
      <div className={css["game__field"]}>
        <div className={css["game-field__number-to-find-container"]}>
          <p className={css["number-to-find-container__text"]}>
            Find number:
          </p>
          <p className={css["number-to-find-container__value"]}>
            {state.numberToFind}
          </p>
        </div>
        <div
          className={css["game-field__grid"]}
          style={{ gridTemplateColumns: `repeat(${state.cellGrid[0].length}, 1fr)` }}
        >
          {state.cellGrid.flat().map(cell => (
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
