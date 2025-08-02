// @ts-check

"use client";

import { useEffect, useState } from "react";

import { COLORS } from "@/lib/constants";
import { generateLevel, initGameState, nextDifficulty, sample } from "@/lib/functions";
import { useTypedReducer, useTimer } from "@/lib/hooks";

import { WelcomeScreen } from "@/components/welcome-screen";
import { TutorialScreen } from "@/components/tutorial-screen";
import { CountdownScreen} from "@/components/countdown-screen";
import { GameScreen } from "@/components/game-screen";
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
  const initialScreen = "welcome";
  const [screen, setScreen] = useState(initialScreen);

  useEffect(() => {
    if (state.gameOver) {
      setScreen("results");
    }
  }, [state]);

  const [timeRemaining, startTimer] = useTimer(60);

  useEffect(() => {
    if (screen === "game") {
      startTimer();
    }
  }, [screen]);

  const [animate, setAnimate] = useState(false);
  const [correct, setCorrect] = useState(true);

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
        timeLeft: timeRemaining,
      },
    });

    setCorrect(state.level.grid[row][col].value === state.level.numberToFind);
    setAnimate(false);
    requestAnimationFrame(() => setAnimate(true));
  }

  function handleRestart() {
    dispatch({
      type: "restart",
      payload: {
        gameState: initGameState(),
      },
    });
    setScreen("welcome");
  }

  return (
    <>
      {screen === "welcome" && (
        <WelcomeScreen nextScreen={() => setScreen("tutorial")} />
      )}

      {screen === "tutorial" && (
        <TutorialScreen nextScreen={() => setScreen("countdown")} />
      )}

      {screen === "countdown" && (
        <CountdownScreen nextScreen={() => setScreen("game")} />
      )}

      {screen === "game" && (
        <GameScreen
          gameState={state}
          timeLeft={timeRemaining}
          handleResponse={handleResponse}
          animate={animate}
          correct={correct}
        />
      )}

      {screen === "results" && (
        <ResultsScreen handleRestart={handleRestart} />
      )}
    </>
  );
}
