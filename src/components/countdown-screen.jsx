// @ts-check

import css from "./countdown-screen.module.css";
import { useEffect } from "react";
import { useTimer } from "@/lib/hooks";

/**
 * @typedef {Object} CountdownScreenProps
 * @property {() => GameScreen} nextScreen
 */

/** @param {CountdownScreenProps} props */
export function CountdownScreen({ nextScreen }) {
  const [timeRemaining, startTimer] = useTimer(3);

  useEffect(() => startTimer(), []);

  useEffect(() => {
    if (timeRemaining === 0) {
      nextScreen();
    }
  }, [timeRemaining]);

  return (
    <div className={css["countdown-screen"]}>
      <div className={css["countdown__time-container"]}>
        <div className={css["countdown__time-value"]}>
          {timeRemaining}
        </div>
      </div>
    </div>
  );
}
