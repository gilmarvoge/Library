import { booksContants } from 'redux/constants';

const initialBooks = [
  {
    id: '7aa71482-d66e-4b47-a8b3-b7a08a3fb426',
    autor: 'William E. Shotts, Jr.',
    title: 'The Linux Command Line',
    description: 'The Linux Command Line takes you from your very first terminal keystrokes to writing full programs in Bash, the most popular Linux shell.',
    image: 'http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
  },
  {
    id: '9f34a955-5636-49f3-b319-4bb54343c242',
    autor: 'Artemij Fedosejev',
    title: 'React.js Essentials',
    description: 'Build maintainable and performant user interfaces for your web applications using React.js',
    image: 'http://books.google.com/books/content?id=Rhl1CgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
  },
  {
    id: '443bf367-5ff4-4d0c-92f1-8806458848d1',
    autor: 'Artemij Fedosejev',
    title: 'Adam Boduch',
    description: 'Build maintainable and performant user interfaces for your web applications using React.js',
    image: 'http://books.google.com/books/content?id=r9JJvgAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
  },


]


const books = (state = initialBooks, action: any) => {
  switch (action.type) {
    case booksContants.GET_ALL_BOOKS: {
      const { BOOKS } = action;
      return [...BOOKS];
    }
    case booksContants.GET_BOOK_BY_ID:
      {
        return { ...action.BOOK };
      }
    case booksContants.ADD_BOOK: {
      return state.concat(action.BOOK)
    }

    case booksContants.EDIT_BOOK_BY_ID: {
      return { ...state };
    }
    case booksContants.DELETE_BOOK: {
      const newState = state.filter(BOOK => {
        return BOOK.id !== action.BOOK.id
      })
      return [...newState]
    }
    default:
      return state;
  }
}

export default books;
