import './Header.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ name, returnToLogin, setUser }) => {
  return (
    <header className='header'>
      <ul className='left-header'>
        <li className='header-item'>Hi, {name}!</li>
      </ul>
      <ul className='right-header'>
        <li className='header-item sign-out-button' onClick={() => {
            returnToLogin();
            setUser('');
        }}>Sign Out</li>
      </ul>
    </header>
  );
};

export default Header;
