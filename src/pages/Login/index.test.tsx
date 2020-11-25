import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from "history";
import { Router } from 'react-router-dom';
import Login from 'pages/Login';

describe('test create book page', () => {
  const history = createMemoryHistory()
  const component = (
    <Router history={history}>
      <Login />
    </Router>
  );

  beforeEach(() => {
    render(component);
  });

  test('should display required error when value is invalid', async () => {
    fireEvent.input(screen.getByLabelText('Usuario'), { target: { value: '' } });
    fireEvent.input(screen.getByLabelText('Senha'), { target: { value: '' } });
    fireEvent.submit(screen.getByText('Entrar'));
    expect(await screen.findAllByRole('alert')).toHaveLength(2);
  });
  test("should not display error when value is valid", async () => {
    fireEvent.input(screen.getByLabelText('Usuario'), { target: { value: 'hardware' } });
    fireEvent.input(screen.getByLabelText('Senha'), { target: { value: '12345' } });
    await waitFor(async () => {
      fireEvent.submit(screen.getByText('Entrar'));
    });
    expect(await screen.queryAllByRole('alert')).toHaveLength(0);
  });
});