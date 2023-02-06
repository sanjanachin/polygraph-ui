import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RouteList from './RouteList';

test('about page renders on /about', () => {
  render(
    <MemoryRouter initialEntries={['/about']}>
      <RouteList />
    </MemoryRouter>
  );
  const aboutPage = screen.getByTestId('about-page');
  expect(aboutPage).toBeInTheDocument();
});

test('login page renders on /login', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <RouteList />
    </MemoryRouter>
  );
  const loginPage = screen.getByTestId('login-page');
  expect(loginPage).toBeInTheDocument();
});

test('home page renders on undefined routes', () => {
  render(
    <MemoryRouter initialEntries={['/abcdtest-nonexistent']}>
      <RouteList />
    </MemoryRouter>
  );
  const homePage = screen.getByTestId('home-page');
  expect(homePage).toBeInTheDocument();
});
