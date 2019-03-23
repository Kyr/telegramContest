import React, {useState} from 'react';
import './App.css';
import Chart from './Chart';
import ChartSelector from './chartSelector';

export default app;

const chartNameBuilder = (chart, index) => `Chart #${index}`;

function app ({data}) {
  const [active, setActive] = useState(0);
  const names = data.map(chartNameBuilder);
  const accessor = () => data[active];

  return (
    <div className="App">
      <header onClick={() => console.log('header click')}>
        <ChartSelector chartNames={names} onChange={setActive}/>
      </header>

      <main>
        <Chart accessor={accessor} active={active}/>
      </main>

      <footer>
        Switch theme
      </footer>
    </div>
  )
}
