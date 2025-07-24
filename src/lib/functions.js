// @ts-check

/**
 * Pick a random value from array.
 *
 * @template T
 * @param {T[]} array
 * @returns {T}
 */
export function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}
