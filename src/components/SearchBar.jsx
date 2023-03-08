import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CookContext from '../context/CookContext';

export default function SearchBar() {
  const [captureInput, setCaptureInput] = useState('');
  const [radioButton, setRadioButton] = useState('ingredient');
  const { setMealsData, setDrinksData } = useContext(CookContext);
  const history = useHistory();

  const handleSearch = async (input) => {
    if (history.location.pathname === '/meals') {
      let url = '';
      if (radioButton === 'ingredient') {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`;
      }
      if (radioButton === 'searchName') {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
      }
      if (radioButton === 'firstLetter') {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`;
      }
      const response = await (await fetch(url)).json();
      setMealsData(response);
    }

    if (history.location.pathname === '/drinks') {
      let url = '';
      if (radioButton === 'ingredient') {
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`;
      }
      if (radioButton === 'searchName') {
        url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`;
      }
      if (radioButton === 'firstLetter') {
        url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`;
      }
      const response = await (await fetch(url)).json();
      setDrinksData(response);
    }
  };

  const handleChange = ({ target }) => {
    if (target.value.length > 1 && radioButton === 'firstLetter') {
      return global.alert('Your search must have only 1 (one) character');
    }
    setCaptureInput(target.value);
  };

  return (
    <div>
      <section>
        <input
          type="text"
          data-testid="search-input"
          placeholder="search"
          value={ captureInput }
          onChange={ (e) => handleChange(e) }
        />
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          checked={ radioButton === 'ingredient' }
          value="ingredient"
          onChange={ ({ target }) => setRadioButton(target.value) }
          name="select"
        />
        <label htmlFor="ingredient">Itens</label>
        <input
          type="radio"
          data-testid="name-search-radio"
          checked={ radioButton === 'searchName' }
          value="searchName"
          onChange={ ({ target }) => setRadioButton(target.value) }
          name="select"
        />
        <label htmlFor="name">Recipes</label>
        <input
          checked={ radioButton === 'firstLetter' }
          value="firstLetter"
          onChange={ ({ target }) => {
            setRadioButton(target.value);
            setCaptureInput('');
          } }
          type="radio"
          data-testid="first-letter-search-radio"
        />
        <label htmlFor="firstLetter">List</label>
      </section>
      <section>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => handleSearch(captureInput) }
        >
          Pesquisar
        </button>
      </section>
    </div>
  );
}
