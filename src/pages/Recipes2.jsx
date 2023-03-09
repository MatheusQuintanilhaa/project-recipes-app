import { useHistory } from 'react-router-dom';
import React from 'react';
import Meals from './Meals';
import Drinks from './Drinks';

export default function Recipes() {
  const history = useHistory();
  const checking = history.location.pathname;
  const drinkormeals = () => (
    checking === '/drinks' ? <Drinks /> : <Meals />);

  return (

    <p>{drinkormeals()}</p>

  );
}
