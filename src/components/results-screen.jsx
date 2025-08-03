// @ts-check

import css from "./welcome-screen.module.css";

/**
 * @typedef {Object} ResultsScreenProps
 * @property {() => void} handleRestart
 */

/** @type {ResultsScreenProps} props */
export function ResultsScreen({ handleRestart }) {
  return (
    <div className={css["welcome-screen"]}>
      <div className={css["welcome-screen__header"]}>
        <h1 className={css["welcome-screen__title"]}>
          Ваши результаты
        </h1>
      </div>
      <div className={css["welcome-screen__content"]}>
        <ul className={css["train-list"]}>
        </ul>
        <button onClick={handleRestart}>
          Начать заново
        </button>
      </div>
    </div>
  );
}
