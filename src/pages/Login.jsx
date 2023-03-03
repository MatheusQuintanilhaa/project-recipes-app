import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [nulled, setNull] = useState(true);
  const [entry, setEntry] = useState({ email: '', password: '' });
  const history = useHistory();

  const handleLogin = ({ target }) => {
    const { name, value } = target;
    const { email, password } = entry;

    const minChar = 6;
    const emailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const isEmailValid = email.length >= minChar && emailValid.test(email);
    const isPasswordValid = password.length >= minChar;

    setEntry({ ...entry, [name]: value });
    setNull(!(isEmailValid && isPasswordValid));
  };

  const handleEntrySave = () => {
    localStorage.setItem('user', JSON.stringify({ email: entry.email }));
    history.push('/meals');
  };

  return (
    <div>
      <h1>Email</h1>
      <input
        type="text"
        name="email"
        id="eletronicmail"
        data-testid="email-input"
        onChange={ handleLogin }
      />
      <br />
      <h1>Password</h1>
      <input
        type="text"
        name="password"
        id="passkey"
        data-testid="password-input"
        onChange={ handleLogin }
      />
      <button
        type="button"
        name=""
        id="btn"
        data-testid="login-submit-btn"
        disabled={ nulled }
        onClick={ handleEntrySave }
      >
        Start
      </button>
    </div>
  );
}
