
import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Header from 'components/Header';
import store from 'store';

test('render header', () => {
  const history = createMemoryHistory();
  const component = (
    <Provider store={store}>
      <Router history={history}>
        <Header />
      </Router>
    </Provider>
  );
  render(component)
  expect(screen.getByTestId('header')).toBeInTheDocument();
});

