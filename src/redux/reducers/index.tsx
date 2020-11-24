import { combineReducers } from 'redux';
import books from './books.reducer';
import rents from './rents.reducer';

export const rootReducer = combineReducers({
  books, 
  rents
});