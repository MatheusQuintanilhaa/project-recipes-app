import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

export default function Header({ title }) {
  const history = useHistory(); const location = useLocation();

  // Define o estado inicial do componente, e uma função para atualizá-lo
  const [getResults, setResults] = useState(
    true,
  );

  // Define uma função para lidar com o clique no botão de perfil
  const makePerfil = () => {
    history.push('/profile');
  };

  // Define uma função para lidar com o clique no botão de busca
  const searchEnable = (e) => {
    e.preventDefault();
    setResults(!getResults);
  };

  // Define uma função para renderizar o botão de busca, se estiver na página certa
  const showButton = () => {
    if (location.pathname === '/drinks' || location.pathname === '/meals') {
      return (
        <div>
          <button onClick={ searchEnable }>
            <img src={ searchIcon } alt="icon-search" data-testid="search-top-btn" />
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <h3 data-testid="page-title">{title}</h3>
      {showButton()}
      <button onClick={ makePerfil }>
        <img src={ profileIcon } alt="icon-profile" data-testid="profile-top-btn" />
      </button>
      <div>
        {!getResults && (
          <form>
            <input data-testid="search-input" type="text" placeholder="Pesquisar..." />
          </form>
        )}
      </div>
    </>
  );
}

// Define as propriedades que o componente espera receber
Header.propTypes = {
  title: PropTypes.string.isRequired,
};
