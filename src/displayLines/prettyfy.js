export default floorNumber;

function floorNumber (_number_, add = 0) {
  const n = _number_.toString();

//  debugger
  if(n.length === 1) {
    return 0;
  }

  const divider = Math.pow(10, (n.length - 1));
  const number = Math.trunc(_number_ / divider);

  return (number + add) * divider;
}

export function roundInterval(min, max) {
/*
  const delta = floorNumber(max - min);
  const p = 0.01 * delta;
*/


}
