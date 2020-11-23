import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import Snackbar from '@material-ui/core/Snackbar';
import { v4 as uuidv4 } from 'uuid';
import { Alert } from 'components';
import Header from 'components/Header';
import { IBooks, IBook, IUser } from 'models';
import { booksActions } from 'redux/actions';
import './styles.css';

interface ParamTypes {
    bookId: string
}

function CreateEditBook(props: any) {
    const { push } = useHistory();
    const { bookId } = useParams<ParamTypes>();
    const { dispatch, books } = props;
    const [messages, setMessages] = useState('');
    const [bookToEdit, setBookToEdit] = useState<IBook>();
    const [openSnack, setOpenSnack] = useState(false);
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        if (bookId !== '') {
            const book = books.filter((book: IBook) => book.id === bookId);
            setBookToEdit(book[0]);
        }
    }, [bookId,books]);

    const handleSubmitBook = (data: any, event: any) => {
        event.preventDefault();
        const { title, author, description, image_url } = data;

        if (title !== '' && author !== '' && description !== '' && image_url) {
            if (bookId && bookId !== '') {
                const book = { id: bookId, author, title, description, image_url };
                dispatch(booksActions.editBookById(book));
            } else {
                const id = uuidv4()
                const book = { id, author, title, description, image_url };
                dispatch(booksActions.addBook(book));
            }
            push('/');
        }
        else {
            setMessages('Campos não preenchidos');
            setOpenSnack(true);
        }
    }

    const handleCloseSnack = (event: any, reason: string) => {
        if (reason === 'clickaway')
            return;
        setOpenSnack(false);
    };

    return (
        <div id='page-createedit-book'>
            <Header />
            <form onSubmit={handleSubmit(handleSubmitBook)}>
                <h1>{bookId && bookId !== '' ? 'Editar livro' : 'Cadastro do livro'}</h1>
                <fieldset>
                    <div className='field'>
                        <label htmlFor='name'>Nome</label>
                        <input
                            defaultValue={bookToEdit?.title}
                            type='text'
                            name='title'
                            id='title'
                            ref={register({ required: 'Digite o nome do livro' })}
                        />
                        {errors.title && errors.title?.message}
                    </div>
                    <div className='field'>
                        <label htmlFor='name'>Autor</label>
                        <input
                            defaultValue={bookToEdit?.author}
                            type='text'
                            name='author'
                            id='author'
                            ref={register({ required: 'Digite o nome do autor' })}
                        />
                        {errors.author && errors.author?.message}
                    </div>
                    <div className='field'>
                        <label htmlFor='name'>Descrição</label>
                        <input
                            defaultValue={bookToEdit?.description}
                            type='text'
                            name='description'
                            id='description'
                            ref={register({ required: 'Digite a descrição do livro' })}
                        />
                        {errors.description && errors.description?.message}
                    </div>
                    <div className='field'>
                        <label htmlFor='name'>Link da imagem</label>
                        <input
                            defaultValue={bookToEdit?.image_url}
                            type='text'
                            name='image_url'
                            id='image_url'
                            ref={register({ required: 'Digite o link da imagem do livro' })}
                        />
                        {errors.image_url && errors.image_url?.message}
                    </div>
                </fieldset>
                <button type='submit'>
                    {bookId && bookId !== '' ? 'Salvar livro' : 'Cadastrar livro'}
                </button>
            </form>
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

const mapStateToProps = ({ books, authentication }: { books: IBooks, authentication: IUser }) => ({
    books: books,
    user: authentication,
});

export default connect(mapStateToProps)(CreateEditBook);
