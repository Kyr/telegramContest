import DisplayHoverAbscissa from "./displayHoverAbscissa";
import React, {useState} from "react";
import Tooltip from './tooltip';
import './tooltip.css';
import getBounds from "../lib/getBounds";

export default drawTooltip;

function drawTooltip ({width, height, leftBound, rightBound, getX, getOrdinates}) {
  const [tooltip, setTooltip] = useState(null);

  /*
    const cursor = enabled.map(name => {
      const y = dataSets.get(name).slice(leftBound, rightBound + 1);
      const stroke = colors[name];
      const pathBuilder = getPathBuilder(width / y.length, yMin, yMax, height / (yMax - yMin));

      return [name, stroke, y, pathBuilder(y)];
    });
  */

  const showTooltip = e => {
    const {
      clientX,
    } = e;
    const xCursor = getX(leftBound, rightBound);
    const xStep = width / xCursor.length;
    const position = parseInt(clientX / xStep);
    const positionName = xCursor[position];
    const ordinates = getOrdinates(leftBound, rightBound);

    const [yMin, yMax] = getBounds(ordinates.reduce((all, [name, , y]) => all.concat(y), []));

    const yDelta = yMax - yMin;

    setTooltip({
      height,
      clientX,
      x:      position * xStep,
      xLabel: positionName,
      yMin,
      yDelta,
      dots:   ordinates.map(([name, stroke, y]) => [name, stroke, y[position]])
        , //cursor.map(([name, stroke, y]) => [name, stroke, yMax - y[position]]),
    });
  };

  function hideTooltip (e) {
    return
    setTooltip(null);
  }

  return (
    <div className="tooltip-container">
      <Tooltip {...tooltip} />
      <svg className="tooltip-catcher" viewBox={`0 0 ${width} ${height}`} onMouseMove={showTooltip} onMouseOut={hideTooltip}>
        {tooltip && <DisplayHoverAbscissa {...tooltip} />}
      </svg>
    </div>
  )
}
