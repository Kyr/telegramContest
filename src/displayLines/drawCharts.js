import React, {
  PureComponent,
  useState,
} from 'react';
import createPathBuilder from "./createPathBuilder";
import getBounds from "../lib/getBounds";
import floorNumber from "./floorNumber";
import * as PropTypes from "prop-types";

const fontSize = 15;
const gutter = 2;

export default class DrawCharts extends PureComponent {
  render () {
    let {width, height, getX, getOrdinates, leftBound, rightBound} = this.props;
    if (!width) return null;

    const ordinates = getOrdinates(leftBound, rightBound);

    if (ordinates.length === 0) return null;

    const [yMin, yMax] = getBounds(ordinates.reduce((all, [name, , y]) => all.concat(y), []));

    let topBound = floorNumber(yMax, 1) + fontSize;

    const bottomBound = floorNumber(yMin);
    const yDelta = topBound - bottomBound;

    const step = floorNumber(yDelta / 5);
    const ordinatesAxis = new Array(6).fill(null).map(
      (_, index) => bottomBound + step * index,
    );

    /*
      if(topBound - ordinatesAxis[ordinatesAxis.length-1] > 0.5 * step) {
        debugger
        ordinatesAxis.push(ordinatesAxis[ordinatesAxis.length-1] + step);
      }
    */

    topBound = ordinatesAxis[ordinatesAxis.length - 1];

    const ordinatesLabels = ordinatesAxis.map(ordinate => [
      ordinate,
      Math.round((1 - (ordinate - bottomBound) / yDelta) * (height)),
    ]);

    /*
      const [bottomBound, topBound] = getSteps(yMin, yMax);

      const yDelta = topBound -  bottomBound;
      const yStep = floorNumber(0.2 * yDelta);

      let ordinatesAxis = [bottomBound];

      while (ordinatesAxis[ordinatesAxis.length - 1] + yStep <= topBound) {
        ordinatesAxis.push(ordinatesAxis[ordinatesAxis.length-1] + yStep);
      }

      const ordinatesLabels = ordinatesAxis.map(ordinate => {
        return [ordinate, (1 - (ordinate - bottomBound) / yDelta) * height];
      });

    */
    //

//  const topBound = floorNumber(yMax, 1);
//  const times = Math.max(2, Math.trunc(yMax / bottomBound));

//const topBound = bottomBound * (times * bottomBound < yMax ? times + 1 : times);

    const pathBuilder = createPathBuilder(bottomBound, topBound, rightBound - leftBound, height - fontSize - gutter, width);

//  const pathBuilder = createPathBuilder(yMin, yMax, rightBound - leftBound, height - fontSize - gutter, width);

    const xCaptions = createXCaptions(width, getX(leftBound, rightBound));

    /*
      const [tooltip, setTooltip] = useState(null);

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
          height,
          clientX,
          x:      position * xStep,
          xLabel: positionName,
          dots:   cursor.map(([name, stroke, y]) => [name, stroke, yMax - y[position]]),
        });
      };


      function hideTooltip (e) {
        setTooltip(null);
      }
    */

    console.log('render charts');
    return (
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        {/*
      <Tooltip {...tooltip} />
*/}
        {/*
      <Axises {...{width, height, yMin, yMax, leftBound, rightBound}} />
*/}
        <g y={fontSize} style={{border: '1px solid silver'}}>
          {
            ordinates.map(([name, stroke, y]) => {
//                  const y = dataSets.get(name).slice(leftBound).slice(0, rightBound-leftBound);
              return (
                <path key={name} d={pathBuilder(y)} fill="none" strokeWidth={2} stroke={stroke}/>
              )
            })
          }
          {
            ordinatesLabels.map(([label, ordinate]) => (
              <>
                <text x={15} y={ordinate - gutter} fontSize={fontSize}>{label}</text>
                <path d={`M 0,${ordinate} H${width}`} stroke="silver"/>
              </>
            ))
          }

        </g>

        {/*<text x={15} y={fontSize} fontSize={fontSize}>{yMax}</text>*/}
        {/*<text x={115} y={fontSize} fontSize={fontSize}>{topBound}</text>*/}

        {/*<path d={`M 0,${height} H${width}`} stroke="silver"/>*/}
        {/*<text x={115} y={height - fontSize - gutter} fontSize={fontSize}>{bottomBound}</text>*/}






        {/*
      {tooltip && <DisplayHoverAbscissa {...tooltip} />}
*/}
      </svg>
    );
  }
}

DrawCharts.propTypes = {
  children:     PropTypes.any,
  width:        PropTypes.any,
  height:       PropTypes.any,
  getX:         PropTypes.any,
  getOrdinates: PropTypes.any,
  leftBound:    PropTypes.any,
  rightBound:   PropTypes.any
}

function createXCaptions (abscissas) {

}

function getSteps (_min_, _max_) {
  const delta = floorNumber(_max_ - _min_);
  const dec = floorNumber(0.1 * delta);

  let min = floorNumber(_min_);

  if (dec === 0) {
    return [min, Math.max(floorNumber(_max_, 1), min + delta)]
  }

  while (min > _min_) {
    min = min - dec;
  }

  while (dec > 0 && dec < Math.abs(_min_ - min)) {
    min = min + dec;
  }

  let max = min + 10 * dec;

  while (max < _max_ && dec > 0) {
    max = max + dec;
  }

  return [min, max];

  /*
    const min = floorNumber(_min_);
    const delta = floorNumber(_max_ - _min_);
  //debugger

    let max = min + delta;
    let step = floorNumber(delta / 5);
     while (max < _max_) {
       max  = max + step;
     }

     return [min, max];

  /!*
    if (_max_ - (min + delta) > step) {
      return [min, min + delta + step];
    } else {
      return [min, min + delta];
    }

  *!/
  */
}
