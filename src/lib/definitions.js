// @ts-check

/** @typedef { "blue" | "green" | "orange" | "purple" | "red" } Color */
/** @typedef { "none" | "scale" | "tilt" | "pulse" } Animation */

/**
 * @typedef {Object} GridCell
 * @property {number} row
 * @property {number} col
 * @property {number} value
 * @property {Color} color
 * @property {Animation} animation
 */

/** @typedef {GridCell[][]} Grid */

/**
 * @typedef {Object} Difficulty
 * @property {number} rows
 * @property {number} cols
 * @property {number} numberLength
 * @property {boolean} animationsOn
 **/

/**
 * @typedef {Object} GameState
 * @property {Color} backgroundColor
 * @property {number} numberToFind
 * @property {Grid} cellGrid
 * @property {number} difficultyLevel
 * @property {number} strikes
 */

/**
 * @typedef {Object} Payload
 * @property {number} row
 * @property {number} col
 */

/**
 * @typedef {Object} Action
 * @property {"response"} type
 * @property {Payload} payload
 */
