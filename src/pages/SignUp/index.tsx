import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiSmile } from 'react-icons/fi';
import { SnackBar, Header } from 'components';
import { addUser, validateUser } from 'services';

function SignUp() {
    const { register, handleSubmit, errors, reset } = useForm();
    const [snack, setSnack] = useState({ open: false, type: '', message: '' });

    const handleSubmitUser = async (data: any, event: any) => {
        event.preventDefault();
        const { user, password } = data;
        try {
            const newUser = { user, password };
            const responseValidate = await validateUser(user);
            if (responseValidate.data.length)
                setSnack({ open: true, type: 'error', message: 'Exte usuário já possui cadastro' });
            else {
                const response = await addUser(newUser);
                if (response.data) {
                    reset();
                    setSnack({ open: true, type: 'success', message: 'Usuário cadastrado com sucesso' });
                } else
                    setSnack({ open: true, type: 'error', message: `Não foi possível realizar o cadastro ${response.status} ${response.statusText}` });
            }
        } catch (error) {
            setSnack({ open: true, type: 'error', message: `Não foi possível realizar o cadastro ${error}` });
        }
    }

    return (
        <div id='page-login'>
            <Header />
            <div id='page-login-content'>
                <form id='formuser' onSubmit={handleSubmit(handleSubmitUser)}>
                    <header>
                        <h1>Crie sua conta</h1>
                    </header>
                    <fieldset>
                        <div className='field'>
                            <label htmlFor='user'>Usuário</label>
                            <input
                                type='text'
                                name='user'
                                id='user'
                                ref={register({ required: 'Digite um usuário' })}
                            />
                            {errors.user && <span role="alert">{errors.user.message}</span>}
                        </div>
                        <div className='field'>
                            <label htmlFor='password'>Senha</label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                ref={register({ required: 'Digite uma senha' })}
                            />
                            {errors.password && <span role="alert">{errors.password.message}</span>}
                        </div>
                    </fieldset>
                    <button type='submit'>
                        <span>
                            <FiSmile />
                        </span>
                        <strong>Cadastrar</strong>
                    </button>
                    <div id='page-login-criar'>Já possui cadastro?
                        <Link to='/login'> Login</Link>
                    </div>
                </form>
                {
                    snack.open &&
                    < SnackBar
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

export default SignUp;
