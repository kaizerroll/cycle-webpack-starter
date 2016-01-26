import {Observable} from 'rx';
import {label, button, p, div} from '@cycle/dom';

export default function main({DOM}) {
  const decClick$ = DOM.select('.decrement').events('click');
  const incClick$ = DOM.select('.increment').events('click');
  
  const decAction$ = decClick$.map(() => -1);
  const incAction$ = incClick$.map(() => 1);
  const allAction$ = decAction$.merge(incAction$).startWith(0);  
  
  const sum$ = allAction$.scan((acc, x) => x + acc, 0);
  const vtree$ = sum$.map(render);

  return {
    DOM: vtree$,
  };
}

function render(count) {
  return (
    div([
      button('.decrement', 'Decrement'),
      button('.increment', 'Increment'),
      p([
        label(`${count}`),
      ]),
    ])
  );
}