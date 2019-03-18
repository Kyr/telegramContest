export default getBounds;

/**
 *
 * @param {[number]} numbers
 */
function getBounds (numbers) {
  return numbers.reduce(boundReducer, [Infinity, -Infinity])
}

function boundReducer ([min, max], number) {
  return [Math.min(min, number), Math.max(max, number)];
}
