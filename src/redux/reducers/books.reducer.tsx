import { booksContants } from 'redux/constants';

const initialBooks = [
  {
    id: '7aa71482-d66e-4b47-a8b3-b7a08a3fb426',
    userRentId:'',
    author: 'William E. Shotts, Jr.',
    title: 'The Linux Command Line',
    description: 'The Linux Command Line takes you from your very first terminal keystrokes to writing full programs in Bash, the most popular Linux shell.',
    image_url: 'http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
  },
  {
    id: '9f34a955-5636-49f3-b319-4bb54343c242',
    userRentId:'',
    author: 'Artemij Fedosejev',
    title: 'React.js Essentials',
    description: 'Build maintainable and performant user interfaces for your web applications using React.js',
    image_url: 'http://books.google.com/books/content?id=Rhl1CgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
  },
  {
    id: '443bf367-5ff4-4d0c-92f1-8806458848d1',
    userRentId:'',
    author: 'Artemij Fedosejev',
    title: 'Adam Boduch',
    description: 'Build maintainable and performant user interfaces for your web applications using React.js',
    image_url: 'http://books.google.com/books/content?id=r9JJvgAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
  },
]

const books = (state = initialBooks, action: any) => {
  switch (action.type) {
    case booksContants.GET_ALL_BOOKS: {
      return [...state];
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
      console.log("ddeeee",newState)
      return [...newState]
    }
    default:
      return state;
  }
}

export default books;
