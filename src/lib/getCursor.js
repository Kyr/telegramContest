/**
 * @typedef {Array} DataSet
 * @property {number} key
 * @property {number} value
 */

/**
 * @typedef {Object} Cursor
 * @property {number} lowBound
 * @property {number} topBound
 * @property {number} leftBound
 * @property {number} rightBound
 * @property {DataSet[]} dataSet
 */


export default function getCursor (dataSet) {
  const cursor = {
    lowBound:   Infinity,
    topBound:   -Infinity,
    leftBounds: Infinity,
    rightBound: -Infinity,
  };

  return dataSet.reduce(reducer, cursor)
}

/**
 *
 * @param {Cursor} cursor
 * @param {DataSet} dataItem
 * @return {{}}
 */
function reducer (cursor, dataItem) {
  const [key, value] = dataItem;
  const {
          lowBound,
          topBound,
          leftBound,
          rightBound,
//          dataSet,
        }            = cursor;

  return {
    lowBound:   Math.min(lowBound, key),
    topBound:   Math.max(topBound, key),
    leftBound:  Math.min(leftBound, value),
    rightBound: Math.max(rightBound, value),
//    dataSet:    dataSet.concat(dataItem),
  }
}
