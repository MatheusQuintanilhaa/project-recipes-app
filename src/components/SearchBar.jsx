import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CookContext from '../context/CookContext';

export default function SearchBar() {
  const [captureInput, setCaptureInput] = useState('');
  const [radioButton, setRadioButton] = useState('ingredient');
  const { setMealsData, setDrinksData } = useContext(CookContext);
  const history = useHistory();

  // função faz comparações entre os inputs recebidos. Recebe o pathname- (string) O caminho da URL com o history.
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
      // solicitação com fetch recebendo resposta como objeto json, de DataMeals
      const response = await (await fetch(url)).json();
      setMealsData(response);
      console.log(setDrinksData);
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
      // solicitação com fetch recebendo resposta como objeto json, de DataDrinks
      const response = await (await fetch(url)).json();
      setDrinksData(response);
      console.log(setDrinksData);
    }
  };

  // função handle compara valor da entrada, com o que foi selecionado no campo radio e no campo de search. Caso for diferente lançará um alert global.
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
          checked={ radioButton === 'ingredient' } // verifica Captura do inputRadio pelo ingrediente
          value="ingredient"
          onChange={ ({ target }) => setRadioButton(target.value) }
          name="select"
        />
        <label htmlFor="ingredient">Itens</label>
        <input
          type="radio"
          data-testid="name-search-radio"
          checked={ radioButton === 'searchName' } // verifica Captura do inputRadio pelo 'nome', Recipes
          value="searchName"
          onChange={ ({ target }) => setRadioButton(target.value) }
          name="select"
        />
        <label htmlFor="name">Recipes</label>
        <input
          checked={ radioButton === 'firstLetter' } // verifica Captura do input com primeira letra
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
