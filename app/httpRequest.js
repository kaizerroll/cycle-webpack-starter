import {Observable} from 'rx';
import {button, h1, h4, a, div} from '@cycle/dom';

export default function main({DOM, HTTP}) {
  const clickEvent$ = DOM
    .select('.get-first')
    .events('click');

  const url = 'http://jsonplaceholder.typicode.com/users/1';
  const request$ = clickEvent$.map(() => {
    return {
      url,
      method: 'GET',
    };
  });

  // only response$ that match the url
  const response$$ = HTTP
    .filter(response$ => response$.request.url === url);

  // returns the response$ that most recently returned a value
  const response$ = response$$.switch();
  const firstUser$ = response$
    .map(res => res.body)
    .startWith(null);

  //firstUser$.subscribe(x => console.log(x));
  const vtree$ = firstUser$.map(render);

  return {
    DOM: vtree$,
    HTTP: request$
  };
}

function render(user) {
  return (
    div([
      button('.get-first', 'Get first user'),
      renderUser(user),
    ])
  );
}

function renderUser(user) {
  if (user === null) { return null; }

  return (
    div('.user-details', [
      h1('.user-name', user.name),
      h4('.user-email', user.email),
      a('.user-website', {href: user.website}, user.website),
    ])
  );
}