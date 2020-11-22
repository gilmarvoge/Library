import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logoff } from 'services/auth'
import logo from '../../assets/logo.svg';
import './styles.css';

export default function Header(props: any) {
  let { location, push } = useHistory();

  const logOut = () => {
    logoff();
    push('/login');
  }

  return (
    <div id='page-header'>
      <header>
        <div id='header-left'>
          {location?.pathname != '/' &&
            <Tooltip title="Voltar" placement="bottom">
              <IconButton>
                <ArrowBackIcon fontSize='large' />
              </IconButton>
            </Tooltip>
          }
          <div id='header-logo'>
            <img src={logo} alt='Biblioteca' />
            <span>
              Biblioteca
         </span>
          </div>
        </div>
        <div id='header-right'>
          <Tooltip title="Sair" placement="bottom">
            <IconButton onClick={logOut} >
              <ExitToAppIcon fontSize='large' />
            </IconButton>
          </Tooltip>
        </div>
      </header>
    </div>
  )
}


