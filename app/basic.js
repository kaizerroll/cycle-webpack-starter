import Cycle from '@cycle/core';
import {makeDOMDriver, hJSX} from '@cycle/dom';

// updates app state
function main({DOM}) {
  // a stream of the field's input value, starting with ''
  const input$ = DOM.select('.field').events('input')
    .map(ev => ev.target.value)
    .startWith('');

  const renderInput = (input) => (
    <div>
      <label>Name: </label>
      <input className="field" type="text"/>
      <h1>Hello {input}</h1>
    </div>
  );

  const newDOM = input$.map(renderInput);

  input$.subscribe(x => console.log(x));

  const sinks = {
    DOM: newDOM,
  };

  return sinks;
}

// the source for our app state
const sources = {
  DOM: makeDOMDriver('#app'),
};

// compose main with sources
Cycle.run(main, sources);