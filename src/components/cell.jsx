// @ts-check

"use client";

import css from "./cell.module.css";
import { COLORS } from "@/lib/constants";

/**
 * @typedef {Object} CellParams
 * @property {GridCell} cell
 * @property {function(number, number): void} handleResponse
 */

/** @param {CellParams} params */
export function Cell({ cell, handleResponse }) {
  const cellAnimation =
    cell.animation === "scale" ? "cell__animation--scale" :
    cell.animation === "pulse" ? "cell__animation--pulse" : "";

  const cellTextAnimation =
    cell.animation === "tilt" ? "cell-text__animation--tilt" : "";

  return (
    <div
      className={`${css["cell"]} ${css[cellAnimation]}`}
      style={{ backgroundColor: COLORS[cell.color] }}
      onClick={() => handleResponse(cell.row, cell.col)}
    >
      <span className={`${css["cell__text"]} ${css[cellTextAnimation]}`}>
        {cell.value}
      </span>
    </div>
  );
}
