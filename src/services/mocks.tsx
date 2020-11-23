//Dados Fictcios
export const users = [
  {
    id: 1,
    user: "gilmar",
    password: "12345",
  },
  {
    id: 2,
    user: "soft",
    password: "012345",
  }
];

export const books = [
  {
    id: '7aa71482-d66e-4b47-a8b3-b7a08a3fb426',
    author: 'William E. Shotts, Jr.',
    title: 'The Linux Command Line',
    description: 'The Linux Command Line takes you from your very first terminal keystrokes to writing full programs in Bash, the most popular Linux shell.',
    image_url: 'http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
  },
  {
    id: '9f34a955-5636-49f3-b319-4bb54343c242',
    author: 'Artemij Fedosejev',
    title: 'React.js Essentials',
    description: 'Build maintainable and performant user interfaces for your web applications using React.js',
    image_url: 'http://books.google.com/books/content?id=Rhl1CgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
  },
  {
    id: '443bf367-5ff4-4d0c-92f1-8806458848d1',
    author: 'Artemij Fedosejev',
    title: 'Getting Started with React Native',
    description: 'Building web applications with maintainable and performant user interfaces is a challenge that many have faced for more than a decade, but no one has risen to this challenge quite like React.js. Today React.js is used by Facebook, Instagram, Khan Academy.',
    image_url: 'http://books.google.com/books/content?id=274fCwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
  },
  {
    id: '036d85db-dcea-40b3-b120-0acf5277ccbf',
    author: 'Harmeet SinghMehul Bhatt',
    title: 'Learning Web Development with React and Bootstrap',
    description: 'Build maintainable and performant user interfaces for your web applications using React.js',
    image_url: 'http://books.google.com/books/content?id=r9JJvgAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
  },
  {
    id: 'bbb67f51-4174-44f6-99d1-957eff015402',
    author: 'Vipul A MPrathamesh Sonpatki',
    title: 'ReactJS by Example - Building Modern Web Applications with React',
    description: 'Get up and running with ReactJS by developing five cutting-edge and responsive projects About This Book * Create pragmatic real-world applications while learning React and its modern developer tools ',
    image_url: 'http://books.google.com/books/content?id=vSLlCwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
  },
];

export const rents = [
  {
    book_id: '443bf367-5ff4-4d0c-92f1-8806458848d1',
    user_id: '1',
  },
  {
    book_id: '7aa71482-d66e-4b47-a8b3-b7a08a3fb426',
    user_id: '2',
  },
  {
    book_id: '9f34a955-5636-49f3-b319-4bb54343c242',
    user_id: '2',
  },
];
