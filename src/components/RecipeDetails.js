import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function RecipeDetails() {
  const location = useLocation();
  const [recipe, setRecipe] = useState([]);

  console.log('location.pathname');
  useEffect(() => {
    const type = location.pathname.split('/')[1];
    const id = location.pathname.split('/')[2];
    if (type === 'meals') {
      getMealsByID(id).then((data) => setRecipe(data));
    } else {
      getDrinksByID(id).then((data) => setRecipe(data));
    }
    console.log(id);
  }, []);
  console.log(recipe);
  console.log(location.pathname);
  return (
    <div>Oi</div>
  );
}
export default RecipeDetails;
