import css from "./game-screen.module.css";

import { COLORS } from "@/lib/constants";
import { formatTime } from "@/lib/functions";
import { Cell } from "@/components/cell";

/**
 * @typedef {Object} GameScreenProps
 * @property {GameState} gameState
 * @property {number} timeLeft
 * @property {function(number, number): void} handleResponse
 */

/** @param {GameScreenProps} props */
export function GameScreen({ gameState, timeLeft, handleResponse }) {
  return (
    <div
      className={css["game"]}
      style={{ backgroundColor: COLORS[gameState.backgroundColor] }}
    >
      <div className={css["game__info-container"]}>
        <p className={css["game-info__status"]}>
          Time: {formatTime(timeLeft)}
        </p>
        <p className={css["game-info__status"]}>
          Level: {gameState.level.levelNumber}
        </p>
        <p className={css["game-info__status"]}>
          Difficulty: {gameState.difficultyNumber}
        </p>
        <p className={css["game-info__status"]}>
          Bonus: x{gameState.bonus}
        </p>
      </div>
      <div className={css["game__field"]}>
        <div className={css["game-field__number-to-find-container"]}>
          <p className={css["number-to-find-container__text"]}>
            Find number:
          </p>
          <p className={css["number-to-find-container__value"]}>
            {gameState.level.numberToFind}
          </p>
        </div>
        <div
          className={css["game-field__grid"]}
          style={{ gridTemplateColumns: `repeat(${gameState.level.grid[0].length}, 1fr)` }}
        >
          {gameState.level.grid.flat().map(cell => (
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