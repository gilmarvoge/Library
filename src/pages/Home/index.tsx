import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Fab, Grid, Tooltip, Card, CardHeader, Snackbar,
  CardContent, CardActions,IconButton 
} from '@material-ui/core';
import {
  Visibility as VisibilityIcon, Delete as DeleteIcon, 
  MenuBook as MenuBookIcon, Edit as EditIcon, Add as AddIcon
} from '@material-ui/icons';
import Dialogs from 'components/Dialogs';
import Header from 'components/Header';
import Search from 'components/Search';
import { Alert } from 'components';
import {fetchBooks} from 'services';
import { booksActions, rentsActions } from 'redux/actions';
import { IBooks, IBook, IUser, IRent, IRents } from 'models';
import './styles.css';

function Home(props: any) {
  const { books, rents, dispatch, authentication } = props;
  const { push } = useHistory();
  const [openSnack, setOpenSnack] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showMore, setShowMore] = useState({ open: false, book: {} });
  const [snackType, setSnackType] = useState('');
  const [messages, setMessages] = useState('');

  useEffect(() => {
    fetchBooks().then(response => {
    dispatch(booksActions.getAllBooks(response.data));
    })
  }, [dispatch]);

  const deleteBook = (id: string, bookOwnerRent: string) => {
    if (bookOwnerRent === 'available' || bookOwnerRent === 'myne')
      dispatch(booksActions.deleteBook(id));
    else {
      setSnackType('warning');
      setOpenSnack(true);
      setMessages('Você não pode remover um livro alugado');
    }
  }

  const editBook = (id: string, bookOwnerRent: string) => {
    if (bookOwnerRent === 'available' || bookOwnerRent === 'myne')
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
        return 'myne';
      else
        return 'other';
    }
    else
      return 'available';
  }

  const rentBook = (book: IBook, bookOwnerRent: string) => {
    if (bookOwnerRent === 'available') {
      const rentBook = { book_id: book.id, user_id: authentication.id }
      dispatch(rentsActions.addRent(rentBook));
      setSnackType('success');
      setOpenSnack(true);
      setMessages(`Você alugou o livro ${book.title}`);
    }
    else if (bookOwnerRent === 'myne') {
      dispatch(rentsActions.deleteRentByBookId(book.id));
      setSnackType('success');
      setOpenSnack(true);
      setMessages(`Você devolveu o livro ${book.title}`)
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
            const bookOwnerRent = filterHasBooksRented(book.id);
            return (
              <Grid item key={book.id}>
                <Card
                  classes={{
                    root: 'card-root', // class name, e.g. `classes-nesting-root-x`
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
                          <IconButton aria-label='delete' onClick={() => deleteBook(book.id, bookOwnerRent)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Editar livro' placement='bottom'>
                          <IconButton aria-label='edit' onClick={() => editBook(book.id, bookOwnerRent)}>
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
                    <Tooltip title={`${bookOwnerRent === 'myne' ?
                      'Livro alugado' : bookOwnerRent === 'other' ?
                        'Livro não disponível' : 'Alugar livro'}`}
                      placement='bottom'
                    >
                      <IconButton aria-label='rent book' onClick={() => rentBook(book, bookOwnerRent)}>
                        <MenuBookIcon
                          classes={{
                            root: `${bookOwnerRent === 'myne' ?
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

const mapStateToProps = ({ books, authentication, rents }: { books: IBooks, authentication: IUser, rents: IRents }) => ({
  books: books,
  authentication: authentication,
  rents
});

export default connect(mapStateToProps)(Home);
