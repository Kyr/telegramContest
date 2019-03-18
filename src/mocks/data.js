import formatDate from "src/lib/formatDate";

const day = 24 * 60 * 60 * 1000;

const data = {
  timeline: {
    veryLeft:  +new Date('2015-01-01'),
    veryRight: +new Date(),
    step:      day,
  },
  setNames: ['setA', 'setB'],
};

data.dataSets = [
  {name: 'A', dataset: [...fake([data.timeline.veryLeft, data.timeline.veryRight], [0, 1000])]},
  {name: 'B', dataset: [...fake([data.timeline.veryLeft, data.timeline.veryRight], [0, 1000])]},
]


module.exports = data;

function fake ([lBoundX, rBoundX], [lBoundY, tBoundY]) {
  const dataSeq = xGen(lBoundX, rBoundX, day);
  const v = f(lBoundY, tBoundY);
  return generatData2(dataSeq, v);
}

function f (lBound, tBound) {
  return () => Math.round(lBound + Math.random() * tBound);
}

function* xGen (lBound, rBound, step) {
  let current = lBound;
  while (current < rBound) {
    yield current;
    current = current + step;
  }
  return current;
}

function generatData2 (seq, generator) {
  return data();

  function data () {
    const p = seq.next();

    if (p.done) {
      return [[formatDate(p.value), generator()]];
    }

    return [
      [formatDate(p.value), generator()],
      ...data(),
    ];
  }

}
