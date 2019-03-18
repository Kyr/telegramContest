import React, {
  useLayoutEffect,
  useState,
} from 'react';
import getBounds from "../lib/getBounds";
import compose from "../lib/fns/compose";

const valueOf = event => parseInt(event.target.value);

export default displayLines;

function displayLines ({dataSets, enabled, colors}) {
  const x = dataSets.get('x');
  const [yMin, yMax] = getBounds(enabled.reduce((all, name) => all.concat(dataSets.get(name)), []));
  const timelineRef = React.createRef();

  const [rightBound, setRightBound] = useState(x.length);
  const [leftBound, setLeftBound] = useState(x.length-20);

  const [width, setWidth] = useState(undefined);

  const pathBuilder = getPathBuilder(width / x.length, yMin, yMax);

  const onChangeRightBound = compose(setRightBound, valueOf);
  const onChangeLeftBound = compose(setLeftBound, valueOf);
  const onChangeCursor = e => {
    const value = valueOf(e);

    setLeftBound(value);
    setRightBound(value + rightBound - leftBound);
  };

  useLayoutEffect(() => {
    setWidth(parseInt(window.getComputedStyle(timelineRef.current).width));
  }, []);

  return (
    <div className="chart-view">
      <div className="large-view">
        {
          width && enabled.length > 0 && (
            <svg viewBox={`0 0 ${width} ${yMax - yMin}`} preserveAspectRatio="none">
              {
                enabled.map(name => {
//                  const y = dataSets.get(name).slice(leftBound).slice(0, rightBound-leftBound);
                  const y = dataSets.get(name).slice(leftBound, rightBound + 1);
                  const stroke = colors[name];
                  const pathBuilder = getPathBuilder(width / y.length, yMin, yMax);
                  return (
                    <path key={name} d={pathBuilder(y)} fill="none" strokeWidth={2} stroke={stroke}/>
                  )
                })
              }
            </svg>
          )
        }
      </div>

      <div className="timeline-view" ref={timelineRef}>
        <input type="range" name="leftBound" min={0} max={-10 + rightBound} value={leftBound} onChange={onChangeLeftBound}/>
        <input type="range" name="cursor" min={0} max={x.length - (rightBound - leftBound)} value={leftBound} onChange={onChangeCursor} />
        <input type="range" name="rightBound" min={10+leftBound} max={x.length} value={rightBound} onChange={onChangeRightBound}/>
        {
          width && enabled.length > 0 && (
            <svg viewBox={`0 0 ${width} ${yMax - yMin}`} preserveAspectRatio="none">
              {
                enabled.map(name => {
                  const y = dataSets.get(name);
                  const stroke = colors[name];

                  return (
                    <path key={name} d={pathBuilder(y)} fill="none" stroke={stroke}/>
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

function getPathBuilder (xStep, yMin, yMax) {
  return pathBuilder;

  /**
   *
   * @param {[number]} y ordinates
   * @return {string} path definition
   */
  function pathBuilder (y) {
    const [base, ...rest] = y;

    const {d} = rest.reduce(({base, d}, y) => {
      return {
        base: y,
        d:    d + ' ' + `l ${xStep},${base - y}`,
      }
    }, {base, d: `M 0,${yMax - base}`});

    return d;
  }
}
