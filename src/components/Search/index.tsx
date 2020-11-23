import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IBook } from 'models';
import './styles.css';

export interface Props {
  books: [];
  setFilteredBooks: Function;
}

const SearchBookPage = ((props: Props) => {
  const { books, setFilteredBooks } = props;
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: FormEvent<HTMLInputElement>) => { 
    setSearchTerm(event.currentTarget.value);
  };

  useEffect(() => {
    if (searchTerm !== '') {
      const results = books.filter((book: IBook) =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
      );
      setFilteredBooks(results);
    }
  }, [searchTerm]);

  return (
    <div className='search-books-bar'>
      <Link to='/' className='close-search'>Close </Link>
      <div className='search-books-input-wrapper'>
        <input type='text' placeholder='Pesquise por título ou autor'
          onChange={handleChange}
        />
      </div>
    </div>
  )
});

export default SearchBookPage;