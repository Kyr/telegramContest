export default function (fn) {
  return function (array) {
    return array.map(fn);
  }
}
