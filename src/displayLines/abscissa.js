import React from "react";
import formatDate from "../lib/formatDate";

const fontSize = 15;

export default abscissa;

function abscissa ({leftBound, rightBound, getX, width}) {
  if (!width) {
    return null;
  }
  const abscissas = getX();

  const xDelta = rightBound - leftBound;
  const step = Math.max(1, Math.round(0.2 * xDelta));

  const labels = new Array(6).fill(leftBound)
    .map((value, index) => value + step * index);

  return (
    <svg viewBox={`0 0 ${width} 20`}>
      {
        labels.map((labelIndex, index) => (
      <text x={50 + index * 300} y={18} fontSize={fontSize}>{formatDate(abscissas[labelIndex])}</text>

        ))
      }
    </svg>
  )
}
