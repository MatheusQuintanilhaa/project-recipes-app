import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';

function App() {
  return (
    <CookProvider>
      <Switch>
        <Route path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/meals/:id" component={ RecipeDetails } />
        <Route path="/meals" component={ Meals } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </CookProvider>
  );
}

export default App;
