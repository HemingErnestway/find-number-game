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
 * @typedef {Object} Level
 * @property {number} levelNumber
 * @property {number} numberToFind
 * @property {Grid} grid
 */

/**
 * @typedef {Object} GameState
 * @property {Color} backgroundColor
 * @property {Level} level
 * @property {number} difficultyNumber
 * @property {number} bonus
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

/** @typedef { "tutorial" | number[] | "endless" } LevelSpan */
