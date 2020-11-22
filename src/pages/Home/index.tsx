import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Snackbar from '@material-ui/core/Snackbar';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import AddIcon from '@material-ui/icons/Add';
import Header from 'components/Header';
import { Alert } from 'components';
import { booksActions } from 'redux/actions';
import { IBooks, IBook } from 'models';

import './styles.css';

function Home(props: any) {
    const { books, dispatch } = props;
    const { push } = useHistory();
    const [messages, setMessages] = useState('');

    const getAllBooks = () => {
        dispatch(booksActions.getAllBooks());
    }

    const deleteBook = (id: string) => {
        dispatch(booksActions.deleteBook(id));
    }

    const rentBook = (id: string) => {
        dispatch(booksActions.deleteBook(id));
    }

    useEffect(() => {
        getAllBooks();
    }, []);

    return (
        <div id='page-home'>
            <Header />
            <div className="content">
                {books.map((book: IBook) => (
                    <Card key={book.id}
                        classes={{
                            root: 'card-root', // class name, e.g. `classes-nesting-root-x`
                        }}
                    >
                        <CardHeader
                            action={
                                <>
                                    <Tooltip title="Editar livro" placement="bottom">
                                        <IconButton aria-label="edit" onClick={() => push(`/edit/${book.id}`)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Excluir livro" placement="bottom">
                                        <IconButton aria-label="delete" onClick={() => deleteBook(book.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            }
                            title={book.title}
                            subheader={book.author}
                        />
                        <CardMedia
                            className="media"
                            src={book.image_url}
                        // title="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {book.image_url}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Tooltip title="Alugar livro" placement="bottom">
                                <IconButton aria-label="rent book">
                                    <BookmarkIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Mais Informações" placement="bottom">
                                <IconButton aria-label="share">
                                    <VisibilityIcon />
                                </IconButton>
                            </Tooltip>

                        </CardActions>
                        {/* <img src={book.image_url} alt="teste" />
                        <span>{ }</span> */}

                    </Card>
                ))}
            </div>
            <Tooltip title="Adicionar livro" placement="bottom">
                <Fab color="primary"
                    aria-label="add"
                    classes={{
                        root: 'fab', // class name, e.g. `classes-nesting-root-x`
                    }}
                    onClick={() => push('/create')}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            {messages &&
                <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack} >
                    <Alert severity="error" onClose={handleCloseSnack} >
                        {messages}
                    </Alert>
                </Snackbar>
            }

        </div>
    )
}

const mapStateToProps = ({ books }: { books: IBooks, }) => ({
    books: books,

});
export default connect(mapStateToProps)(Home);
