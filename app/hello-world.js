import {label, input, h1, hr, div} from '@cycle/dom';

// updates app state
export default function main({DOM}) {
  // a stream of the field's input events
  const input$ = DOM.select('.field').events('input');

  // a stream of the input value, starting with ''
  const text$ = input$
    .map(ev => ev.target.value)
    .startWith('');

  const vtree$ = text$.map(render);
  
  return {
    DOM: vtree$,
  };
}

function render(text) {
  return (
    div([
      label('Name: '),
      input('.field', {type: 'text'}),
      hr(),
      h1(`Hello ${text}!`),
    ]));
}