import { booksContants } from 'redux/constants';
import books from './books.reducer';
import * as mocks from 'utils';

describe('books reducer', () => {
  const { booksMock, book, bookId } = mocks;

  test('should handle SET_ALL_BOOKS', () => {
    const setAction = {
      type: booksContants.SET_ALL_BOOKS,
      books: booksMock,
    };
    expect(books([], setAction)).toEqual(booksMock);
  });

  test('should handle SET_BOOK', () => {
    const setAction = {
      type: booksContants.SET_BOOK, book
    };
    expect(books([], setAction)).toEqual(booksMock);
  });

  // test('should handle EDIT_BOOK_BY_ID', () => {
  //   const getBookAction = {
  //     type: booksContants.EDIT_BOOK_BY_ID,
  //     bookId,
  //     book,
  //   };
  //   expect(books([], getBookAction)).toEqual(booksMock);
  // });

  // test('should handle EDIT_BOOK_BY_ID', () => {
  //   const getBookAction = {
  //     type: booksContants.DELETE_BOOK, bookId, book
  //   };
  //   expect(books([], getBookAction)).toEqual(booksMock);
  // });
})


