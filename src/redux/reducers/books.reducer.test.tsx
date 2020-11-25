import { booksContants } from 'redux/constants';
import books from './books.reducer';

const booksMoc = [
  {
    'id': '1',
    'author': 'Vipul A MPrathamesh Sonpatki',
    'title': 'ReactJS by Example - Building Modern Web Applications with React',
    'year': '2020',
    'description': 'Get up and running with ReactJS by developing five cutting-edge and responsive projects About This Book * Create pragmatic real-world applications while learning React and its modern developer tools ',
    'pages': '414',
    'image_url': 'http://books.google.com/books/content?id=vSLlCwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api'
  }]

describe('books reducer', () => {
  test('should handle SET_ALL_BOOKS', () => {
    const setAction = {
      type: booksContants.SET_ALL_BOOKS,
      books: booksMoc,
    };
    expect(books([], setAction)).toEqual(booksMoc);
  });
})


