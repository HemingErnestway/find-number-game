// @ts-check

/** @typedef { "blue" | "green" | "orange" | "purple" | "red" } GameColor */
/** @typedef { "scale" | "tilt" | "pulse" } GameAnimation */

/**
 * @typedef {Object} GridCell
 * @property {number} row
 * @property {number} col
 * @property {number} value
 * @property {GameColor} color
 * @property {GameAnimation | null} animation
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

/** @typedef { "welcome" | "tutorial" | "countdown" | "game" | "results" } GameScreen */

/**
 * @typedef {Object} GameState
 * @property {GameColor} backgroundColor
 * @property {Level} level
 * @property {number} difficultyNumber
 * @property {number} bonus
 */

/**
 * @typedef {Object} Payload
 * @property {number} row
 * @property {number} col
 * @property {number} timeLeft
 */

/**
 * @typedef {Object} Action
 * @property {"response"} type
 * @property {Payload} payload
 */

/** @typedef { "tutorial" | number[] | "endless" } LevelSpan */
