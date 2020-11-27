import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Fab, Tooltip} from '@material-ui/core';
import {  Add as AddIcon } from '@material-ui/icons';
import Header from 'components/Header';
import BookList from 'components/BookList';
import SearchBar from 'components/SearchBar';
import { SnackBar } from 'components';
import { getBooks, getUserIdStorage, getRents } from 'services';
import {  setAllRents, setAllBooks } from 'redux/actions';
import { IBooks, IBook, IRents } from 'models';
import './styles.css';

function Home(props: any) {
  const { books, rents, dispatch } = props;
  const { push } = useHistory();
  const [userId, setUserId] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [querySearch, setQuerySearch] = useState('');
  const [snack, setSnack] = useState({ open: false, type: '', message: '' });

  const getAllBooks = useCallback(async () => {
    try {
      const responseBooks = await getBooks();
      if (responseBooks.data) {
        dispatch(setAllBooks(responseBooks.data));
        setFilteredBooks(responseBooks.data);
        const response = await getRents();
        if (response.data)
          dispatch(setAllRents(response.data));

        const user_id = await getUserIdStorage();
        setUserId(String(user_id));
      }
    } catch (error) {
      setSnack({ open: true, type: 'error', message: error });
    }
  }, [dispatch]);

  useEffect(() => {
    const results = books.filter((book: IBook) =>
      book.title.toLowerCase().includes(querySearch.toLowerCase()) ||
      book.author.toLowerCase().includes(querySearch.toLowerCase())
    );
    setFilteredBooks(results);
  }, [querySearch, books]);

  useEffect(() => {
    getAllBooks();
  }, [getAllBooks]);

  const handleSearch = useCallback((e) => {
    setQuerySearch(e.target.value);
  }, []);

  return (
    <div id='page-home' data-testid='home'>
      <Header search={<SearchBar onChange={handleSearch} />}
      />
      <div className='content'>
        {/* <BookList
          filteredBooks={filteredBooks}
          userId={userId}
          rents={rents}
        /> */}
      </div>
      <Tooltip title='Adicionar livro' placement='bottom'>
        <Fab
          color='primary'
          aria-label='add'
          classes={{
            root: 'fab',
          }}
          onClick={() => push('/create')}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      {
        snack.open &&
        < SnackBar open={snack.open} type={snack.type} message={snack.message} onClose={setSnack} />
      }
    </div >
  )
}

const mapStateToProps = ({ books, rents }: { books: IBooks, rents: IRents }) => ({
  books,
  rents
});

export default connect(mapStateToProps)(Home);
