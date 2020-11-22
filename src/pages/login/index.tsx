import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Snackbar from '@material-ui/core/Snackbar';
import { FiLogIn } from 'react-icons/fi';
import { Alert } from 'components';
import api from 'services/api';
import { login } from 'services/auth';
import './styles.css';
import logo from '../../assets/logo.svg';

function Login(props: any) {
    const { push } = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const [messages, setMessages] = useState('');
    const [openSnack, setOpenSnack] = useState(false);

    function handleSubmitUser(data: any, event: any) {
        event.preventDefault();     
        const { user, password } = data;  
        const response = api.filter(api => {
            if (api.user == user && api.password == password) {
                login(String(api.id));
                push('/');
            }
            else {
                setMessages('Usuário ou senha incorretos');
                setOpenSnack(true);
            }
        });
    }

    const handleCloseSnack = (event: any, reason: string) => {
        if (reason === 'clickaway')
            return;
        
        setOpenSnack(false);
    };

    return (
        <div id='page-login'>
            <form onSubmit={handleSubmit(handleSubmitUser)}>
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

export default Login;