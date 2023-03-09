import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CookContext from '../context/CookContext';

function Recipes() {
  const {
    urlFood,
    urlDrink,
    urlFoodCategories,
    urlDrinkCategories,
  } = useContext(CookContext);

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState(false);
  const { location: { pathname } } = useHistory();
  const MAX_RECIPES = 12;
  const MAX_CATEGORIES = 5;

  const fetchApiFood = () => {
    fetch(urlFood)
      .then((response) => response.json())
      .then((data) => {
        const theFood = data.meals
          .map(({ strMealThumb, strMeal, idMeal: id }) => ({ strMealThumb, strMeal, id }))
          .filter((meal, index) => index < MAX_RECIPES);
        setRecipes(theFood);
      });
  };

  const fetchApiDrink = () => {
    fetch(urlDrink)
      .then((response) => response.json())
      .then((data) => {
        const theDrink = data.drinks
          .map(({ strDrinkThumb, strDrink, idDrink: id }) => (
            { strDrinkThumb, strDrink, id }))
          .filter((drink, index) => index < MAX_RECIPES);
        setRecipes(theDrink);
      });
  };
  const fetchApiFoodsCategories = () => {
    fetch(urlFoodCategories)
      .then((response) => response.json())
      .then((data) => {
        const theCategories = data.meals
          .filter((category, index) => index < MAX_CATEGORIES)
          .map(({ strCategory }) => ({ strCategory }));
        setCategories(theCategories);
      });
  };

  const fetchApiDrinksCategories = () => {
    fetch(urlDrinkCategories)
      .then((response) => response.json())
      .then((data) => {
        const fiveDrinks = data.drinks
          .filter((category, index) => index < MAX_CATEGORIES)
          .map(({ strCategory }) => ({ strCategory }));
        setCategories(fiveDrinks);
      });
  };

  useEffect(() => {
    if (pathname === '/meals') {
      fetchApiFood();
      fetchApiFoodsCategories();
    } else {
      fetchApiDrink();
      fetchApiDrinksCategories();
    }
  }, []); // eslint-disable-line

  const btnFilter = (e) => {
    setActiveFilter(!activeFilter);
    if (activeFilter) {
      if (pathname === '/meals') {
        return fetchApiFood();
      }
      return fetchApiDrink();
    }

    const { target } = e;
    const { value } = target;
    if (pathname === '/meals') {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`)
        .then((response) => response.json())
        .then((data) => {
          const filterFood = data.meals
            .map(({ strMealThumb, strMeal, idMeal: id }) => ({ strMealThumb,
              strMeal,
              id }))
            .filter((meal, index) => index < MAX_RECIPES);
          setRecipes(filterFood);
        });
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`)
        .then((response) => response.json())
        .then((data) => {
          const filterDrink = data.drinks
            .map(({ strDrinkThumb, strDrink, idDrink: id }) => (
              { strDrinkThumb, strDrink, id }))
            .filter((drink, index) => index < MAX_RECIPES);
          setRecipes(filterDrink);
        });
    }
  };

  const allBtn = () => {
    setRecipes([]);
    if (pathname === '/meals') {
      fetchApiFood();
      fetchApiFoodsCategories();
    } else {
      fetchApiDrink();
      fetchApiDrinksCategories();
    }
  };

  return (
    <div>
      <div>
        {categories && categories.map((category, index) => (
          <button
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            key={ `${index}` }
            value={ category.strCategory }
            onClick={ btnFilter }
          >
            {category.strCategory}
          </button>
        ))}
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => allBtn() }
        >
          All
        </button>
      </div>
      <div>
        {pathname === '/meals' ? recipes.map((recipe, index) => (
          <Link
            to={ `/meals/${recipe.id}` }
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              width="60px"
              height="60px"
              alt={ recipe.strMeal }
              src={ recipe.strMealThumb }
            />
            <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
          </Link>
        )) : recipes.map((recipe, index) => (
          <Link
            to={ `/drinks/${recipe.id}` }
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              width="60px"
              height="60px"
              alt={ recipe.strDrink }
              src={ recipe.strDrinkThumb }
            />
            <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
