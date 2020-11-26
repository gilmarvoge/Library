import { booksContants } from 'redux/constants';
import books from './books.reducer';
import * as mocks from 'utils';

describe('books reducer', () => {
  const { book, booksMock } = mocks;

  test('should handle SET_ALL_BOOKS', () => {
    const setAction = {
      type: booksContants.SET_ALL_BOOKS,
      books: booksMock,
    };
    expect(books([], setAction)).toEqual(booksMock);
  });

  test('should handle SET_BOOK', () => {
    const setBookAction = {
      type: booksContants.SET_BOOK, book
    };
    expect(books([], setBookAction)).toEqual(booksMock);
  });
});


