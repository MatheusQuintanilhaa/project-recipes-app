// import { useHistory } from 'react-router-dom';
// import React from 'react';
// import Meals from './Meals';
// import Drinks from './Drinks';

// export default function Recipes() {
//   const history = useHistory();
//   const checking = history.location.pathname;
//   const drinkormeals = () => (
//     checking === '/drinks' ? <Drinks /> : <Meals />);

//   return (

//     <p>{drinkormeals()}</p>

//   );
// }
import React, { useEffect, useState } from 'react';
// import { fetchDrinksRecipes, fetchMealsRecipes } from '../fetchApi/apis';

function Recipes() {
  const [drinks, setDrinks] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchDrinksRecipes()
      .then((data) => setDrinks(data));

    fetchMealsRecipes()
      .then((data) => setRecipes(data));
  }, [setDrinks, setRecipes]);

  const MAX_RECIPES_PAGE = 12;

  const history = window.location.pathname;

  return (
    <section className="container">
      <h1>Recipes</h1>
      <div className="grid-container">
        { history === '/meals' && (
          recipes.map((recipe, index) => (
            index < MAX_RECIPES_PAGE && (
              <div
                key={ recipe.idMeal }
                data-testid={ `${index}-recipe-card` }
                className="grid-card"
              >
                <img
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                  data-testid={ `${index}-card-img` }
                  className="grid-card-img"
                />
                <p data-testid={ `${index}-card-name` }>{ recipe.strMeal }</p>
              </div>
            )
          ))
        ) }

        { history === '/drinks' && (
          drinks.map((drink, index) => (
            index < MAX_RECIPES_PAGE && (
              <div
                key={ drink.idDrink }
                data-testid={ `${index}-recipe-card` }
                className="grid-card"
              >
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid={ `${index}-card-img` }
                  className="grid-card-img"
                />
                <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>
              </div>
            )
          ))
        ) }
      </div>
    </section>

  );
}

export default Recipes;
