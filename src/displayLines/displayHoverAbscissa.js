import React from 'react';

export default DisplayHoverAbscissa;

function DisplayHoverAbscissa ({x, xLabel, height, dots}) {
  const d = `M ${x},0 V ${height}`;
const ry = height/100;
//const displayDate = new Date(xLabel).toLocaleDateString();
  return (
    <g>
      <path d={d} stroke="lightgrey"/>
      {/*<rect x={x+10} y={5} width={100} height={ry*20} rx={9} ry={ry*3} fill="white" stroke="lightgrey"/>*/}
      {/*<text x={x+15} y={ry*10} lengthAdjust="spacingAndGlyphs" textLength="100%">{displayDate}</text>*/}
      {/*<text x={x+15} y={ry*10}>{displayDate}</text>*/}
{/*
      {
        dots.map(([name, stroke, y], i) => (
<>
          <text x={15+x+50*i} y={ry*10 + ry*6} fill={stroke} fontSize={ry*7} fontWeight="bold">{y}</text>
          <text x={17+x+50*i} y={ry*10 + ry*10} fill={stroke} fontSize={ry*4}>{name}</text>
</>
        ))
      }

*/}
      {
        dots.map(([name, stroke, y]) => (
          <ellipse key={name} stroke={stroke} cx={x} cy={y} rx="3" ry={ry} fill="white"/>
        ))
      }
    </g>
  );
}

