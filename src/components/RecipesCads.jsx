import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CookContext from '../context/CookContext';

function RecipesCards() {
  const { mealsData } = useContext(CookContext);
  const { drinksData } = useContext(CookContext);
  const history = useHistory();
  const { drinks } = drinksData;
  const { meals } = mealsData;
  const eleven = 11;
  if (meals === null || drinks === null) {
    return global
      .alert('Sorry, we haven\'t found any recipes for these filters.');
  }
  if (meals && meals.length === 1) return history.push(`/meals/${meals[0].idMeal}`);
  if (drinks && drinks.length === 1) return history.push(`/drinks/${drinks[0].idDrink}`);
  if (history.location.pathname === '/meals') {
    return (
      <div>
        {meals
        && meals.map((meal, index) => (index <= eleven ? (
          <Link to={ `/meals/${meal.idMeal}` } key={ index }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                style={ { width: '200px' } }
                data-testid={ `${index}-card-img` }
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
              <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
            </div>
          </Link>
        ) : null))}
      </div>
    );
  }
  return (
    <div>
      {drinks && drinks.map((drink, index) => (index <= eleven ? (
        <Link to={ `/drinks/${drink.idDrink}` } key={ index }>
          <div data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
            <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
          </div>
        </Link>
      ) : null))}

    </div>
  );
}

export default RecipesCards;
