import React from 'react';
import createPathBuilder from "./createPathBuilder";
import getBounds from "../lib/getBounds";

export default DrawCharts;

function DrawCharts ({width, height, getX, getOrdinates, leftBound, rightBound}) {
  if (!width) return null;

  const ordinates = getOrdinates(leftBound, rightBound);

  const [yMin, yMax] = getBounds(ordinates.reduce((all, [name,,y]) => all.concat(y), []));

  const pathBuilder = createPathBuilder(yMin,yMax, rightBound - leftBound, height, width);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
{/*
      <Axises {...{width, height, yMin, yMax, leftBound, rightBound}} />
*/}
      {
        ordinates.map(([name, stroke, y]) => {
//                  const y = dataSets.get(name).slice(leftBound).slice(0, rightBound-leftBound);
          return (
            <path key={name} d={pathBuilder(y)} fill="none" strokeWidth={2} stroke={stroke}/>
          )
        })
      }
      <path d={`M 0,${yMax - 15} H${width}`} stroke="silver"/>

{/*
      {tooltip && <DisplayHoverAbscissa {...tooltip} />}
*/}
    </svg>
  );
}

