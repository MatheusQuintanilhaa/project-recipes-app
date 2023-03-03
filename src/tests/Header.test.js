import React from 'react';
import '@testing-library/jest-dom';
import { screen, fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import Header from '../components/Header';

describe('Header', () => {
  it('Verificando a funcionalidade na Header', () => {
    renderWithRouter(<App />);
    const pageTitle = screen.findByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();

    const btn = screen.findByTestId('profile-top-btn');
    expect(btn).toBeInTheDocument();

    const search = screen.findByTestId('search-input');
    expect(search).toBeInTheDocument();
  });

  it('Verificando a funcionalidade Boolean do botão', () => {
    const { getByText } = render(<Header title="Test Title" />);
    const button = getByText('Buscar');

    fireEvent.click(button);
    expect(setShowSearch).toHaveBeenCalledWith(
      true,
    );
  });
});
