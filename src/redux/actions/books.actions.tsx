import { booksContants } from 'redux/constants';
import { IBook, IBooks } from 'models';
interface BookItems extends Array<IBook>{}
export const setAllBooks = (books: BookItems) => ({
  type: booksContants.SET_ALL_BOOKS,
  books
})

export const setBook = (book: IBook) => ({
  type: booksContants.SET_BOOK,
  book,
})

export const getBookById = (bookId: string) => ({
  type: booksContants.GET_BOOK_BY_ID,
  bookId,
});

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
  getBookById,
  setEditedBook,
  setDeletedBook,
};







