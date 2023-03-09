import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getMealsByID, getDrinksByID } from '../services/FetchsRecipeDetails';

import { getAllMeals } from '../services/FetchMeals';
import { getAllDrinks } from '../services/FetchDrinks';

function RecipeDetails() {
  const location = useLocation();
  const [recipe, setRecipe] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const type = location.pathname.split('/')[1];

  useEffect(() => {
    const types = location.pathname.split('/')[1];
    const id = location.pathname.split('/')[2];
    if (types === 'meals') {
      getMealsByID(id).then((data) => setRecipe(data.meals));
      getAllDrinks().then((data) => setRecommendations(data.drinks));
    } else {
      getDrinksByID(id).then((data) => setRecipe(data.drinks));
      getAllMeals().then((data) => setRecommendations(data.meals));
    }
  }, [location.pathname]);
  console.log(recipe);
  console.log(location.pathname);

  const endUrl = -11;
  const maxRecomendations = 6;

  console.log(recommendations);
  return (
    <div>
      <h1>Recipe Details</h1>
      {recipe.map((item, index) => (
        <div key={ index }>
          <img
            src={ item.strMealThumb || item.strDrinkThumb }
            alt="recipe"
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{item.strMeal || item.strDrink}</h2>
          <h3 data-testid="recipe-category">{item.strCategory}</h3>
          {item.strAlcoholic && (
            <h3 data-testid="recipe-category">{item.strAlcoholic}</h3>
          )}
          <h3>Ingredients</h3>
          <ul>
            {Object.keys(item).reduce((acc, key) => {
              if (key.includes('Ingredient') && item[key] !== '' && item[key] !== null) {
                return [...acc, item[key]];
              }
              return acc;
            }, []).map((ingredient, i) => (
              <li
                key={ i }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                {`${ingredient} - ${item[`strMeasure${i + 1}`]}`}
              </li>
            ))}
          </ul>
          <h3>Instructions</h3>
          <p data-testid="instructions">{item.strInstructions}</p>
          {item.strYoutube && (
            <iframe
              data-testid="video"
              title="recipe"
              width="420"
              height="315"
              src={ `https://www.youtube.com/embed/${item.strYoutube.slice(endUrl)}` }
            />
          )}
        </div>
      ))}
      <h3>Recommendations</h3>
      <div className="recipe-details__recommendations">
        { recommendations.length > 0
        && recommendations.slice(0, maxRecomendations).map((item, index) => (

          <Link
            key={ index }
            to={
              `/${type === 'meals' ? 'drinks' : 'meals'}/${item.idMeal || item.idDrink}`
            }
          >
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
              className="recipe-details__recommendations_card"
            >
              <img
                src={ item.strMealThumb || item.strDrinkThumb }
                alt="recipe"
                data-testid={ `${index}-card-img` }
                width="140"
              />
              <h2
                data-testid={ `${index}-recommendation-title` }
              >
                {item.strMeal || item.strDrink}
              </h2>
            </div>
          </Link>
        ))}
      </div>
      <div>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
        >
          Start Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeDetails;
