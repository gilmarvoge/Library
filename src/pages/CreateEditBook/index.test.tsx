import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import store from 'store';
import React from 'react';
import { Router } from 'react-router-dom';
import CreateEditBook from 'pages/CreateEditBook';

describe('test create book page', () => {
  const history = createMemoryHistory()
  const component = (
    <Provider store={store}>
      <Router history={history}>
        <CreateEditBook />
      </Router>
    </Provider>
  );

  beforeEach(() => {
    render(component);
  });

  test('should display required error when value is invalid', async () => {
    fireEvent.input(screen.getByLabelText('Título'), { target: { value: '' } });
    fireEvent.input(screen.getByLabelText('Autor'), { target: { value: '' } });
    fireEvent.input(screen.getByLabelText('Descrição'), { target: { value: '' } });
    fireEvent.input(screen.getByLabelText('Link da imagem'), { target: { value: '' } });
    fireEvent.submit(screen.getByTestId('submit-button'));
    expect(await screen.findAllByRole('alert')).toHaveLength(4);
  });
  test("should not display error when value is valid", async () => {
    fireEvent.input(screen.getByLabelText('Título'), { target: { value: 'Learning Web Development with React and Bootstrap' } });
    fireEvent.input(screen.getByLabelText('Autor'), { target: { value: 'Harmeet SinghMehul' } });
    fireEvent.input(screen.getByLabelText('Descrição'), { target: { value: 'Build maintainable and performant user interfaces' } });
    fireEvent.input(screen.getByLabelText('Link da imagem'), { target: { value: 'http://books.google.com' } });
    await waitFor(async () => {
      fireEvent.submit(screen.getByTestId('submit-button'));
    });
    expect(screen.queryAllByRole('alert')).toHaveLength(0);
  });
})

