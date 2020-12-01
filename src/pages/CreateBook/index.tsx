import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { FiBook, FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { SnackBar, Header } from 'components';
import { IBooks, IBook } from 'models';
import { addBook, editBook } from 'services';
import { setBook, setEditedBook } from 'redux/actions';
import { isValidUrl, urlImageNotFound } from 'utils'
import './styles.css';

interface ParamTypes {
    bookId: string
}

interface CreateEditBookProps {
    books: IBooks;
}

function CreateEditBook(props: CreateEditBookProps) {
    const dispatch = useDispatch();
    const { bookId } = useParams<ParamTypes>();
    const { books } = props;
    const [snack, setSnack] = useState({ open: false, type: '', message: '' });
    const [bookToEdit, setBookToEdit] = useState<IBook>();
    const { register, handleSubmit, reset, errors } = useForm();

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
        if (title && author && description && image_url) {
            if (bookId) {
                let response = await editBook(bookId, book);
                if (response.data) {
                    dispatch(setEditedBook(bookId, book));
                    setSnack({ open: true, type: 'success', message: 'Livo editado com sucesso' });
                }
            } else {
                let response = await addBook(book);
                if (response.data){
                    dispatch(setBook(response.data));
                    setSnack({ open: true, type: 'success', message: 'Livo cadastrado com sucesso' });
                }
            }
            reset();            
        }
        else
            setSnack({ open: true, type: 'error', message: 'Campos não preenchidos' });
    }

    return (
        <div id='page-createedit-book' data-testid='create-book'>
            <Header left right />
            < div id='page-createedit-book-content'>
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
                        <span>
                            {bookId ? <FiSave /> : <FiBook />}
                        </span>
                        <strong>  {bookId ? 'Salvar livro' : 'Cadastrar livro'}</strong>
                    </button>
                </form>
                {
                    snack.open &&
                    <SnackBar
                        open={snack.open}
                        type={snack.type}
                        message={snack.message}
                        onClose={setSnack}
                    />
                }
            </div>
        </div>
    )
}

const mapStateToProps = ({ books }: { books: IBooks }) => ({
    books: books
});

export default connect(mapStateToProps)(CreateEditBook);
