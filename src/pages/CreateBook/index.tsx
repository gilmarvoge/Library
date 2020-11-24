import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from 'components';
import Header from 'components/Header';
import { IBooks, IBook, IUser } from 'models';
import { addBook, editBook } from 'services';
import { setBook, setEditedBook } from 'redux/actions';
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
    }, [bookId, books]);

    const handleSubmitBook = async (data: any, event: any) => {
        event.preventDefault();
        const { title, author, description, image_url } = data;
        const book = { author, title, description, image_url };
        if (title !== '' && author !== '' && description !== '' && image_url) {
            if (bookId && bookId !== '') {
                let response = await editBook(bookId, book);
                if (response.data.length)
                    dispatch(setEditedBook(bookId, book));
            } else {
                let response = await addBook(book);
                if (response.data.length)
                    dispatch(setBook(book));
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
        <div id='page-createedit-book' data-testid='create-book'>
            <Header />
            <form onSubmit={handleSubmit(handleSubmitBook)}>
                <h1>{bookId && bookId !== '' ? 'Editar livro' : 'Cadastro do livro'}</h1>
                <fieldset>
                    <div className='field'>
                        <label htmlFor='title'>Título</label>
                        <input
                            defaultValue={bookToEdit?.title}
                            name='title'
                            id='title'
                            ref={register({ required: 'Digite o nome do livro' })}
                        />
                        {errors.title && <span role='alert'> {errors.title.message}</span>}

                    </div>
                    <div className='field'>
                        <label htmlFor='author'>Autor</label>
                        <input
                            defaultValue={bookToEdit?.author}
                            name='author'
                            id='author'
                            ref={register({ required: 'Digite o nome do autor' })}
                        />
                        {errors.author && <span role='alert'> {errors.author.message}</span>}
                    </div>
                    <div className='field'>
                        <label htmlFor='description'>Descrição</label>
                        <input
                            defaultValue={bookToEdit?.description}
                            name='description'
                            id='description'
                            ref={register({ required: 'Digite a descrição do livro' })}
                        />
                        {errors.description && <span role='alert'>{errors.description.message}</span>}
                    </div>
                    <div className='field'>
                        <label htmlFor='image_url'>Link da imagem</label>
                        <input
                            defaultValue={bookToEdit?.image_url}
                            name='image_url'
                            id='image_url'
                            ref={register({ required: 'Digite o link da imagem do livro' })}
                        />
                        {errors.image_url && <span role='alert'>{errors.image_url.message}</span>}
                    </div>
                </fieldset>
                <button type='submit' data-testid='submit-button'>
                    {bookId && bookId !== '' ? 'Salvar livro' : 'Cadastrar livro'}
                </button>
            </form>
            {messages &&
                <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack} >
                    <Alert severity='error' onClose={handleCloseSnack} >
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
