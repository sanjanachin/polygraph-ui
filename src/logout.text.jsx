import React from 'react';
import { render, screen } from '@testing-library/react';
import Logout from './pages/Logout';

test('logout page renders', () => {
  render(<Logout />);
  const logoutPage = screen.getByTestId('logout-page');
  expect(logoutPage).toBeInTheDocument();
});
