import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import App from '../App';

describe('tests routes using memory router', () => {
  const history = createMemoryHistory()

  const component = (
    <Router history={history}>
      <App />
    </Router>
  );

  beforeEach(() => {
    render(component);
  });

  //Testar outras rotas
  test('landing on a login page', () => {
    history.push('/login')
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});

