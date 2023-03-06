import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import UserHistory from './UserHistory';

const validEntry = { text: 'test short query', valid: true };
const invalidEntry = { text: 'test short query', valid: false };

const longInvalidEntry = {
  text: `${'longquery'.repeat(20)} long invalid end`,
  valid: false,
};

beforeEach(() => {
  cleanup();
});

test('valid entry renders correctly', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ history: [validEntry] }),
    })
  );
  render(<UserHistory user="" />);
  await waitFor(() => {
    expect(screen.getByTestId('user-history-entry')).toBeInTheDocument();
  });
  expect(screen.queryByTestId('text-misinformation-icon')).toBeNull();
  expect(screen.queryByText('Misinformation')).toBeNull();
  screen.getByTestId('text-ok-icon');
  screen.getByText('Not misinformation');
});

test('invalid entry renders correctly', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ history: [invalidEntry] }),
    })
  );
  render(<UserHistory user="" />);
  await waitFor(() => {
    expect(screen.getByTestId('user-history-entry')).toBeInTheDocument();
  });
  expect(screen.queryByTestId('text-ok-icon')).toBeNull();
  expect(screen.queryByText('Not misinformation')).toBeNull();
  screen.getByTestId('text-misinformation-icon');
  screen.getByText('Misinformation');
});

test('multiple entries render correctly', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ history: [validEntry, invalidEntry] }),
    })
  );
  render(<UserHistory user="" />);
  await waitFor(() => {
    expect(
      screen.queryAllByTestId('user-history-entry').length
    ).toBeGreaterThan(0);
  });
  screen.getByTestId('text-misinformation-icon');
  screen.getByText('Misinformation');
  screen.getByTestId('text-ok-icon');
  screen.getByText('Not misinformation');
});

test('history entries expand when clicked', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ history: [longInvalidEntry] }),
    })
  );
  render(<UserHistory user="" />);
  await waitFor(() => {
    expect(screen.getByTestId('user-history-entry')).toBeInTheDocument();
  });
  const entry = screen.getByText(longInvalidEntry.text);
  const classList = JSON.parse(JSON.stringify(entry.classList));
  expect(JSON.parse(JSON.stringify(entry.classList))).toEqual(classList);
  fireEvent.click(entry);
  expect(JSON.parse(JSON.stringify(entry.classList))).not.toEqual(classList);
  fireEvent.click(entry);
  expect(JSON.parse(JSON.stringify(entry.classList))).toEqual(classList);
});
