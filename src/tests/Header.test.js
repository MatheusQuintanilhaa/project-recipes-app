import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import App from '../App';

describe('verificando funcionalidades da tela de header', () => {
  it('renderiza o botão de pesquisa', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));

    const btn = screen.getByTestId('search-top-btn');
    expect(btn).toBeInTheDocument();
  });

  it('altera o estado de showSearch ao clicar no botão de busca', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));

    const btn = screen.getByTestId('search-top-btn');
    fireEvent.click(btn);
    expect(btn).toBeInTheDocument();
  });

  it('redireciona para /profile ao clicar no botão de perfil', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/done-recipes'));

    const btn = screen.getByTestId('profile-top-btn');

    fireEvent.click(btn);

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/profile');
    });
  });
});
