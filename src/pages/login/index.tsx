import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import Snackbar from '@material-ui/core/Snackbar';
import { FiLogIn } from 'react-icons/fi';
import { Alert } from 'components';
import Loader from 'components/Loader';
import { login, getLogin } from 'services';
import logo from '../../assets/logo.svg';
import './styles.css';

function Login(props: any) {   
    const { push } = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const [messages, setMessages] = useState('');
    const [loading, setLoading] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);

    const handleSubmitUser = async (data: any, event: any) => {
        event.preventDefault();
        setLoading(true);        
        const { user, password } = data;
        try {
            const response = await getLogin(user, password);
            if (response.data.length) {
                const result = Object.assign({}, ...response.data);
                login(String(result.id));
                setMessages('');
                push('/');
            } else {
                setMessages('Usuário ou senha incorretos');
                setOpenSnack(true);
            }
        } catch (error) {
            setMessages(`Não foi possível realizar o login ${error}`);
            setOpenSnack(true);
        }
        setLoading(false);
    }

    const handleCloseSnack = (event: any, reason: string) => {
        if (reason === 'clickaway')
            return;
        setOpenSnack(false);
    };
    console.log("loading ", loading)
    return (
        <div id='page-login'>
            {loading && <Loader />}
            <form id='formuser' onSubmit={handleSubmit(handleSubmitUser)}>
                <header>
                    <img src={logo} alt='Biblioteca' />
                    <h1>Login</h1>
                </header>
                <fieldset>
                    <div className='field'>
                        <label htmlFor='name'>Usuario</label>
                        <input
                            type='text'
                            name='user'
                            id='user'
                            ref={register({ required: 'Digite um usuário' })}
                        />
                        {errors.user && errors.user?.message}
                    </div>
                    <div className='field'>
                        <label htmlFor='name'>Senha</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            ref={register({ required: 'Digite uma senha' })}
                        />
                        {errors.password && errors.password?.message}
                    </div>
                </fieldset>
                <button type='submit'>
                    <span>
                        <FiLogIn />
                    </span>
                    <strong>Entrar</strong>
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

export default connect()(Login);
