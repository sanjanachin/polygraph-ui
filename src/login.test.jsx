import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './login';

test('login page renders', () => {
    render(<Login />);
    const loginPage = screen.getByTestId('login-page');
    expect(loginPage).toBeInTheDocument();
    }
);
