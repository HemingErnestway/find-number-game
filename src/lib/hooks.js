// @ts-check

import { useReducer, useState, useRef, useCallback, useEffect } from "react";

/**
 * @template S
 * @template A
 * @param {(state: S, action: A) => S} reducer
 * @param {S} initialState
 * @returns {[S, (action: A) => void]}
 */
export function useTypedReducer(reducer, initialState) {
  return useReducer(reducer, initialState);
}

/**
 * @param {number} durationSec
 * @returns {[]}
 */
export function useTimer(durationSec) {
  const [timeRemaining, setTimeRemaining] = useState(durationSec);
  const startTimeRef = useRef(null);
  const animationRef = useRef(null);

  const updateTimer = useCallback(() => {
    const timePassed =
      Math.floor((Date.now() - startTimeRef.current) / 1000);

    const timeLeft = Math.max(durationSec - timePassed, 0);

    setTimeRemaining(timeLeft);

    if (timeLeft > 0) {
      animationRef.current = requestAnimationFrame(updateTimer);
    }
  }, [durationSec]);

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    cancelAnimationFrame(animationRef.current);
    updateTimer();
  }, [updateTimer]);

  useEffect(() => {
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return [timeRemaining, startTimer];
}
