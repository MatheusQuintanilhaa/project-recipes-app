import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import CookProvider from '../context/CookProvider';
import renderWithRouter from './renderWithRouter/renderWithRouter';

describe('Testa o componente RecipeDetails', () => {
  const favoriteBtnId = 'favorite-btn';
  const shareBtnId = 'share-btn';
  const startRecipeBtnId = 'start-recipe-btn';

  test('testando a tela de RecipeDetails', async () => {
    renderWithRouter(
      <CookProvider>
        <App />
      </CookProvider>,
      { initialEntries: ['/drinks/15997'] },
    );

    const favoriteBtn = await screen.findByTestId(favoriteBtnId);
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);

    const startRecipeBtn = await screen.findByTestId(startRecipeBtnId);
    expect(startRecipeBtn).toBeInTheDocument();
    userEvent.click(startRecipeBtn);
  });

  test('testando a tela de Receita', async () => {
    renderWithRouter(
      <CookProvider>
        <App />
      </CookProvider>,
      { initialEntries: ['/drinks/15997'] },
    );
    const startRecipeBtn = await screen.findByTestId(startRecipeBtnId);
    expect(startRecipeBtn).toBeInTheDocument();
  });

  it('testando button de compartilhar', async () => {
    window.document.execCommand = jest.fn(() => true);
    renderWithRouter(
      <CookProvider>
        <App />
      </CookProvider>,
      { initialEntries: ['/meals/52978'] },
    );
    const shareBtn = await screen.findByTestId(shareBtnId);
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);
  });
});
