import React from 'react';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logoff } from 'services/auth';
import logo from '../../assets/logo.svg';
import './styles.css';

interface HeaderProps {
  right?: Boolean,
  left?: Boolean,
  search?: React.ReactNode;
}

function Header(props: HeaderProps) {
  const { search, right, left } = props;
  let { push } = useHistory();

  const signOut = () => {
    logoff();
    push('/login');
  }

  return (
    <div id='page-header'>
      <header data-testid='header'>
        <div className='header-logo'>
          <div className='header-actions-start'>
            {left &&
              <Tooltip title='Voltar' placement='bottom'>
                <IconButton onClick={() => push('/')}>
                  <ArrowBackIcon fontSize='large' />
                </IconButton>
              </Tooltip>
            }
          </div>
          <div className='header-logo-title'>
            <img src={logo} alt='Biblioteca' />
            <span className='span'>
              Biblioteca
            </span>
          </div>
        </div>
        <div className='header-search'>
          {search}
        </div>
        <div className='header-actions-end'>
          {right &&
            <Tooltip title='Sair' placement='bottom'>
              <IconButton onClick={signOut} >
                <ExitToAppIcon fontSize='large' />
              </IconButton>
            </Tooltip>
          }
        </div>
      </header>
    </div>
  )
}

export default Header;



