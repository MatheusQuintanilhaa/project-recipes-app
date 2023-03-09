import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

import RecipesCards from '../components/RecipesCads';

// import Recipes from '../components/Recipes';

export default function Meals() {
  return (
    <>
      <Header title="Meals" />
      <RecipesCards />
      {/* <Recipes /> */}
      <Footer />
    </>
  );
}
