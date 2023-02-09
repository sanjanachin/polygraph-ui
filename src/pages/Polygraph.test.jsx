import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, cleanup } from '@testing-library/react';
import Polygraph from './Polygraph';

afterEach(() => {
  cleanup();
});

test('all components render', () => {
  render(
    <BrowserRouter>
      <Polygraph />
    </BrowserRouter>
  );
  screen.getByTestId('home-page');
  screen.getByTestId('navigation-bar-parent');
  screen.getByTestId('misinformation-detector-parent');
  screen.getByTestId('user-history-parent');
});
