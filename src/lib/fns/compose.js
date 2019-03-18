export default function compose (...fns) {
  return function () {
    return fns.reduceRight((args, fn) => [fn.apply(fn, args)], arguments);
  }
}
