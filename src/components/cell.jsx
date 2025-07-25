// @ts-check

"use client";

import css from "./cell.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import { ANIMATION_TWEEN_VARS, COLORS } from "@/lib/constants";

gsap.registerPlugin(useGSAP);

/**
 * @typedef {Object} CellParams
 * @property {GridCell} cell
 * @property {function(number, number): void} handleResponse
 */

/** @param {CellParams} params */
export function Cell({ cell, handleResponse }) {
  const cellRef = useRef(null);
  const textRef = useRef(null);

  if (cell.animation !== null) {
    /** @type {CellAnimationGSAP} */
    const animation = ANIMATION_TWEEN_VARS[cell.animation];

    useGSAP(() => {
      gsap.fromTo(
        animation.target === "cell" ? cellRef.current : textRef.current,
        animation.fromVars,
        animation.toVars,
      );
    });
  }

  return (
    <div
      className={css["cell"]}
      style={{ backgroundColor: COLORS[cell.color] }}
      onClick={() => handleResponse(cell.row, cell.col)}
      ref={cellRef}
    >
      <span
        className={css["cell__text"]}
        ref={textRef}
      >
        {cell.value}
      </span>
    </div>
  );
}
