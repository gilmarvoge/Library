import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo.svg';

const Login = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    })

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

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
        //await api.post('points', data);
        alert('Ponto de coleta criado!');
        //history.push("/");

    }


    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value })
    }
    return (
        <div id="page-login">
            <div className="content">
                {/* <header>
                    <img src={logo} alt="Biblioteca" />
                </header> */}
                <main>                   
                    <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                        <fieldset>
                            <div className="field">
                                <label htmlFor="name">Usuario</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="name">Senha</label>
                                <input
                                    type="password"
                                    name="name"
                                    id="name"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </fieldset>
                        <Link to="/create-point">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Entrar</strong>
                    </Link>
                    </form>
                  
                </main>
            </div>
        </div>
    )
}

export default Login;