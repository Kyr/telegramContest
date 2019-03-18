import React, {useState} from "react";

const pointsA = "1,15 2,10 5,0";
const pointsB = "1,5 2,15 5,20";
//  const [animate, toAnimate] = useState(false);

//  const [points, changePoints] = useState(pointsA);
//  const [to, changeTo] = useState(pointsA);

//  const [from, changeFrom] = useState(pointsB);



const duration = 5000;

let points = pointsA;
//let from = pointsB;
//let to = pointsA;

const negate = a => {
  console.log(a);
  return !a;
};

let animate;

function onClick () {
//  toAnimate(negate);
//  (pointsB);
//  changeTo(pointsB)
//  changeFrom(pointsA);

  if (animate) {
//    window.a.setAttribute('to', window.a.from);
//    window.a.setAttribute('from', window.a.to);
    window.s.pauseAnimations();
    return;
  }


  if (points === pointsA) {
    window.a.setAttribute('from', pointsA);
    window.a.setAttribute('to', pointsB);
    points = pointsB;

    window.a.beginElement();

    /*
        window.a.onend = () => {
          animate = false;

    //      window.p.setAttribute(points, points);
        };
    */

  } else {
    window.a.setAttribute('from', pointsB);
    window.a.setAttribute('to', pointsA);
    points = pointsA;

    window.a.beginElement();


  }
  animate = true;
  window.a.onend = () => {
    animate = false;
//      window.p.points = points;
  };

//   window.a.to === pointsA ? pointsB : pointsA);
//  setTimeout(() => changePoints(pointsB), duration + 1)
}
//  let points = pointsA;
/*
function changePoints (e) {
//  debugger;
//  e.target.attributes.points.nodeValue = pointsB
  //  e.target.animatedPoints[1].y = 0;
//  e.target.points[1].y = 0;
points = pointsB;
}
{/*

*/



<svg id="s" width="640px" height="480px" viewBox="0 0 5 20" version="1.1" onClick={onClick}
     xmlns="http://www.w3.org/2000/svg">
  <polyline id="p" fill="none" strokeWidth="1" {...{name: '#0', stroke: '#3DC23F'}}  >
    <animate id="a" attributeName="points" from={pointsA} to={pointsA} dur={`${duration}ms`} fill="freeze"/> :
    {/*
          {
            animate ?
            <animate attributeName="points" from={to} to={from} dur={`${duration}ms`}/>
          }
*/}
  </polyline>
  {/*<polyline fill="none" strokeWidth="1" {...{name: '#1', stroke: '#F34C44', points: "1,5 2,15 3,2"}} />*/}
</svg>
