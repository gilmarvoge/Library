import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import Snackbar from '@material-ui/core/Snackbar';
import { v4 as uuidv4 } from 'uuid';
import { Alert } from 'components';

import Header from 'components/Header';
import { IBooks } from 'models';
import { booksActions } from 'redux/actions';
import './styles.css';


function CreateEditBook(props: any) {
    const { push } = useHistory();
    const { dispatch } = props;
    console.log('propsr', props)
    const { register, handleSubmit, errors } = useForm();
    const [messages, setMessages] = useState('');
    const [editPage, setEditPage] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);

    function handleSubmitBook(data: any, event: any) {
        console.log('entrou enviar')

        event.preventDefault();
        const { title, author, description, image_url } = data;

        if (title != '' && author != '' && description != '' && image_url) {
            console.log('data enviar', data)

            const id = uuidv4()
            const book = { id, author, title, description, image_url };
            dispatch(booksActions.addBook(book));

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
                <h1>Cadastro do livro</h1>
                <fieldset>
                    <div className='field'>
                        <label htmlFor='name'>Nome</label>
                        <input
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
                            type='text'
                            name='image_url'
                            id='image_url'
                            ref={register({ required: 'Digite o link da imagem do livro' })}
                        />
                        {errors.image_url && errors.image_url?.message}
                    </div>
                </fieldset>
                <button type='submit'>
                    Cadastrar livro
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


const mapStateToProps = ({ books }: { books: IBooks }) => ({
    book: books,
});

export default connect(mapStateToProps)(CreateEditBook);
