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
  const [recipeContinue, setRecipeContinue] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [favorite, setFavorite] = useState(false);

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

  useEffect(() => {
    const myObjects = {
      drinks: {},
      meals: {},
    };

    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(myObjects));
    }

    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    const id = location.pathname.split('/')[2];

    if (type === 'meals' && getStorage.meals[id] === undefined) {
      setRecipeContinue(true);
    } else if (type === 'drinks' && getStorage.drinks[id] === undefined) {
      setRecipeContinue(true);
    } else {
      setRecipeContinue(false);
    }
  }, [location.pathname, type]);

  const endUrl = -11;
  const maxRecomendations = 6;
  const id = location.pathname.split('/')[2];

  const copyLink = () => {
    setCopiedLink(true);
    const { href } = window.location;
    navigator.clipboard.writeText(href);
  };

  const favorites = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storage !== null && storage.length > 0) {
      const filterStorage = storage.some((item) => item.id === id);
      if (filterStorage) {
        setFavorite(true);
      }
    } else {
      setFavorite(false);
    }
  };

  useEffect(() => {
    favorites();
  }, []);

  const saveRecipesInLocalStorage = () => {
    const recipeCopy = [...recipe][0];
    const getId = recipeCopy.idMeal || recipeCopy.idDrink;
    const getTypes = recipeCopy.strMeal ? 'meal' : 'drink';
    const getArea = recipeCopy.strArea ? recipeCopy.strArea : '';
    const getCategory = recipeCopy.strCategory ? recipeCopy.strCategory : '';
    const isAlcoholic = recipeCopy.strAlcoholic ? recipeCopy.strAlcoholic : '';
    const getName = recipeCopy.strMeal || recipeCopy.strDrink;
    const getImg = recipeCopy.strMealThumb || recipeCopy.strDrinkThumb;

    const recipeObject = {
      id: getId,
      type: getTypes,
      nationality: getArea,
      category: getCategory,
      alcoholicOrNot: isAlcoholic,
      name: getName,
      image: getImg,
    };

    const saveInStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (saveInStorage === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([recipeObject]));
      setFavorite(!favorite);
    } else {
      const filterStorage = saveInStorage.filter((item) => item.id !== getId);
      if (filterStorage.length === saveInStorage.length) {
        localStorage.setItem('favoriteRecipes', JSON
          .stringify([...saveInStorage, recipeObject]));
        setFavorite(!favorite);
      }
      if (filterStorage.length < saveInStorage.length) {
        localStorage.setItem('favoriteRecipes', JSON.stringify(filterStorage));
        setFavorite(!favorite);
      }
    }
    favorites();
  };

  const handleStartRecipe = () => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const idx = location.pathname.split('/')[2];
    if (type === 'meals') {
      storage.meals[idx] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
    } else {
      storage.drinks[idx] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
    }
  };

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyLink }
      >
        <img src="../images/searchIcon.svg" alt="share" />
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ saveRecipesInLocalStorage }
        src={
          favorite ? '../images/blackHeartIcon.svg' : '../images/whiteHeartIcon.svg'
        }
      >
        <img
          src={
            favorite ? '../images/blackHeartIcon.svg' : '../images/whiteHeartIcon.svg'
          }
          alt="favorite"
        />
      </button>
      {copiedLink && <p data--testid="copied-link">Link copied!</p>}

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
        <Link
          to={
            `/${type === 'drinks' ? 'drinks' : 'meals'}/${id}/in-progress`
          }
        >
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="recipe-details__buttons"
            onClick={ handleStartRecipe }
          >
            { recipeContinue ? 'Start Recipe' : 'Continue Recipe'}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default RecipeDetails;
