import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from 'services/auth'
import logo from '../../assets/logo.svg';
import './styles.css';

const Header = (props: any) => {
  return (
    <div id='page-header'>
      <header>
        <div id='header-left'>
          <Link to="/">
            <ArrowBackIcon />
              Voltar
          </Link>
          <div id='header-left'>
            <img src={logo} alt='Biblioteca' />
            <span>
              Biblioteca
         </span>
          </div>
        </div>
        <div id='header-right'>

          <ExitToAppIcon     className="icons" onClick={() => { logout() }} />
          <span>Sair</span>
 
        </div>
      </header>
    </div>
  )
}

export default Header;

