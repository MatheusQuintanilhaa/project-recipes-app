import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import App from '../App';

const SPICY_ARRABIATA = 'Spicy Arrabiata Penne';
const DONE_RECIPES = '/done-recipes';

const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

describe('Testando a tela FavoriteRecipes', () => {
  it('Testando se todos os botões são renderizados na tela', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(DONE_RECIPES));

    const allButton = screen.getByTestId('filter-by-all-btn');
    const mealButton = screen.getByTestId('filter-by-meal-btn');
    const drinkButton = screen.getByTestId('filter-by-drink-btn');

    expect(allButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
  });

  it('Testa se é renderizado todas as receitas ja feitas quando o botão "Items" é clickado', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const { history } = renderWithRouter(<App />);
    act(() => history.push(DONE_RECIPES));

    const allButton = screen.getByTestId('filter-by-all-btn');
    fireEvent.click(allButton);

    const recipe1 = screen.getByText(SPICY_ARRABIATA);
    const recipe2 = screen.getByText('Aquamarine');

    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
  });

  it('Testa se é renderizado apenas as comidas quando o botão "Meals" é clickado', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const { history } = renderWithRouter(<App />);
    act(() => history.push(DONE_RECIPES));

    const mealButton = screen.getByTestId('filter-by-meal-btn');
    fireEvent.click(mealButton);

    const recipe1 = screen.getByText(SPICY_ARRABIATA);
    const recipe2 = screen.queryByText('Aquamarine');

    expect(recipe1).toBeInTheDocument();
    expect(recipe2).not.toBeInTheDocument();
  });

  it('Testando se é renderizado somentes os drinks quando o botão de drinks é clickado', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const { history } = renderWithRouter(<App />);
    act(() => history.push(DONE_RECIPES));

    const drinkButton = screen.getByTestId('filter-by-drink-btn');
    fireEvent.click(drinkButton);

    const recipe1 = screen.queryByText(SPICY_ARRABIATA);
    const recipe2 = screen.getByText('Aquamarine');

    expect(recipe1).not.toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
  });

  it('Testando se o link é copiado quando clickar no botão de compartilhar', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    navigator.clipboard = { writeText: jest.fn() };

    const { history } = renderWithRouter(<App />);
    act(() => history.push(DONE_RECIPES));

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    fireEvent.click(shareButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52771');
  });
});
