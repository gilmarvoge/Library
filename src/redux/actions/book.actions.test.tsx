import * as actions from 'redux/actions';
import { booksContants } from 'redux/constants';
import { IBooks } from 'models';

const books = [{
  'id': '7',
  'author': 'Harmeet SinghMehul',
  'title': 'Learning Web Development with React and Bootstrap',
  'description': 'Build maintainable and performant user interfaces',
  'image_url': 'http://books.google.com'
}]

const book = {
  'id': '7',
  'author': 'Harmeet SinghMehul',
  'title': 'Learning Web Development with React and Bootstrap',
  'description': 'Build maintainable and performant user interfaces',
  'image_url': 'http://books.google.com'
}

const bookId = '1';

describe('actions book', () => {

  test('should create an action to set books', () => {
    const addAction = {
      type: booksContants.ADD_BOOK, book
    }
    expect(actions.setBook(book)).toEqual(addAction)
  });

  test('should create an action to delete book', () => {
    const deleteAction = {
      type: booksContants.DELETE_BOOK, bookId
    }
    expect(actions.setDeletedBook(bookId)).toEqual(deleteAction)
  });

  test('should create an action to get book', () => {
    const getAction = {
      type: booksContants.GET_BOOK_BY_ID, bookId
    }
    expect(actions.getBookById(bookId)).toEqual(getAction)
  });

  test('should create an action to edit book', () => {
    const editAction = {
      type: booksContants.EDIT_BOOK_BY_ID, bookId, book
    }
    expect(actions.setEditedBook(bookId, book)).toEqual(editAction)
  });
});


