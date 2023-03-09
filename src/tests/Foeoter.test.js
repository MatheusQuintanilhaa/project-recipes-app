import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer';

describe('Footer', () => {
  it('should render drinks and meals icons', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    expect(drinksBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
  });
  it('should navigate to drinks page on drinks icon click', () => {
    const { history } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    drinksBtn.click();
    expect(history.location.pathname).toBe('/drinks');
  });
  it('should navigate to meals page on meals icon click', () => {
    const { history } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    mealsBtn.click();
    expect(history.location.pathname).toBe('/meals');
  });
});
