import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { words as profanity } from 'bad-words/lib/lang.json';
import MisinformationDetector from './MisinformationDetector';
import MAX_WORD_COUNT from './constants';

afterEach(() => {
  cleanup();
});

test('submit button is disabled when input box is empty', () => {
  render(<MisinformationDetector user="" />);
  const submitButton = screen.getByTestId(
    'misinformation-detector-submit-button'
  );
  expect(submitButton).toHaveAttribute('disabled');
});

test('profanity detector detects profanity', () => {
  render(<MisinformationDetector user="" />);
  const textInput = screen.getByRole('textbox');
  expect(textInput).toBeInTheDocument();
  fireEvent.change(textInput, { target: { value: profanity[0] } });
  const profanityDetected = screen.getByText('Profanity detected');
  const profanityNotDetected = screen.queryByText('No profanity detected');
  expect(profanityDetected).toBeInTheDocument();
  expect(profanityNotDetected).toBeNull();
  const submitButton = screen.getByTestId(
    'misinformation-detector-submit-button'
  );
  expect(submitButton).toHaveAttribute('disabled');
});

test('profanity detector does not mislabel clean text', () => {
  render(<MisinformationDetector user="" />);
  const textInput = screen.getByRole('textbox');
  expect(textInput).toBeInTheDocument();
  fireEvent.change(textInput, { target: { value: 'some nice, clean text.' } });
  const profanityDetected = screen.queryByText('Profanity detected');
  const profanityNotDetected = screen.queryByText('No profanity detected');
  expect(profanityDetected).toBeNull();
  expect(profanityNotDetected).toBeInTheDocument();
  const submitButton = screen.getByTestId(
    'misinformation-detector-submit-button'
  );
  expect(submitButton).not.toHaveAttribute('disabled');
});

test('word count display accurately tracks real word count', () => {
  render(<MisinformationDetector user="" />);
  const textInput = screen.getByRole('textbox');
  expect(textInput).toBeInTheDocument();
  fireEvent.change(textInput, {
    target: { value: 'this should be five words' },
  });
  screen.getByText('5/500 words');
  fireEvent.change(textInput, {
    target: { value: 'this should be more than five words' },
  });
  screen.getByText('7/500 words');
  fireEvent.change(textInput, {
    target: { value: 'this                  shouldbeonly  four words.!~@0*  ' },
  });
  screen.getByText('4/500 words');
});

test('word count display disables submit button for long text inputs', () => {
  render(<MisinformationDetector user="" />);
  const textInput = screen.getByRole('textbox');
  expect(textInput).toBeInTheDocument();
  fireEvent.change(textInput, {
    target: { value: 'x '.repeat(MAX_WORD_COUNT + 1) },
  });
  screen.getByText(`${MAX_WORD_COUNT + 1}/500 words`);
  const submitButton = screen.getByTestId(
    'misinformation-detector-submit-button'
  );
  expect(submitButton).toHaveAttribute('disabled');
});

test('word count display does not disable submit button for short text inputs', () => {
  render(<MisinformationDetector user="" />);
  const textInput = screen.getByRole('textbox');
  expect(textInput).toBeInTheDocument();
  fireEvent.change(textInput, {
    target: { value: 'x '.repeat(MAX_WORD_COUNT) },
  });
  screen.getByText(`${MAX_WORD_COUNT}/500 words`);
  const submitButton = screen.getByTestId(
    'misinformation-detector-submit-button'
  );
  expect(submitButton).not.toHaveAttribute('disabled');
});

test('misinformation alert appears if server prompts it', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ valid: false }),
    })
  );
  render(<MisinformationDetector user="" />);
  const textInput = screen.getByRole('textbox');
  expect(textInput).toBeInTheDocument();
  fireEvent.change(textInput, {
    target: { value: 'abc123' },
  });
  const submit = screen.getByTestId('misinformation-detector-submit-button');
  fireEvent.click(submit);
  await waitFor(() => {
    expect(
      screen.getByTestId('misinformation-detector-misinformation-alert')
    ).toBeInTheDocument();
  });
  const infoAlert = screen.queryByTestId('misinformation-detector-info-alert');
  const noMisinfoAlert = screen.queryByTestId(
    'misinformation-detector-no-misinformation-alert'
  );
  expect(infoAlert).toBeNull();
  expect(noMisinfoAlert).toBeNull();
});

test('no misinformation alert appears if server prompts it', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ valid: true }),
    })
  );
  render(<MisinformationDetector user="" />);
  const textInput = screen.getByRole('textbox');
  expect(textInput).toBeInTheDocument();
  fireEvent.change(textInput, {
    target: { value: 'abc123' },
  });
  const submit = screen.getByTestId('misinformation-detector-submit-button');
  fireEvent.click(submit);
  await waitFor(() => {
    expect(
      screen.getByTestId('misinformation-detector-no-misinformation-alert')
    ).toBeInTheDocument();
  });
  const infoAlert = screen.queryByTestId('misinformation-detector-info-alert');
  const misinfoAlert = screen.queryByTestId(
    'misinformation-detector-misinformation-alert'
  );
  expect(infoAlert).toBeNull();
  expect(misinfoAlert).toBeNull();
});

test('info alert appears on initial component render', () => {
  render(<MisinformationDetector user="" />);
  screen.getByTestId('misinformation-detector-info-alert');
});

test('info alert reappears if text is changed after result is displayed', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ valid: false }),
    })
  );
  render(<MisinformationDetector user="" />);
  const textInput = screen.getByRole('textbox');
  expect(textInput).toBeInTheDocument();
  fireEvent.change(textInput, {
    target: { value: 'abc123' },
  });
  const submit = screen.getByTestId('misinformation-detector-submit-button');
  fireEvent.click(submit);
  await waitFor(() => {
    expect(
      screen.getByTestId('misinformation-detector-misinformation-alert')
    ).toBeInTheDocument();
  });
  const infoAlert = screen.queryByTestId('misinformation-detector-info-alert');
  expect(infoAlert).toBeNull();
  fireEvent.change(textInput, {
    target: { value: '123abc' },
  });
  screen.getByTestId('misinformation-detector-info-alert');
});
