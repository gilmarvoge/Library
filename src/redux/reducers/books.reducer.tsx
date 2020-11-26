import { booksContants } from 'redux/constants';
import { IBook } from 'models';

const books = (state = [], action: any) => {
  switch (action.type) {
    case booksContants.SET_ALL_BOOKS:
      return [...action.books];    
    case booksContants.SET_BOOK:
      return [...state, action.book];
    case booksContants.EDIT_BOOK_BY_ID: {
      const newState = state.map((book:IBook) => {
        if (book.id === action.bookId) {
          return action.book;
        }
        return book;
      });
      return [...newState];
    }
    case booksContants.DELETE_BOOK: {     
      const newState = state.filter((book:IBook) => {
        return book.id !== action.bookId
      })     
      return [...newState]
    }
    default:
      return state;
  }
}

export default books;
