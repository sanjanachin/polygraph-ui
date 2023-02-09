import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import MisinformationDetector from '../components/MisinformationDetector';
import NavBar from '../components/NavBar';

function Polygraph() {
  return (
    <div data-testid="home-page">
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xl: 'row', lg: 'row', sm: 'column' },
          justifyContent: 'center',
          flex: 1,
          marginTop: '10px',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
        <Box
          sx={{ flexBasis: '75%', marginRight: '10px' }}
          data-testid="history-parent"
        >
          <MisinformationDetector />
        </Box>

        <Card sx={{ flexBasis: '25%' }} data-testid="user-history-parent">
          history
        </Card>
      </Box>
    </div>
  );
}

export default Polygraph;
