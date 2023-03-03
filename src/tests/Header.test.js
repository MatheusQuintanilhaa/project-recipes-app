import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import Meals from '../pages/Meals';
import renderWithRouter from './renderWithRouter/renderWithRouter';

describe('verificando funcionalidades da tela de header', () => {
  const setup = (initialRoute = '/drinks') => {
    render(
      <MemoryRouter initialEntries={ [initialRoute] }>
        <Route path="/drinks">
          <Header />
        </Route>
      </MemoryRouter>,
    );
  };

  it('renderiza o botão de pesquisa', () => {
    setup();
    const btn = screen.getByTestId('search-top-btn');
    expect(btn).toBeInTheDocument();
  });

  it('altera o estado de showSearch ao clicar no botão de busca', () => {
    setup();
    const btn = screen.getByTestId('search-top-btn');
    fireEvent.click(btn);
    expect(btn).toBeInTheDocument();
  });

  it('redireciona para /profile ao clicar no botão de perfil', () => {
    renderWithRouter(<Meals />, { initialRoute: '/meals' });
    const btnPerfil = screen.getByRole('img', { name: /profile/i });
    userEvent.click(btnPerfil);
    expect(screen.getByText('My Profile')).toBeInTheDocument();
  });
});
