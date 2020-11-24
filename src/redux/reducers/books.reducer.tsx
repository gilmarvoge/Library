import { booksContants } from 'redux/constants';
import {books as initialBooks} from 'services/mocks';

const books = (state = initialBooks, action: any) => {
  switch (action.type) {
    case booksContants.GET_ALL_BOOKS: {
      return [...action.books];
    }
    case booksContants.GET_BOOK_BY_ID: {
      const book = state.filter(book => {
        return book.id === action.bookId // return all the posts not matching the action.post.id
      })
      return [...book];
    }
    case booksContants.ADD_BOOK: {
      return [...state, action.book];
    }

    case booksContants.EDIT_BOOK_BY_ID: {
      const newState = state.map(book => {
        if (book.id === action.book.id) {
          return action.book;
        }
        return book;
      });    
      return [...newState];
    }
    case booksContants.DELETE_BOOK: {
      const newState = state.filter(book => {
        return book.id !== action.bookId
      })    
      return [...newState]
    }
    default:
      return state;
  }
}

export default books;
