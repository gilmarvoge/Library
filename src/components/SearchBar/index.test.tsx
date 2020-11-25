import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import SearchBar from 'components/SearchBar';

test('render search value', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <SearchBar books={[]} setFilteredBooks={() => { }} />
    </Router>
  );
  fireEvent.change(screen.getByPlaceholderText('Pesquise por título ou autor'), { target: { value: 'react' } });
  expect(screen.getByPlaceholderText('Pesquise por título ou autor')).toHaveValue('react');
})


