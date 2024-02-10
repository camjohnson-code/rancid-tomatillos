import './Header.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ name, returnToLogin, setUser }) => {
  return (
    <header className='header'>
      <ul className='left-header'>
        <li className='header-item'>Hi, {name}!</li>
      </ul>
      <ul className='right-header'>
        <li
          className='header-item sign-out-button'
          onClick={() => {
            returnToLogin();
            setUser('');
          }}
        >
          Sign Out
        </li>
      </ul>
    </header>
  );
};

export default Header;

Header.propTypes = {
  name: PropTypes.string.isRequired,
  returnToLogin: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};
