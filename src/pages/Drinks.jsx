import React from 'react';
import Header from '../components/Header';
import RecipesCards from '../components/RecipesCads';
import Footer from '../components/Footer';

export default function Drinks() {
  return (
    <>
      <Header title="Drinks" />
      <RecipesCards />
      <Footer />
    </>
  );
}
