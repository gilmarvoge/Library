import { booksContants } from 'redux/constants';
import { IBook, IBooks } from 'models';

export const getAllBooks = (books:IBooks) => ({
  type: booksContants.GET_ALL_BOOKS,
  books
})

export const addBook = (book: IBook) => ({
  type: booksContants.ADD_BOOK,
  book,
})

export const getBookById = (bookId: string) => ({
  type: booksContants.GET_BOOK_BY_ID,
  bookId,
});

export const editBookById = (book: IBook) => ({
  type: booksContants.EDIT_BOOK_BY_ID,
  book,
});

export const deleteBook = (bookId: string) => ({
  type: booksContants.DELETE_BOOK,
  bookId,
});

export const booksActions = {
  getAllBooks,
  addBook,
  getBookById,
  editBookById,
  deleteBook,
};







