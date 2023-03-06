import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Login from './pages/LoginPage';

test('login page renders', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  const loginPage = screen.getByTestId('login-page');
  expect(loginPage).toBeInTheDocument();
});
