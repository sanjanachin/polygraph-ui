import { cleanup } from '@testing-library/react';
import checkMisinformation from './api';

afterEach(() => {
  cleanup();
});

test('api throws error if response is not ok', async () => {
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

test('api returns appropriate response object if response is ok', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ valid: false }),
    })
  );
  const res = await checkMisinformation({ text: 'test' });
  expect(res.valid).toBeFalsy();
});
