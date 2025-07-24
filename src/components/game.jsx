// @ts-check

"use client";

import css from "./game.module.css";
import { useReducer } from "react";

import { COLORS, INITIAL_GAME_STATE } from "@/lib/definitions";
import { sample } from "@/lib/functions";
import { Cell } from "@/components/cell";

function reducer(state, action) {
  if (action.type === "change_background") {
    return sample(Object.values(COLORS));
  }
}

export function Game() {
  const [state, dispatch] = useReducer(reducer, INITIAL_GAME_STATE, undefined);

  return (
    <div
      className={css.game}
      style={{ backgroundColor: COLORS[state.backgroundColor] }}
    >
      <div
        className={css.grid}
        style={{ gridTemplateColumns: `repeat(${state.cellGrid[0].length}, 1fr)` }}
      >
        {state.cellGrid.flat().map(cell => (
          <Cell
            value={cell.value}
            color={cell.color}
            key={cell.value}
          />
        ))}
      </div>
    </div>
  );
}
