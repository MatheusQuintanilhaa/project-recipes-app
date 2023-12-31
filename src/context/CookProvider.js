import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import CookContext from './CookContext';

const INITIAL_STATE = { inicial: 'incial' };

function CookProvider({ children }) {
  const urlFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const urlFoodCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const urlDrinkCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const [state] = useState(INITIAL_STATE);
  const [mealsData, setMealsData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);
  const [recipeDetail, SetRecipeDetail] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const memo = useMemo(() => ({
    state,
    urlFood,
    urlDrink,
    urlFoodCategories,
    urlDrinkCategories,
    recipeDetail,
    SetRecipeDetail,
    mealsData,
    setMealsData,
    drinksData,
    setDrinksData,
    recipes,
    setRecipes,
  }), [
    state,
    urlFood,
    urlDrink,
    urlFoodCategories,
    urlDrinkCategories,
    recipeDetail,
    mealsData,
    setMealsData,
    drinksData,
    setDrinksData,
    recipes,
    setRecipes,
  ]);

  return (
    <CookContext.Provider
      value={ memo }
    >
      {children}
    </CookContext.Provider>
  );
}

CookProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default CookProvider;

// fonte :https://gist.github.com/ANDREHORMAN1994/e299f113e3e750276e8da0a8982b59f4
