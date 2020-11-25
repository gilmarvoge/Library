import * as actions from 'redux/actions';
import { booksContants } from 'redux/constants';
import * as mocks from 'utils';

describe('actions book', () => {
  const { book, bookId } = mocks;
  const books = mocks.booksMock;
  
  test('should create an action to set book', () => {
    const addAction = {
      type: booksContants.SET_BOOK, book
    }
    expect(actions.setBook(book)).toEqual(addAction)
  });

  test('should create an action to delete book', () => {
    const deleteAction = {
      type: booksContants.DELETE_BOOK, bookId
    }
    expect(actions.setDeletedBook(bookId)).toEqual(deleteAction)
  }); 

  test('should create an action to edit book', () => {
    const editAction = {
      type: booksContants.EDIT_BOOK_BY_ID, bookId, book
    }
    expect(actions.setEditedBook(bookId, book)).toEqual(editAction)
  });

  test('should create an action to set all books', () => {
    const setBookAction = {
      type: booksContants.SET_ALL_BOOKS, books
    }
    expect(actions.setAllBooks(books)).toEqual(setBookAction)
  });
});


