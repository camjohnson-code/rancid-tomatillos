import './LoginPage.css';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setUser }) => {
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [successfulLogin, setSuccessfulLogin] = useState(true);
  const navigate = useNavigate();

  const getUser = () => {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: title, password }),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else {
          clearInputs();
          throw new Error('Incorrect username or password');
        }
      })
      .then((data) => {
        setUser(data.user);
        clearInputs();
        return navigate('/movies');
      })
      .catch((error) => {
        setSuccessfulLogin(false);
      });
  };

  const submitLogin = (event) => {
    event.preventDefault();
    getUser();
  };

  function clearInputs() {
    setTitle('');
    setPassword('');
  }

  return (
    <div className='login-form'>
      <h1>Rancid Tomatillos</h1>
      <form onSubmit={submitLogin}>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='Email'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        ></input>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        ></input>
        {!successfulLogin && (
          <p>Incorrect email or password. Please try again.</p>
        )}
        <button className='submit-button' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
