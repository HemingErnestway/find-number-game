// @ts-check

import css from "./game-screen.module.css";
import Checkmark from "../../public/checkmark-circle.svg";
import Cross from "../../public/cross-circle.svg";
import Image from "next/image";

import { COLORS } from "@/lib/constants";
import { formatTime } from "@/lib/functions";
import { Cell } from "@/components/cell";
import { useEffect } from "react";

/**
 * @typedef {Object} GameScreenProps
 * @property {GameState} gameState
 * @property {number} timeLeft
 * @property {function(number, number): void} handleResponse
 * @property {() => void} startGameTimer
 * @property {boolean} animate
 * @property {boolean} correct
 * @property {() => GameScreen} nextScreen
 */

/** @param {GameScreenProps} props */
export function GameScreen({ gameState, timeLeft, handleResponse, startGameTimer, animate, correct, nextScreen }) {
  const splashIconAnimation = correct ? css["animate--throb"] : css["animate--shake"];

  useEffect(() => { startGameTimer && startGameTimer() }, []);
  useEffect(() => { gameState.gameOver && nextScreen() }, [gameState]);

  return (
    <>
      <div className={`${css["game__splash-icon"]} ${animate ? splashIconAnimation : ""}`}>
        {correct
          ? <Image src={Checkmark} alt="Correct" width={100} height={100} />
          : <Image src={Cross} alt="Wrong" width={100} height={100} />
        }
      </div>
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
        <div className={css["game__number-to-find-container"]}>
          <p className={css["number-to-find-container__text"]}>
            Find number:
          </p>
          <p className={`${css["number-to-find-container__value"]} ${animate ? css["animate--slide"] : ""}`}>
            {gameState.level.numberToFind}
          </p>
        </div>
        <div className={css["game__field"]}>
          <div
            className={`${css["game-field__grid"]} ${animate ? css["animate--slide"] : ""}`}
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
    </>
  );
}