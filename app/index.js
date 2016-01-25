import Rx from 'rx';
import Cycle from '@cycle/core';
import {makeDOMDriver, hJSX} from '@cycle/dom';

function renderCheckbox(toggled) {
  return (
    <div>
      <input type='checkbox'/> Toggle me
      <p>{toggled ? 'ON' : 'OFF'}</p>
    </div>
  );
}

// updates app state
function main(drivers) {
  return {
    DOM:
      Rx.Observable
        .just(false)
        .map(renderCheckbox),
  };
}

// the source for our app state
const drivers = {
  DOM: makeDOMDriver('#app'),
};

// compose main with drivers
Cycle.run(main, drivers);