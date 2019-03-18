export default toPolyline;

/**
 *
 * @param {Chart} chart
 * @return {{color: string, name: string, points: (function(*=, *): *)}[]}
 */
function toPolyline (chart) {
  const {
    names,
    colors,
    columns,
    types,
  } = chart;

  const valueMaps = columns.reduce((valueMap, [name, ...values]) => valueMap.set(name, values), new Map());
  const generator = createGenerator(valueMaps.get(types.x));

  return Object.entries(names).map(([key, name]) => {
    const values = valueMaps.get(key);

    return {
      name,
      color:  colors[key],
      points: generator(values),
    }
  });
}

/**
 *
 * @param {[number]} abscissas
 * @return {function(*): function(*=, *): *}
 */
function createGenerator (abscissas) {
  return createGetPoints;

  /**
   *
   * @param {[number]} ordinates
   * @return {function(*=, *): [function]}
   */
  function createGetPoints (ordinates) {
    const pairs = abscissas
      .map((abscissa, index) => {
        return [abscissa, ordinates[index]] //
      });

    return getPoints;

    /**
     *
     * @param {number} [startAt=0]
     * @param {number} [endAt=void 0]
     * @return {[function(number, number): string]}
     */
    function getPoints (leftBound = 0, rightBound = 0) {
/*
      const {
        leftIndex = 0,
        rightIndex = void 0,
        top,
        bottom,
      } = bounds;
*/
      /*
            const yArea = top - bottom;
            const baseY = yArea + bottom;
      */
      /*
            const pairs = abscissas
              .map((abscissa, index) => {
                return (scaleX, scaleY) => [index * scaleX, scaleY * (top - ordinates[index])].join(',') //
              });

      */
      return pairs
//        .slice(leftBound)
//        .slice(0, -rightBound)
      ;
//        .map(([x, y], index) => (scaleX, scaleY) => [index * scaleX, scaleY * (top - y)])
//        .join(' ');
    }
  }
}
