import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="botao-de-bebidas"
          data-testid="drinks-bottom-btn"
        />
      </Link>

      <Link to="/meals">
        <img
          src={ mealIcon }
          alt="botao-de-comidas"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
