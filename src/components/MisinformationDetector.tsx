import React from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { profanity, MAX_WORD_COUNT } from './constants';
import checkMisinformation from '../api/api';

const instructionsAlert = (
  <Alert severity="info" data-testid="misinformation-detector-info-alert">
    <AlertTitle>
      <strong>Welcome to Polygraph!</strong>
    </AlertTitle>
    Type some text into the field below and click submit to find out if it
    contains misinformation.
  </Alert>
);

const noMisinformationAlert = (
  <Alert
    severity="success"
    data-testid="misinformation-detector-no-misinformation-alert"
  >
    <AlertTitle>
      <strong>No misinformation detected!</strong>
    </AlertTitle>
    Our analysis has not found any evidence of misinformation in this text.
  </Alert>
);

const misinformationAlert = (
  <Alert
    severity="warning"
    data-testid="misinformation-detector-misinformation-alert"
  >
    <AlertTitle>
      <strong>Misinformation detected!</strong>
    </AlertTitle>
    Our analysis has determined that there is a high likelihood that this text
    contains some misinformation.
  </Alert>
);

const countWords = (input: string) => input.trim().split(/\s+/).length;

function MisinformationDetector() {
  const [alert, setAlert] = React.useState(instructionsAlert);
  const [text, setText] = React.useState('');

  const onTextUpdate = (event: any) => {
    setText(event.target.value);
    setAlert(instructionsAlert);
  };

  const containsProfanity = (input: string) => {
    const foundProfanity = profanity.filter((word) =>
      input.toLowerCase().includes(word.toLowerCase())
    );
    if (foundProfanity.length) {
      return true;
    }
    return false;
  };

  const submit = async () => {
    const request = { text };
    const response = await checkMisinformation(request);
    if (response.valid) {
      setAlert(noMisinformationAlert);
    } else {
      setAlert(misinformationAlert);
    }
  };

  return (
    <div data-testid="misinformation-detector-parent">
      <Stack>
        <Card variant="outlined">{alert}</Card>
        <TextField
          placeholder="Start typing, or copy and paste your document here"
          multiline
          maxRows={Infinity}
          onChange={onTextUpdate}
          inputProps={{ sx: { minHeight: '450px' } }}
        />
        <Card variant="outlined">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xl: 'row', lg: 'row', sm: 'column' },
              gap: '8px',
            }}
          >
            <Tabs
              value={countWords(text) > MAX_WORD_COUNT ? 0 : false}
              TabIndicatorProps={{ sx: { background: 'red' } }}
            >
              <Tab
                label={`${countWords(text)}/${MAX_WORD_COUNT} words`}
                disableRipple
                disableFocusRipple
              />
            </Tabs>
            <Tabs
              value={containsProfanity(text) ? 0 : false}
              TabIndicatorProps={{
                sx: { background: 'red' },
              }}
            >
              <Tab
                label={
                  containsProfanity(text)
                    ? 'Profanity detected'
                    : 'No profanity detected'
                }
                disableRipple
                disableFocusRipple
              />
            </Tabs>
            <Button
              data-testid="misinformation-detector-submit-button"
              sx={{ marginLeft: 'auto', marginRight: '8px' }}
              disabled={
                containsProfanity(text) || countWords(text) > MAX_WORD_COUNT
              }
              onClick={submit}
            >
              Submit
            </Button>
          </Box>
        </Card>
      </Stack>
    </div>
  );
}

export default MisinformationDetector;
