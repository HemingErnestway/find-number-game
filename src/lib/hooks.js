// @ts-check

import { useReducer } from "react";

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
