import {run} from '@cycle/core';
import {makeDOMDriver} from '@cycle/dom';
import {makeHTTPDriver} from '@cycle/http';
//import main from './hello-world';
//import main from './counter';
//import main from './httpRequest';
import main from './bmi';

// compose main with sources
run(main, {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver(),
});