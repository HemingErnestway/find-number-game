// @ts-check

import css from "./cell.module.css";
import { COLORS } from "@/lib/constants";

/**
 * @typedef {Object} CellParams
 * @property {GridCell} cell
 * @property {function(number, number): void} handleResponse
 */

/** @param {CellParams} params */
export function Cell({ cell, handleResponse }) {
  return (
    <div
      className={css["cell"]}
      style={{ backgroundColor: COLORS[cell.color] }}
      onClick={() => handleResponse(cell.row, cell.col)}
    >
      {cell.value}
    </div>
  );
}
