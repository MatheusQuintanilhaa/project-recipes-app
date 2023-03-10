import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import SearchBar from '../components/SearchBar';
import App from '../App';
import RecipesCards from '../components/RecipesCads';

const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
const SEARCH_INPUT = 'search-input';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';
const NAME_SEARCH_RADIO = 'name-search-radio';
const SEARCH_TOP_BTN = 'search-top-btn';

describe('Testes do Componente SearchBar, rota Meals', () => {
  it('Redireciona o campo com nome selecionado', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });

    const topSearchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(topSearchBtn);
    const nameSearchRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    userEvent.click(nameSearchRadio);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 's');
    const execSearchBtn = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(execSearchBtn);

    await waitFor(() => {
      const image = screen.getByTestId('0-recipe-card');
      userEvent.click(image);
      const h1 = screen.getByRole('heading', {
        name: /recipe details/i,
      });
      expect(h1).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('Verifica renderização de todos os elementos', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    const topSearchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(topSearchBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const ingredientRadioBtn = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const nameRadioBtn = screen.getByTestId(NAME_SEARCH_RADIO);
    const firstLetterRadioBtn = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadioBtn).toBeInTheDocument();
    expect(nameRadioBtn).toBeInTheDocument();
    expect(firstLetterRadioBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it('Verifica possibilidade de digitar no campo de input', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    const topSearchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(topSearchBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'chicken');
    expect(searchInput).toHaveValue('chicken');
  });

  it('Verifica a possibilidade de usar o campo de input, os botões radio e o botão Search', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    const topSearchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(topSearchBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const ingredientRadioBtn = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const nameRadioBtn = screen.getByTestId(NAME_SEARCH_RADIO);
    const firstLetterRadioBtn = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.type(searchInput, 'chicken');
    userEvent.click(ingredientRadioBtn);
    userEvent.click(searchBtn);
    userEvent.click(nameRadioBtn);
    userEvent.click(searchBtn);
    userEvent.click(firstLetterRadioBtn);
    userEvent.click(searchBtn);
  });

  it('Verifica se executa uma chamada à API Meals quando realiza uma pesquisa e em caso de sucesso renderiza as receitas', async () => {
    const mealsByIngredients = RecipesCards;
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mealsByIngredients),
    }));

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));

    const topSearchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(topSearchBtn);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'chicken');
    const ingredientRadioBtn = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    userEvent.click(ingredientRadioBtn);
    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');

    jest.restoreAllMocks();
  });
});

describe('Testes do Componente SearchBar, rota Drinks', () => {
  it('Verifica se executa uma chamada à API Drinks quando realiza uma pesquisa', () => {
    const drinksByIngredients = SearchBar;
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(drinksByIngredients),
    }));

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));

    const topSearchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(topSearchBtn);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'whiskey');
    const ingredientRadioBtn = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    userEvent.click(ingredientRadioBtn);
    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=whiskey');
  });

  it('Testa se a API é chamada quando é pesquisado apenas uma letra e o botão "List" é clickado', () => {
    const drinksByIngredients = SearchBar;
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(drinksByIngredients),
    }));

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));

    const topSearchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(topSearchBtn);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
    userEvent.click(firstLetterRadio);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.click(searchInput);
    userEvent.type(searchInput, 'a');

    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
  });

  it('Testando se o alerta aparece na tela quando é selecido o radio First Letter e é colocado 2 letras no input', async () => {
    const drinksByIngredients = SearchBar;
    const mockAlert = jest.spyOn(global, 'alert').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(drinksByIngredients),
    }));

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));

    const topSearchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(topSearchBtn);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
    userEvent.click(firstLetterRadio);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.click(searchInput);
    userEvent.type(searchInput, 'aa');

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    });
  });

  it('Testando se o state é alterado quando é selecioda o radio button', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));

    const topSearchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(topSearchBtn);

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');

    userEvent.click(nameRadio);
    expect(nameRadio.checked).toBe(true);
    expect(ingredientRadio.checked).toBe(false);
    expect(firstLetterRadio.checked).toBe(false);

    userEvent.click(ingredientRadio);
    expect(nameRadio.checked).toBe(false);
    expect(ingredientRadio.checked).toBe(true);
    expect(firstLetterRadio.checked).toBe(false);

    userEvent.click(firstLetterRadio);
    expect(nameRadio.checked).toBe(false);
    expect(ingredientRadio.checked).toBe(false);
    expect(firstLetterRadio.checked).toBe(true);
  });
});
