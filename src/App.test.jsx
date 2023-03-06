import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('login page renders as default', () => {
  render(<App />);
  const homePage = screen.getByTestId('login-page');
  expect(homePage).toBeInTheDocument();
});
