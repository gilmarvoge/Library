import { booksContants } from 'redux/constants';
import { IBook } from 'models';

export const getAllBooks = () => ({
  type: booksContants.GET_ALL_BOOKS,
})

export const addBook = (book: IBook) => ({
  type: booksContants.ADD_BOOK,
  book,
})

export const getBookById = (id: string) => ({
  type: booksContants.GET_BOOK_BY_ID,
  id,
});

export const editBookById = (book: IBook) => ({
  type: booksContants.EDIT_BOOK_BY_ID,
  book,
});

export const deleteBook = (id: string) => ({
  type: booksContants.DELETE_BOOK,
  id,
});

export const booksActions = {
  getAllBooks,
  addBook,
  getBookById,
  editBookById,
  deleteBook,
};







