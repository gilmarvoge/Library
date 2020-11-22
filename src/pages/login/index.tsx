import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from 'components';
import api from 'services/api';
import { login } from 'services/auth';
import './styles.css';
import logo from '../../assets/logo.svg';

interface User {
    id: number,
    user: string,
    password: string,
}

function Login(props: any) {
    const { register, handleSubmit, errors } = useForm();
    const [messages, setMessages] = useState('');
    const [openSnack, setOpenSnack] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        password: '',
    })

    function handleSubmitUser(data: any, event: any) {
        event.preventDefault();
        console.log('e ')
        // e.preventDefault();
        const { user, password } = data;
        console.log('email ', user)
        console.log('password ', password)

        const response = api.filter(api => {
            if (api.user == user && api.password == password) {
                login(String(api.id));
                props.history.push('/');
            }
            else {
                setMessages('Usuário ou senha incorretos');
                setOpenSnack(true);
            }
        });




        // const { name, email, whatsapp } = formData;
        // const uf = selectedUf;
        // const city = selectedCity;
        // const [latitude, longitude] = selectedPosition;
        // const items = selectedItems;

        // const data = {
        //     name,
        //     email,
        //     whatsapp,
        //     uf,
        //     city,
        //     latitude,
        //     longitude,
        //     items
        // }
        //await api.post('points', data) ;
        // alert('Ponto de coleta criado!');
        //history.push('/');

    }

    const handleCloseSnack = (event: any, reason: string) => {
        if (reason === 'clickaway') {
            return;
        }

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