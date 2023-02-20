import { cleanup } from '@testing-library/react';
import { checkMisinformation, getUserHistory } from './api';

afterEach(() => {
  cleanup();
});

test('checkMisinformation throws error if response is not ok', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ valid: false }),
    })
  );
  let exceptionThrown = false;
  try {
    await checkMisinformation({ text: 'test' });
  } catch (e) {
    exceptionThrown = true;
  }
  expect(exceptionThrown).toBeTruthy();
});

test('checkMisinformation returns appropriate response object if response is ok', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ valid: false }),
    })
  );
  const res = await checkMisinformation({ text: 'test' });
  expect(res.valid).toBeFalsy();
});

test('getUserHistory throws error if response is not ok', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ queries: [] }),
    })
  );
  let exceptionThrown = false;
  try {
    await getUserHistory({ user: 'test' });
  } catch (e) {
    exceptionThrown = true;
  }
  expect(exceptionThrown).toBeTruthy();
});

test('getUserHistory returns appropriate response object if response is ok', async () => {
  const queries = [{ text: 'some misinfo', valid: false }];
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ queries }),
    })
  );
  const res = await getUserHistory({ user: 'test' });
  expect(res.queries).toEqual(queries);
});
