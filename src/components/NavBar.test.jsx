import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import NavBar from './NavBar';

const pages = [
  { display: 'Home', path: '/', id: 'home-button', destId: 'home-page' },
  {
    display: 'About',
    path: '/about',
    id: 'about-button',
    destId: 'about-page',
  },
  {
    display: 'Login',
    path: '/login',
    id: 'login-button',
    destId: 'login-page',
  },
];

beforeEach(() => {
  delete window.location;
  window.location = { reload: jest.fn(), assign: jest.fn() };
});

afterEach(() => {
  document.body.innerHTML = '';
  document.head.innerHTML = '';
});

test('all buttons render', () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
  pages.forEach((page) => {
    const button = screen.getByTestId(page.id);
    expect(button).toBeInTheDocument();
  });
});

test.each(pages)(
  'clicking %o takes user to appropriate location',
  async (page) => {
    render(
      <MemoryRouter data-testid="router">
        <Routes>
          <Route path={page.path} element={<div data-testid={page.destId} />} />
        </Routes>
        <NavBar />
      </MemoryRouter>
    );
    const button = screen.getByTestId(page.id);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByTestId(page.destId)).toBeInTheDocument();
  }
);
