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


describe('tests routes using memory router', () => {
  const history = createMemoryHistory()

  test('landing on a login page', () => {
  
    history.push('/login')
    render(
      <Router history={history}>
        <Login />
      </Router>
    )
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  // test('landing on a home page', () => {
  //   const history = createMemoryHistory()
  //   history.push('/login')
  //   render(
  //     <Router history={history}>
  //       <Home />
  //     </Router>
  //   )
  //   expect(screen.getByText(/Login/i)).toBeInTheDocument();
  // });

})

