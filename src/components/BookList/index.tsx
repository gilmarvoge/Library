import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Grid, Tooltip, Card, CardHeader, CardContent, CardActions, IconButton } from '@material-ui/core';
import { Visibility as VisibilityIcon, Delete as DeleteIcon, MenuBook as MenuBookIcon, Edit as EditIcon } from '@material-ui/icons';
import { SnackBar, BookDetails } from 'components';
import { setDeletedBook, setDeletedRent, setRent } from 'redux/actions';
import { deleteBook, addRent, deleteRent } from 'services';
import { IBook, IRent, IRents, IBooks } from 'models';
import './styles.css';

interface BookListProps {
  books: IBooks;
  rents: IRents;
  userId: string;
}

function BookList(props: BookListProps) {
  const { books, rents, userId } = props;
  const { push } = useHistory();
  const dispatch = useDispatch();
  const [snack, setSnack] = useState({ open: false, type: '', message: '' });
  const [showDetails, setShowDetails] = useState({ open: false, book: {} });

  const handleDeleteBook = async (id: string, bookOwnerRent: string) => {
    if (bookOwnerRent !== 'UNAVAILABLE') {
      try {
        const response = await deleteBook(id);
        if (response.data) {
          const rentFilter = rents.filter((rent: IRent) => rent.book_id === id);
          //deletar aluguel vinculado ao book
          if (rentFilter.length > 0) {
            const rent = Object.assign({}, ...rentFilter)
            await deleteRent(rent.id);
          }
          dispatch(setDeletedBook(id));
          setSnack({ open: true, type: 'success', message: 'Livro excluído com sucesso' });
        }
      } catch (error) {
        setSnack({ open: true, type: 'error', message: error });
      }
    }
    else
      setSnack({ open: true, type: 'warning', message: 'Você não pode remover um livro alugado' });
  }

  const handleEditBook = (id: string, bookOwnerRent: string) => {
    if (bookOwnerRent !== 'UNAVAILABLE')
      push(`/edit/${id}`);
    else
      setSnack({ open: true, type: 'warning', message: 'Você não pode editar um livro alugado' });
  }

  const handleRentBook = async (book: IBook, bookOwnerRent: string) => {
    if (bookOwnerRent !== 'UNAVAILABLE') {
      const rentFilter = rents.filter((rent: IRent) => rent.book_id === book.id);

      if (rentFilter.length > 0) {
        const rent = Object.assign({}, ...rentFilter)
        const response = await deleteRent(rent.id);
        if (response.data) {
          dispatch(setDeletedRent(rent.id));
          setSnack({ open: true, type: 'success', message: `Você devolveu o livro ${book.title}` });
        }
      }
      else {
        const rentBook = { book_id: String(book.id), user_id: userId }
        const response = await addRent(rentBook);
        if (response.data) {
          dispatch(setRent(response.data));
          setSnack({ open: true, type: 'success', message: `Você alugou o livro ${book.title}` });
        }
      }
    } else
      setSnack({ open: true, type: 'warning', message: 'Este livro está alugado' });
  }

  const filterHasbooksRented = (bookId: string) => {
    //Testar se usuário logado é o dono do aluguel do livro, ou está alugado por outro user,
    //ou está disponível para aluguel
    const rentedbooks = rents.filter((rent: IRent) => rent.book_id === bookId);
    if (rentedbooks.length) {
      const rented = rents.filter((rent: IRent) => rent.book_id === bookId && rent.user_id === userId)
      if (rented.length)
        return 'RENTED';
      else
        return 'UNAVAILABLE';
    }
    else
      return 'AVAILABLE';
  }

  return (
    <Grid container spacing={2} justify='center' >
      {showDetails && <BookDetails open={showDetails.open} book={showDetails.book} onClose={setShowDetails} />}
      {books && books.map((book: IBook) => {
        const bookOwnerRent = filterHasbooksRented(String(book.id));
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
                <Tooltip title={`${bookOwnerRent === 'RENTED' ?
                  'Devolver livro' : bookOwnerRent === 'UNAVAILABLE' ?
                    'Livro não disponível' : 'Alugar livro'}`}
                  placement='bottom'
                >
                  <IconButton aria-label='rent book' onClick={() => handleRentBook(book, bookOwnerRent)}>
                    <MenuBookIcon
                      classes={{
                        root: `${bookOwnerRent === 'RENTED' ?
                          'rent-icon-sucess' : bookOwnerRent === 'UNAVAILABLE' ?
                            'rent-icon-warning' : ''}`
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Mais Informações' placement='bottom'>
                  <IconButton onClick={() => setShowDetails({ open: true, book })}>
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        )
      })}
      {
        snack.open &&
        < SnackBar open={snack.open} type={snack.type} message={snack.message} onClose={setSnack} />
      }
    </Grid>
  )
}

export default connect()(BookList);
