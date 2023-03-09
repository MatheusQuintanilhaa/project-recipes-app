import React from 'react';
import { screen } from '@testing-library/react';
import Footer from '../components/Footer';
import renderWithRouter from './renderWithRouter/renderWithRouter';

describe('Footer', () => {
  it('should render drinks and meals icons', () => {
    renderWithRouter(<Footer />);
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    expect(drinksBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
  });
  it('should navigate to drinks page on drinks icon click', () => {
    const { history } = renderWithRouter(<Footer />);
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    drinksBtn.click();
    expect(history.location.pathname).toBe('/drinks');
  });
  it('should navigate to meals page on meals icon click', () => {
    const { history } = renderWithRouter(<Footer />);
    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    mealsBtn.click();
    expect(history.location.pathname).toBe('/meals');
  });
});
