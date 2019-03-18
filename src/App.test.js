import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe.skip('App', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App data={[]}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it.todo('should render chart selector');

  it.todo('should pass active charts to Charts element');

  it.todo('should change active chart on button click');
});
