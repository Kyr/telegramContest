import React, {
  useEffect,
  useState,
} from "react";
import LineNames from "../LineNames";
import DisplayLines from '../displayLines';
import './style.css';

const createLinesMap = (valueMap, [name, ...values]) => valueMap.set(name, values);

export default chart;

function chart ({accessor, active}) {
  const [chart, setChart] = useState(accessor());

  const {columns, names, /*types, */colors} = chart;

  const [enabled, changeEnabled] = useState(Object.keys(names));

  useEffect(() => {
    const chart = accessor();

    setChart(chart);
    changeEnabled(() => Object.keys(chart.names));
  }, [active]);

  const dataSets = columns.reduce(createLinesMap, new Map());

  return (
    <>
      <DisplayLines dataSets={dataSets} enabled={enabled} colors={colors}/>

      <footer>

        <LineNames colors={colors} enabled={enabled} names={names} onSwitch={changeEnabled}/>
      </footer>
    </>
  );
}
