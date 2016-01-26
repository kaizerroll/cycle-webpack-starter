import {Observable} from 'rx';
import {hJSX} from '@cycle/dom';

// detect slider change - Read
// recalculate BMI      - Logic
// display BMI          - Write

export default function main({DOM}) {
  const weight$ = DOM.select('.weight')
    .events('input')
    .map(ev => ev.target.value)
    .startWith(70);

  const height$ = DOM.select('.height')
    .events('input')
    .map(ev => ev.target.value)
    .startWith(170);

  const bmi$ = Observable.combineLatest(
    weight$,
    height$,
    calculateBMI
  );

  const state$ = Observable.combineLatest(
    weight$, height$, bmi$,
    (weight, height, bmi) => ({weight, height, bmi})
  );

  // state$.subscribe(x => console.log(x));
  const vtree$ = state$.map(render);

  return {
    DOM: vtree$,
  };
}

function render({weight, height, bmi}) {
  return (
    <div>
      <div>
        <label>Weight: {weight}kg</label>
        <input className="weight" 
          type="range"
          min="40" max="150"
          value={weight}/>
      </div>
      <div>
        <label>Height: {height}kg</label>
        <input className="height" 
          type="range"
          min="140" max="220"
          value={height}/>
      </div>
      <h2>BMI is {bmi}</h2>
    </div>
  );
}

function calculateBMI(weight, height) {
  const heightMeters = height * 0.01;
  const bmi = Math.round(weight / (heightMeters * heightMeters));
  return bmi;
}