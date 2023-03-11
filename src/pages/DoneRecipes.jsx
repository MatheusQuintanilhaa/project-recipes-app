import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [notes, setNotes] = useState('');
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const recipesStorage = JSON.parse(localStorage
      .getItem('doneRecipes')) || []; setDoneRecipes(recipesStorage);
  }, []);

  useEffect(() => {
    setRecipes(doneRecipes);
  }, [doneRecipes]);

  const handleAll = () => {
    setRecipes(doneRecipes);
  };

  const filterOptions = {
    all: () => setRecipes(doneRecipes),
    meal: () => setRecipes(doneRecipes.filter((done) => done.type === 'meal')),
    drink: () => setRecipes(doneRecipes.filter((done) => done.type === 'drink')),
  };

  const handleFilterFunc = ({ target }) => {
    const option = target.name; filterOptions[option]();
  };

  const handleCopy = async ({ type, id }) => {
    await clipboardCopy(`http://localhost:3000/${type}s/${id}`); setNotes('Link copied!');
  };

  return (
    <div>

      <Header title="Done Recipes" />

      <section>
        {notes}
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ handleAll }
        >
          Items
        </button>

        <button
          data-testid="filter-by-meal-btn"
          name="meal"
          type="button"
          onClick={ (event) => handleFilterFunc(event) }
        >
          Meals
        </button>

        <button
          data-testid="filter-by-drink-btn"
          name="drink"
          type="button"
          onClick={ (event) => handleFilterFunc(event) }
        >
          Beverages
        </button>
      </section>

      <main>
        {recipes.map((recipe, i) => (
          <div key={ i }>
            <Link to={ `${recipe.type}s/${recipe.id}` }>
              <img
                data-testid={ `${i}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
                style={ { width: '80px' } }
              />
              {recipe.type === 'meal' ? (
                <>
                  <p data-testid={ `${i}-horizontal-top-text` }>
                    {`${recipe.nationality} - ${recipe.category}`}
                  </p>
                  <p data-testid={ `${i}-${recipe.tags[0]}-horizontal-tag` }>
                    { recipe.tags[0] }
                  </p>
                  <p data-testid={ `${i}-${recipe.tags[1]}-horizontal-tag` }>
                    { recipe.tags[1] }
                  </p>
                </>
              ) : (
                <p data-testid={ `${i}-horizontal-top-text` }>
                  {recipe.alcoholicOrNot}
                </p>
              )}
              <p data-testid={ `${i}-horizontal-done-date` }>{ recipe.doneDate }</p>
              <p data-testid={ `${i}-horizontal-name` }>{ recipe.name }</p>
            </Link>

            <button type="button" onClick={ () => handleCopy(recipe) }>
              <img
                src={ shareIcon }
                alt="Share Icon"
                data-testid={ `${i}-horizontal-share-btn` }
              />
            </button>

          </div>
        ))}
      </main>
    </div>
  );
}
