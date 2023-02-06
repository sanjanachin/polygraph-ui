import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('homepage renders as default', () => {
  render(<App />);
  const homePage = screen.getByTestId('home-page');
  expect(homePage).toBeInTheDocument();
});
