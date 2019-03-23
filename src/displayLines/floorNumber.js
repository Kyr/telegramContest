export default floorNumber;

function floorNumber (_number_, add = 0) {
  const n = _number_.toString();

//  debugger
  if(n.length === 1) {
    return 0;
  }

  if(n.length === 2) {
    return (Math.round(_number_ / 10) + add) * 10;

  }


  const divider = Math.pow(10, (Math.min(1, n.length - 2)));
  const number = Math.round(_number_ / divider);

  return (number + add) * divider;
}

export function roundInterval(min, max) {
/*
  const delta = floorNumber(max - min);
  const p = 0.01 * delta;
*/


}
