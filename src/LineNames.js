import React from 'react';

export default LineNames;

function LineNames ({colors, names, enabled, onSwitch}) {
  const onChange = evt => {
    const {
            checked,
            name,
          } = evt.currentTarget;
    onSwitch((state) => checked ? state.concat(name) : state.filter(_name => _name !== name));
  };
  const isChecked = name => enabled.includes(name) ? 'checked' : '';

  return (
    <div>
      {
        Object.entries(names).map(([key, name]) => {
          return (
            <label className="line-names" style={{color: colors[key]}} key={key}>
              {name}
              <input checked={isChecked(key)} type="checkbox" name={key} onChange={onChange} />
            </label>
          )
        })
      }
    </div>
  )
}
