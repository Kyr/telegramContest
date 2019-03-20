import React from "react";
import compose from "../lib/fns/compose";

const itemRender = props => <button {...props}/>;

export default displayChartSelector;

function displayChartSelector ({chartNames, onChange}) {
  const itemProps = switcherProps(onChange);
  const item = compose(itemRender, itemProps);

  return chartNames.map(item);
}

function switcherProps (handler) {
  return function (name, index) {
    return {
      key: index,
      children: name,
      onClick () {
        handler(index)
      },
    }
  }
}

