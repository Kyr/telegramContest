import React, {
  useLayoutEffect,
  useState,
} from 'react';
import getBounds from "../lib/getBounds";

//import DisplayHoverAbscissa from "./displayHoverAbscissa";
import DrawTooltip from '../drawTooltip';
//import Axises from './axises';
import DrawCharts from './drawCharts';
import createPathBuilder from "./createPathBuilder";
import Timeline from "../Timeline/Timeline";
import Abscissa from './abscissa';

export default displayLines;

function displayLines ({dataSets, enabled, colors}) {
  const x = dataSets.get('x');
//  const xMin = x[0];
//  const xMax = x[x.length-1];
  const [yMin, yMax] = getBounds(enabled.reduce((all, name) => all.concat(dataSets.get(name)), []));
  const chartRef = React.createRef();

  const [leftBound, setLeftBound] = useState(Math.round((x.length)* 0.8));
  const [rightBound, setRightBound] = useState(x.length);

  const [width, setWidth] = useState(undefined);
  const [height, setHeight] = useState(undefined);
  const [chartHeight, setChartHeight] = useState(undefined);

//  const pathBuilder = getPathBuilder(width / x.length, yMin, yMax, 100 / (yMax - yMin));


  useLayoutEffect(() => {
//    const timelineContainerStyle = window.getComputedStyle(timelineRef.current);
    const chartContainerStyle = window.getComputedStyle(chartRef.current);

    setWidth(parseInt(chartContainerStyle.width));
    setHeight(parseInt(chartContainerStyle.height));
    setChartHeight(parseInt(chartContainerStyle.height));
  }, []);

  function getX (leftBound = 0, rightBound = x.length - 1) {

    return x.slice(leftBound, rightBound + 1);
  }

  function getOrdinates (leftBound = 0, rightBound = x.length - 1) {
    return enabled.map(name => {
      const y = dataSets.get(name).slice(leftBound, rightBound + 1);
      const stroke = colors[name];

      return [name, stroke, y];
    })
  }

  const timelinePath = createPathBuilder(yMin, yMax, x.length, 100, width);

//  debugger
  return (
    <div className="chart-view">
      <div className="large-view" ref={chartRef}>
        {/*<div className="chart-container">*/}
        <DrawTooltip
          {...{width, height: chartHeight, leftBound, rightBound, getX, getOrdinates}}
        />

        <DrawCharts
          {...{width, height: chartHeight, leftBound, rightBound, getX, getOrdinates}}
        />



      </div>

      <Abscissa {...{leftBound, rightBound, getX, width}} />
      <Timeline {...{timelinePath, width, getX, getOrdinates, enabled, setRightBound, setLeftBound, rightBound, leftBound}}/>

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
