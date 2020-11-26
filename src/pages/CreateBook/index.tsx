import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import Header from 'components/Header';
import { SnackBar } from 'components';
import { IBooks, IBook } from 'models';
import { addBook, editBook } from 'services';
import { setBook, setEditedBook } from 'redux/actions';
import { isValidUrl, urlImageNotFound } from 'utils'
import './styles.css';

interface ParamTypes {
    bookId: string
}

function CreateEditBook(props: any) {
    const { push } = useHistory();
    const { bookId } = useParams<ParamTypes>();
    const { dispatch, books } = props;
    const [snack, setSnack] = useState({ open: false, type: '', message: '' });
    const [bookToEdit, setBookToEdit] = useState<IBook>();
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        if (bookId !== '') {
            const book = books.filter((book: IBook) => book.id === bookId);
            setBookToEdit(book[0]);
        }
    }, [bookId, books]);

    const handleSubmitBook = async (data: any, event: any) => {
        event.preventDefault();

        let { title, author, description, image_url } = data;
        const checkImageUrl = isValidUrl(image_url);
        if (!checkImageUrl)
            image_url = urlImageNotFound;
        const book = { id: bookId, author, title, description, image_url };
        if (title !== '' && author !== '' && description !== '' && image_url) {
            if (bookId && bookId !== '') {

                let response = await editBook(bookId, book);
                if (response.data) {
                    dispatch(setEditedBook(bookId, book));
                }
            } else {
                let response = await addBook(book);
                if (response.data)
                    dispatch(setBook(response.data));
            }
            push('/');
        }
        else
            setSnack({ open: true, type: 'error', message: 'Campos não preenchidos' });

    }


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
                            type='text'
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
                            type='text'
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
                            type='text'
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
                            type='text'
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
            {
                snack.open &&
                <SnackBar open={snack.open} type={snack.type} message={snack.message} onClose={setSnack} />
            }
        </div>
    )
}

const mapStateToProps = ({ books }: { books: IBooks }) => ({
    books: books
});

export default connect(mapStateToProps)(CreateEditBook);
