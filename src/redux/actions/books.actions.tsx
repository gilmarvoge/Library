import { booksContants } from 'redux/constants';
import { IBook, IBooks } from 'models';

export const setAllBooks = (books: IBooks) => ({
  type: booksContants.SET_ALL_BOOKS,
  books
})

export const setBook = (book: IBook) => ({
  type: booksContants.SET_BOOK,
  book,
})

export const setEditedBook = (bookId: string, book: IBook) => ({
  type: booksContants.EDIT_BOOK_BY_ID,
  bookId,
  book,
});

export const setDeletedBook = (bookId: string) => ({
  type: booksContants.DELETE_BOOK,
  bookId,
});

export const booksActions = {
  setAllBooks,
  setBook,
  setEditedBook,
  setDeletedBook,
};







