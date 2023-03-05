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
import Filter from 'bad-words';
import MAX_WORD_COUNT from './constants';
import { checkMisinformation } from '../api/api';

const instructionsAlert = (
  <Alert severity="info" data-testid="misinformation-detector-info-alert">
    <AlertTitle>
      <strong>Welcome to Polygraph!</strong>
    </AlertTitle>
    <Box
      sx={{
        display: {
          xl: 'inline',
          lg: 'inline',
          md: 'inline',
          sm: 'inline',
          xs: 'none',
        },
      }}
    >
      Type some text into the field below and click submit to find out if it
      contains misinformation.
    </Box>
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
    <Box
      sx={{
        display: {
          xl: 'inline',
          lg: 'inline',
          md: 'inline',
          sm: 'inline',
          xs: 'none',
        },
      }}
    >
      Our analysis has not found any evidence of misinformation in this text.
    </Box>
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
    <Box
      sx={{
        display: {
          xl: 'inline',
          lg: 'inline',
          md: 'inline',
          sm: 'inline',
          xs: 'none',
        },
      }}
    >
      Our analysis has determined that there is a high likelihood that this text
      contains some misinformation.
    </Box>
  </Alert>
);

const countWords = (input: string) => input.trim().split(/\s+/).length;

interface MisinformationDetectorProps {
  user: string;
}

function MisinformationDetector(props: MisinformationDetectorProps) {
  const [alert, setAlert] = React.useState(instructionsAlert);
  const [text, setText] = React.useState('');

  const filter = new Filter();

  const onTextUpdate = (event: any) => {
    setText(event.target.value);
    setAlert(instructionsAlert);
  };

  const containsProfanity = (input: string) => filter.isProfane(input);

  const submit = async () => {
    const { user } = props;
    const request = { text, user };
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
          inputProps={{
            sx: {
              minHeight: {
                xl: '450px',
                lg: '400px',
                md: '300px',
                sm: '90%',
                xs: '75%',
              },
            },
          }}
        />
        <Card variant="outlined">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: { xl: '8px', lg: '8px', md: '8px', sm: '0px', xs: '0px' },
              justifyContent: 'center',
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
              sx={{
                marginLeft: {
                  xl: 'auto',
                  lg: 'auto',
                  md: 'auto',
                  sm: '0px',
                  xs: '0px',
                },
                marginRight: '8px',
              }}
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
