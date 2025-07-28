// @ts-check

"use client";

import { useEffect, useState } from "react";

import { COLORS, INITIAL_GAME_STATE } from "@/lib/constants";
import { generateLevel, nextDifficulty, sample } from "@/lib/functions";
import { useTypedReducer } from "@/lib/hooks";
import { WelcomeScreen } from "@/components/welcome-screen";
import { GameScreen } from "@/components/game-screen";
import { TutorialScreen } from "@/components/tutorial-screen";

/**
 * @param {GameState} state
 * @param {Action} action
 * @returns {GameState}
 */
function reducer(state, action) {
  if (action.type === "response") {
    const cell = state.level.grid[action.payload.row][action.payload.col];

    // happy path
    if (cell.value === state.level.numberToFind) {
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
  const [state, dispatch] = useTypedReducer(reducer, {
    backgroundColor: sample(Object.keys(COLORS)),
    level: generateLevel(1, 1),
    difficultyNumber: 1,
    bonus: 1,
  });

  const [timeSeconds, setTimeSeconds] = useState(60);

  /** @type {GameScreen} */
  const  initialScreen = "welcome";
  const [screen, setScreen] = useState(initialScreen);

  useEffect(() => {
    if (screen !== "game") return;

    const interval = setInterval(() => {
      setTimeSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [screen]);

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
        timeLeft: timeSeconds,
      },
    });
  }

  return (
    <>
      {screen === "welcome" && (
        <WelcomeScreen
          nextScreen={() => setScreen("tutorial")}
        />
      )}

      {screen === "tutorial" && (
        <TutorialScreen
          nextScreen={() => setScreen("game")}
        />
      )}

      {screen === "countdown" && (
        "countdown"
      )}

      {screen === "game" && (
        <GameScreen
          gameState={state}
          timeLeft={timeSeconds}
          handleResponse={handleResponse}
        />
      )}

      {screen === "results" && (
        "results"
      )}
    </>
  );
}
