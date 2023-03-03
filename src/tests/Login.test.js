import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter/renderWithRouter';

describe('verificando funcionalidades da tela de login', () => {
  it(
    'Login items',
    async () => {
      renderWithRouter(<App />);
      const loginEntry = await screen.findByTestId('email-input');

      const buttonEntry = await screen.findByTestId('login-submit-btn');

      const keyEntry = await screen.findByTestId('password-input');

      expect(loginEntry).toBeInTheDocument();
      expect(keyEntry).toBeInTheDocument();
      expect(buttonEntry).toBeInTheDocument();

      userEvent.type(loginEntry, 'testing@lorem.com');
      userEvent.type(keyEntry, '0000');
      expect(buttonEntry).toBeDisabled();
      userEvent.type(keyEntry, '000000');
      userEvent.click(buttonEntry);
    },
  );
});
