import React from 'react';

export default Axises;

function Axises ({width, height, yMin, yMax, leftBound, rightBound}){
  return (
    <g className="">
      <line x1="0" y1={height-1} x2={width} y2={height-1} stroke="silver" strokeWidth={.5}/>
    </g>
  );
};

