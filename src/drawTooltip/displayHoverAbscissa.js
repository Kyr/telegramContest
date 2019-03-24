import React from 'react';

export default DisplayHoverAbscissa;

/**
 * @todo Scale not very nice
 * @param x
 * @param xLabel
 * @param height
 * @param dots
 * @return {*}
 * @constructor
 */
function DisplayHoverAbscissa ({x, xLabel, height, dots, yMin,
                                 yDelta,}) {
  const d = `M ${x},0 V ${height}`;
  const ry = height / 100;

  return (
    <g>
      <path d={d} stroke="lightgrey"/>
      {/*
      // No way: it broken after latest changes
        dots.map(([name, stroke, y]) => (
          <ellipse key={name} stroke={stroke} cx={x} cy={(1 - (y - yMin) / yDelta) * height} rx="3" ry={ry} fill="white"/>
        ))
      */}
    </g>
  );
}

