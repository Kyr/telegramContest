import React from "react";
import './tooltip.css';
import formatDate from "../lib/formatDate";
import map from '../lib/fns/map';

export default tooltip;

const renderDots = map(renderLabel);

/**
 * @todo Add callback on mount to check and modify transform in case parentNode.clientWidth < parentNode.scrollWidth
 * @param xLabel
 * @param x
 * @param dots
 * @return {*}
 */
function tooltip ({xLabel, x, dots}) {
  if (!xLabel) return null;

  return (
    <div className="tooltip" style={{transform: `translateX(${x + 10}px)`}}>
      <h1>
        {formatDate(xLabel)}
      </h1>

      <div className="tooltip-values">
        {renderDots(dots)}
      </div>
    </div>
  )
}

function renderLabel ([name, color, value], index) {
  return <Label key={index} {...{name, color, value}}/>;
}

function Label ({name, color, value}) {
  return (
    <div style={{color}}>
      {value}
      <small>
        {name}
      </small>
    </div>
  );
}
