import css from "./tutorial-screen.module.css";

import { INITIAL_GAME_STATE } from "@/lib/constants";
import { GameScreen } from "@/components/game-screen";

/**
 * @typedef {Object} TutorialScreenProps
 * @property {() => GameScreen} nextScreen
 */

/** @param {TutorialScreenProps} props */
export function TutorialScreen({ nextScreen }) {
  return (
    <>
      <div className={css["tutorial__overlay"]} onClick={nextScreen}>
        <div className={css["tutorial__hand"]}></div>
      </div>
      <GameScreen
        gameState={INITIAL_GAME_STATE}
        timeLeft={60}
        handleResponse={null}
      />
    </>
  );
}
