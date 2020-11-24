import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logoff } from 'services/auth';
import logo from '../../assets/logo.svg';
import './styles.css';

function Header(props: any) {
  const { search, dispatch } = props;
  let { location, push } = useHistory();

  const signOut = () => {
    logoff();
    push('/login');
  }

  return (
    <div id='page-header'>
      <header>
        <div id='header-flex'>
          {location?.pathname !== '/' &&
            <Tooltip title='Voltar' placement='bottom'>
              <IconButton onClick={() => push('/')}>
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
        <div id='header-flex'>
          {search}
        </div>
        <div id='header-flex' >
          <Tooltip title='Sair' placement='bottom'>
            <IconButton onClick={signOut} >
              <ExitToAppIcon fontSize='large' />
            </IconButton>
          </Tooltip>
        </div>
      </header>
    </div>
  )
}

export default connect()(Header);



