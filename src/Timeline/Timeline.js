import React from 'react';
import compose from "../lib/fns/compose";
import './style.css';

const valueOf = event => parseInt(event.target.value);

export default Timeline;

function Timeline ({timelinePath, width, getX, getOrdinates, setRightBound, setLeftBound, rightBound, leftBound}) {

  if (!width) {
    return null;
  }
  const x = getX();
  const ordinates = getOrdinates();

  if (ordinates.length === 0) {
    return null;
  }

  const onChangeRightBound = compose(setRightBound, valueOf);
  const onChangeLeftBound = compose(setLeftBound, valueOf);
  const onChangeCursor = e => {
    const value = valueOf(e);
//console.log('change cursor', value)
    setLeftBound(value);
    setRightBound(value + rightBound - leftBound);
  };

  const timelineRef = React.createRef();

  return (
    <div className="timeline-view" ref={timelineRef}>
      {/*
          TODO: https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/
        */}
        <style>{`
          .timeline-view input[name="cursor"]::-webkit-slider-thumb {
            width: ${(100 * 1.70 * (rightBound - leftBound) / x.length)-4}%;
          }`}
        </style>
      <div className="bounds">
        <input type="range" name="leftBound" min={0} max={-10 + rightBound}
               value={Math.round(leftBound)}
               onChange={onChangeLeftBound}
                         style={{width: `${leftBound / x.length * 100}%`}}
        />

        <input type="range" name="rightBound" min={10 + leftBound} max={x.length}
               value={Math.round(rightBound)}
               onChange={onChangeRightBound}
                       style={{width: `${100 * (x.length - leftBound) / x.length}%`}}
        />
      </div>
      <input type="range" name="cursor" min={0} max={x.length - (rightBound - leftBound)} value={leftBound}
             onChange={onChangeCursor}
//                       style={{width: `${100 * (rightBound - leftBound) / x.length}%`}}
      />


      <svg viewBox={`0 0 ${width} ${100}`} preserveAspectRatio="none">
        {
          ordinates.map(([name, stroke, y]) => {

            return (
              <path key={name} d={timelinePath(y)} fill="none" stroke={stroke}/>
            )
          })
        }
      </svg>
    </div>
  );
}

