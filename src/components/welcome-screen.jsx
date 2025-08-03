// @ts-check

import css from "./welcome-screen.module.css";

/**
 * @typedef {Object} WelcomeScreenProps
 * @property {() => GameScreen} nextScreen
 */

/** @param {WelcomeScreenProps} props */
export function WelcomeScreen({ nextScreen }) {
  const trainList = [
    {
      statement: "Произвольное внимание",
      description: "Научитесь концентрировать внимание только на важном",
    },
    {
      statement: "Концентрацию и переключение внимания",
      description: "Позволит не упускать из виду важные детали",
    },
    {
      statement: "Зрительное восприятие",
      description: "Сможете быстро находить основные мысли в текстах",
    },
  ];

  return (
    <div className={css["welcome-screen"]}>
      <div className={css["welcome-screen__header"]}>
        <h1 className={css["welcome-screen__title"]}>
          Найди число
        </h1>
        <p className={css["welcome-screen__subtitle"]}>
          Тренажёр на внимательность
        </p>
      </div>
      <div className={css["welcome-screen__content"]}>
        <h2 className={css["train-list__title"]}>
          Тренирует:
        </h2>
        <ul className={css["train-list"]}>
          {trainList.map(item => (
            <li className={css["train-list__item"]} key={item.statement}>
              <p className={css["train-list-item__statement"]}>{item.statement}</p>
              <p className={css["train-list-item__description"]}>{item.description}</p>
            </li>
          ))}
        </ul>
        <button onClick={nextScreen}>
          Начать
        </button>
      </div>
    </div>
  );
}
