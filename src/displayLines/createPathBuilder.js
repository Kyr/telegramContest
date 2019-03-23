export  default createPathBuilder;

function createPathBuilder(yMin, yMax, xLength, height, width){
  const yDelta = yMax - yMin;
  const yScale = height / yDelta;
  const xScale = width / xLength;

  return function (ordinates) {
    const [[x, y], ...rest] = ordinates.map((ordinate, index) => {
      return [index * xScale, (1 - (ordinate - yMin) / yDelta) * height]
    });

    return rest.reduce((d, [x, y]) => `${d} L ${x}, ${y}`, `M ${x},${y}`);
//    ordinates.reduce((d, ordinate, i) => {
//      return [i * xScale, ]
//    })
  }

}
