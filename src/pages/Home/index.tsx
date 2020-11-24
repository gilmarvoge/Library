import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Fab, Grid, Tooltip, Card, CardHeader, Snackbar,
  CardContent, CardActions, IconButton
} from '@material-ui/core';
import {
  Visibility as VisibilityIcon, Delete as DeleteIcon,
  MenuBook as MenuBookIcon, Edit as EditIcon, Add as AddIcon
} from '@material-ui/icons';
import Dialogs from 'components/Dialogs';
import Header from 'components/Header';
import Search from 'components/Search';
import { Alert } from 'components';
import { getBooks, deleteBook, getUserIdStorage, getRents, addRent, deleteRent } from 'services';
import { setDeletedBook, setAllRents, setAllBooks, setDeletedRent, setRent } from 'redux/actions';
import { IBooks, IBook, IRent, IRents } from 'models';
import './styles.css';

function Home(props: any) {
  const { books, rents, dispatch, authentication } = props;
  const { push } = useHistory();
  const [openSnack, setOpenSnack] = useState(false);
  const [userId, setUserId] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showMore, setShowMore] = useState({ open: false, book: {} });
  const [snackType, setSnackType] = useState('');
  const [messages, setMessages] = useState('');

  const getAllBooks = async () => {
    const responseBooks = await getBooks();
    if (responseBooks.data.length)
      dispatch(setAllBooks(responseBooks.data));

    const response = await getRents();
    if (response.data.length)
      dispatch(setAllRents(response.data));

    const user_id = await getUserIdStorage();
    setUserId(String(user_id)); 
  }
  useEffect(() => {
    getAllBooks();
  }, [userId]);

  const handleDeleteBook = async (id: string, bookOwnerRent: string) => {
    if (bookOwnerRent === 'available' || bookOwnerRent === 'mine') {
      const response = await deleteBook(id);
      if (response.data.length)
        dispatch(setDeletedBook(id));
    }
    else {
      setSnackType('warning');
      setOpenSnack(true);
      setMessages('Você não pode remover um livro alugado');
    }
  }

  const handleEditBook = (id: string, bookOwnerRent: string) => {
    if (bookOwnerRent === 'available' || bookOwnerRent === 'mine')
      push(`/edit/${id}`);
    else {
      setSnackType('warning');
      setOpenSnack(true);
      setMessages('Você não pode editar um livro alugado');
    }
  }

  const filterHasBooksRented = (bookId: string) => {
    const rentedBooks = rents.filter((rent: IRent) => rent.book_id === bookId);
    if (rentedBooks.length) {
      const rented = rents.filter((rent: IRent) => rent.book_id === bookId && rent.user_id === authentication.id)
      if (rented.length)
        return 'mine';
      else
        return 'other';
    }
    else
      return 'available';
  }

  const handleRentBook = async (book: IBook, bookOwnerRent: string) => {
    if (bookOwnerRent === 'available') {
      const rentBook = { book_id: String(book.id), user_id: userId }
      const response = await addRent(rentBook);
      if (response.data.length) {
        dispatch(setRent(rentBook));
        setSnackType('success'); 
        setOpenSnack(true);
        setMessages(`Você alugou o livro ${book.title}`);
      }
    }
    else if (bookOwnerRent === 'mine') {
      const rent = rents.filter((rent: IRent) => rent.book_id === book.id);
      const response = await deleteRent(rent.id);
      if (response.data.length) {
        dispatch(setDeletedRent(rent.id));
        setSnackType('success');
        setOpenSnack(true);
        setMessages(`Você devolveu o livro ${book.title}`)
      }
    }
    else {
      setSnackType('warning');
      setOpenSnack(true);
      setMessages('Este livro está alugado');
    }
  }

  const handleCloseSnack = (event: any, reason: string) => {
    if (reason === 'clickaway')
      return;
    setOpenSnack(false);
  };

  return (
    <div id='page-home'>
      <Header search={<Search books={books} setFilteredBooks={(filtered: []) => setFilteredBooks(filtered)} />} />
      {showMore && <Dialogs open={showMore.open} book={showMore.book} close={() => setShowMore({ open: false, book: {} })} />}
      <div className='content'>
        <Grid container spacing={2} justify='center' >
          {(filteredBooks.length ? filteredBooks : books).map((book: IBook) => {
            const bookOwnerRent = filterHasBooksRented(String(book.id));
            return (
              <Grid item key={book.id}>
                <Card
                  classes={{
                    root: 'card-root',
                  }}
                >
                  <CardHeader
                    classes={{
                      root: 'card-header-root',
                      title: 'card-header-title',
                      subheader: 'card-header-subheader',
                      action: 'card-header-action',
                    }}
                    action={
                      <>
                        <Tooltip title='Excluir livro' placement='bottom'>
                          <IconButton aria-label='delete' onClick={() => handleDeleteBook(String(book.id), bookOwnerRent)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Editar livro' placement='bottom'>
                          <IconButton aria-label='edit' onClick={() => handleEditBook(String(book.id), bookOwnerRent)}>
                            <EditIcon /> 
                          </IconButton>
                        </Tooltip>
                      </>
                    }
                    title={book.title}
                    subheader={book.author}
                  />
                  <CardContent
                    classes={{
                      root: 'card-content-root',
                    }}
                  >
                    <img src={book.image_url} className='media' alt='' />
                  </CardContent>
                  <CardActions
                    classes={{
                      root: 'card-actions',
                    }}
                    disableSpacing
                  >
                    <Tooltip title={`${bookOwnerRent === 'mine' ?
                      'Livro alugado' : bookOwnerRent === 'other' ?
                        'Livro não disponível' : 'Alugar livro'}`}
                      placement='bottom'
                    >
                      <IconButton aria-label='rent book' onClick={() => handleRentBook(book, bookOwnerRent)}>
                        <MenuBookIcon
                          classes={{
                            root: `${bookOwnerRent === 'mine' ?
                              'rent-icon-sucess' : bookOwnerRent === 'other' ?
                                'rent-icon-warning' : ''}`
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Mais Informações' placement='bottom'>
                      <IconButton onClick={() => setShowMore({ open: true, book })}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </div>
      <Tooltip title='Adicionar livro' placement='bottom'>
        <Fab color='primary'
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
        messages &&
        <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack} >
          <Alert severity={snackType} onClose={handleCloseSnack} >
            {messages}
          </Alert>
        </Snackbar>
      }
    </div>
  )
}

const mapStateToProps = ({ books, rents }: { books: IBooks, rents: IRents }) => ({
  books,
  rents
});

export default connect(mapStateToProps)(Home);
