import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import store from 'store';
import React from 'react';
import { Router } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import CreateEditBook from 'pages/CreateBook';
import NotFound from 'pages/NotFound';

const history = createMemoryHistory();

test('landing on a login page', () => {
  const history = createMemoryHistory()
  history.push('/login')
  render(
    <Provider store={store}>
      <Router history={history}>
        <Login />
      </Router>
    </Provider>
  )
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});


// test('landing on a bad page', () => {
//   const history = createMemoryHistory()
//   history.push('*')
//   render(
//     <Provider store={store}>
//       <Router history={history}>
//         <NotFound />
//       </Router>
//     </Provider>
//   );
//   expect(screen..g('page-not-found')).toBeInTheDocument();
// })

