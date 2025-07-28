// @ts-check

"use client";

import { useEffect, useState } from "react";

import { COLORS } from "@/lib/constants";
import { generateLevel, initGameState, nextDifficulty, sample } from "@/lib/functions";
import { useTypedReducer } from "@/lib/hooks";

import { WelcomeScreen } from "@/components/welcome-screen";
import { GameScreen } from "@/components/game-screen";
import { TutorialScreen } from "@/components/tutorial-screen";
import { ResultsScreen } from "@/components/results-screen";

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
      const nextDifficultyNumber = nextDifficulty(
        state.level.levelNumber,
        state.difficultyNumber,
        "happy",
      );

      return {
        backgroundColor: sample(Object.keys(COLORS)),
        level: generateLevel(state.level.levelNumber + 1, nextDifficultyNumber),
        difficultyNumber: nextDifficultyNumber,
        bonus: (state.bonus + 1) > 5 ? 5 : state.bonus + 1,
        gameOver: action.payload.timeLeft === 0,
      };
    }

    // strike path
    const nextDifficultyNumber = nextDifficulty(
      state.level.levelNumber,
      state.difficultyNumber,
      "strike",
    );

    return {
      backgroundColor: sample(Object.keys(COLORS)),
      level: generateLevel(state.level.levelNumber - 1 || 1, nextDifficultyNumber),
      difficultyNumber: nextDifficultyNumber,
      bonus: state.bonus - 1 || 1,
      gameOver: action.payload.timeLeft === 0,
    };
  }

  if (action.type === "restart") {
    return { ...action.payload.gameState };
  }
}

export function Game() {
  const [state, dispatch] = useTypedReducer(reducer, initGameState());

  /** @type {GameScreen} */
  const  initialScreen = "welcome";
  const [screen, setScreen] = useState(initialScreen);

  useEffect(() => {
    if (state.gameOver) {
      setScreen("results");
    }
  }, [state]);

  const [timeSeconds, setTimeSeconds] = useState(10);

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

  function handleRestart() {
    dispatch({
      type: "restart",
      payload: {
        gameState: initGameState(),
      },
    });
    setScreen("welcome");
    setTimeSeconds(10);
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
        <ResultsScreen
          handleRestart={handleRestart}
        />
      )}
    </>
  );
}
