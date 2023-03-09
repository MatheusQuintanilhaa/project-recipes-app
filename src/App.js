import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import RecipeInProgressMeal from './pages/RecipeInProgressMeal';
import RecipeInProgressDrink from './pages/RecipeInProgressDrink';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/meals" component={ Meals } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/meals/:id/in-progress" component={ RecipeInProgressMeal } />
        <Route path="/drinks/:id/in-progress" component={ RecipeInProgressDrink } />
      </Switch>
    </div>
  );
}

export default App;
