import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import CookProvider from './context/CookProvider';
import RecipeDetails from './components/RecipeDetails';
import RecipesInProgress from './pages/RecipesInProgress';

function App() {
  return (
    <CookProvider>
      <Switch>
        <Route
          exact
          path="/drinks/:id/in-progress"
          component={ RecipesInProgress }
        />
        <Route
          exact
          path="/meals/:id/in-progress"
          component={ RecipesInProgress }
        />
        <Route path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/meals/:id" component={ RecipeDetails } />
        <Route path="/meals" component={ Meals } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </CookProvider>
  );
}

export default App;
