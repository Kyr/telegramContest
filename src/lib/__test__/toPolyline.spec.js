const chart = {
  "columns": [
    ['x', 1, 2, 3, 4],
    // min: 5, max: 20 -> area: 15 -> [y] => [area-(y-min)] => area-y+min
    ['y0', 5, 10, 20, 15], //  => [15, 10, 0]
    ['y1', 15, 5, 18, 0], // => [5, 15, 2]
  ],
  "types":   {
    'y0': 'line',
    'y1': 'line',
    'x':  'x',
  },
  "names":   {
    "y0": "#0",
    "y1": "#1",
  },
  "colors":  {
    "y0": "#3DC23F",
    "y1": "#F34C44",
  },
};
const expected = [
  {
    name:   '#0',
    color:  '#3DC23F',
    points: expect.any(Function),
  },
  {
    name:   '#1',
    color:  '#F34C44',
    points: expect.any(Function),
//    points: "1,5 2,15 3,2"
  },
];
import toPolyline from '../toPolyline';

describe('toPolyline', function () {
  it('should create transformer chart definition into set of polyline', () => {
//    expected.points = jest.fn((sliceFrom = 0, sliceTo = -1) =>  "1,15 2,10 3,0")
    const actual = toPolyline(chart);

    expect(actual).toStrictEqual(expected);
  });

  test('points should return an array of chart\'s dot pairs', () => {
    const actual = toPolyline(chart);
    const c0 = actual[0].points();
    const c1 = actual[1].points();

    expect(c0).toStrictEqual([[1, 5], [2, 10], [3, 20], [4, 15]]);
    expect(c1).toStrictEqual([[1, 15], [2, 5], [3, 18], [4,0]]);
  });

  test('points should return an array of chart\'s dot pairs according to leftBound', () => {
    const actual = toPolyline(chart);
    const c0 = actual[0].points(1);
    const c1 = actual[1].points(2);

    expect(c0).toStrictEqual([[2, 10], [3, 20], [4, 15]]);
    expect(c1).toStrictEqual([[3, 18], [4, 0]]);
  });

  test('points should return an array of chart\'s dot pairs according to leftBound and rightBound', () => {
    const actual = toPolyline(chart);
    const c0 = actual[0].points(1, 1);
    const c1 = actual[1].points(0, 2);

    expect(c0).toStrictEqual([[2, 10], [3, 20]]);
    expect(c1).toStrictEqual([[2,5], [3, 18]]);
  });
});
