import { combineReducers } from 'redux';
import books from './books.reducer';
import authentication from './authentication.reducer';

export const rootReducer = combineReducers({
  books,
  authentication
});