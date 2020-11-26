import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from "history";
import { Router } from 'react-router-dom';
import SignUp from 'pages/SignUp';

describe('test create book page', () => {
  const history = createMemoryHistory()
  const component = (
    <Router history={history}>
      <SignUp />
    </Router>
  );

  beforeEach(() => {
    render(component);
  });

  test('should display required error when value is invalid', async () => {
    fireEvent.input(screen.getByLabelText('Usuário'), { target: { value: '' } });
    fireEvent.input(screen.getByLabelText('Senha'), { target: { value: '' } });
    fireEvent.submit(screen.getByText('Cadastrar'));
    expect(await screen.findAllByRole('alert')).toHaveLength(2);
  });
  test("should not display error when value is valid", async () => {
    fireEvent.input(screen.getByLabelText('Usuário'), { target: { value: 'hardware' } });
    fireEvent.input(screen.getByLabelText('Senha'), { target: { value: '12345' } });
    await waitFor(async () => {
      fireEvent.submit(screen.getByText('Cadastrar'));
    });
    expect(screen.queryAllByRole('alert')).toHaveLength(0);
  });
});