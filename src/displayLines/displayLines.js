import React, {
  useLayoutEffect,
  useState,
} from 'react';
import getBounds from "../lib/getBounds";
import compose from "../lib/fns/compose";
import DisplayHoverAbscissa from "./displayHoverAbscissa";
import Tooltip from './tooltip';
import Axises from './axises';
import DrawCharts from './drawCharts';
import createPathBuilder from "./createPathBuilder";

;

const valueOf = event => parseInt(event.target.value);

export default displayLines;

function displayLines ({dataSets, enabled, colors}) {
  const x = dataSets.get('x');
//  const xMin = x[0];
//  const xMax = x[x.length-1];
  const [yMin, yMax] = getBounds(enabled.reduce((all, name) => all.concat(dataSets.get(name)), []));
  const timelineRef = React.createRef();
  const chartRef = React.createRef();

  const [tooltip, setTooltip] = useState(null);

  const [rightBound, setRightBound] = useState(x.length);
  const [leftBound, setLeftBound] = useState(x.length - 20);

  const [width, setWidth] = useState(undefined);
  const [height, setHeight] = useState(undefined);
  const [chartHeight, setChartHeight] = useState(undefined);

  const pathBuilder = getPathBuilder(width / x.length, yMin, yMax, 100 / (yMax - yMin));

  const onChangeRightBound = compose(setRightBound, valueOf);
  const onChangeLeftBound = compose(setLeftBound, valueOf);
  const onChangeCursor = e => {
    const value = valueOf(e);
//console.log('change cursor', value)
    setLeftBound(value);
    setRightBound(value + rightBound - leftBound);
  };

  useLayoutEffect(() => {
    const timelineContainerStyle = window.getComputedStyle(timelineRef.current);
    const chartContainerStyle = window.getComputedStyle(chartRef.current);

    setWidth(parseInt(timelineContainerStyle.width));
    setHeight(parseInt(timelineContainerStyle.height));
    setChartHeight(parseInt(chartContainerStyle.height));
  }, []);

  const cursor = enabled.map(name => {
    const y = dataSets.get(name).slice(leftBound, rightBound + 1);
    const stroke = colors[name];
    const pathBuilder = getPathBuilder(width / y.length, yMin, yMax, height / (yMax - yMin));

    return [name, stroke, y, pathBuilder(y)];
  });

  const showTooltip = e => {
    const {
      clientX,
    } = e;
    const xCursor = x.slice(leftBound, rightBound + 1);
    const xStep = width / xCursor.length;
    const position = parseInt(clientX / xStep);
    const positionName = xCursor[position];
    const height = yMax - yMin;

    setTooltip({
      height: chartHeight,
      clientX,
      x:      position * xStep,
      xLabel: positionName,
      dots:   cursor.map(([name, stroke, y]) => [name, stroke, yMax - y[position]]),
    });
  };

  function hideTooltip (e) {
    setTooltip(null);
  }

  function getX(leftBound, rightBound) {
    return x.slice(leftBound, rightBound + 1);
  }

  function getOrdinates(leftBound, rightBound) {
    return enabled.map(name => {
      const y = dataSets.get(name).slice(leftBound, rightBound + 1);
      const stroke = colors[name];

      return [name, stroke, y];
    })
  }

  const timelinePath = createPathBuilder(yMin, yMax, x.length, height, width);

//  debugger
  return (
    <div className="chart-view">
      <div className="large-view"  ref={chartRef} onMouseMove={showTooltip} onMouseOut={hideTooltip}>
        {/*<div className="chart-container">*/}
          <Tooltip {...tooltip} />

          <DrawCharts
            {...{width, height: chartHeight, leftBound, rightBound, getX, getOrdinates}}
          >
              {tooltip && <DisplayHoverAbscissa {...tooltip} />}
          </DrawCharts>

          {/*


          {
            width && enabled.length > 0 && (
              <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none"></svg>

            )
          }
*/}

        {/*</div>*/}
      </div>

      <div className="timeline-view" ref={timelineRef}>
        {/*
          TODO: https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/
        */}
        <input type="range" name="leftBound" min={0} max={-10 + rightBound} value={leftBound}
               onChange={onChangeLeftBound}
               style={{width: `${leftBound / x.length * 100}%`}}/>

        <input type="range" name="cursor" min={0} max={x.length - (rightBound - leftBound)} value={leftBound}
               onChange={onChangeCursor}
               style={{width: `${100 * (rightBound - leftBound) / x.length}%`}}/>
        <input type="range" name="rightBound" min={10 + leftBound} max={x.length} value={rightBound}
               onChange={onChangeRightBound}
               style={{width: `${100 * (x.length - leftBound) / x.length}%`}}/>
        {
          width && enabled.length > 0 && (
            <svg viewBox={`0 0 ${width} ${100}`} preserveAspectRatio="none">
              {
                enabled.map(name => {
                  const y = dataSets.get(name);
                  const stroke = colors[name];

                  return (
                    <path key={name} d={timelinePath(y)} fill="none" stroke={stroke}/>
                  )
                })
              }
            </svg>
          )
        }
      </div>
    </div>
  )
}

function getPathBuilder (xStep, yMin, yMax, yScale = 1) {
//  console.log(xStep, yMin, yMax, yScale);
  return pathBuilder;

  /**
   *
   * @param {[number]} ordinates ordinates
   * @return {string} path definition
   */
  function pathBuilder (ordinates) {
    const toLow = ordinates.map(y => y - yMin);
//    const inverse = toLow.map(y => yMax - y);

    const [base, ...rest] = toLow;

    const {d} = rest.reduce(({base, d}, y) => {
      return {
        base: y,
        d:    `${d} l ${xStep},${yScale * (base - y)}`,
      }
    }, {base, d: `M 0,${yScale * (yMax - base)}`});

    return d;
  }
}
