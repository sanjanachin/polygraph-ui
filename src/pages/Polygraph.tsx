import React from 'react';
import Box from '@mui/material/Box';
import MisinformationDetector from '../components/MisinformationDetector';
import UserHistory from '../components/UserHistory';
import NavBar from '../components/NavBar';

function Polygraph() {
  return (
    <div data-testid="home-page">
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xl: 'row',
            lg: 'row',
            md: 'row',
            sm: 'column',
            xs: 'column',
          },
          justifyContent: 'center',
          flex: 1,
          marginTop: '10px',
          marginLeft: '10%',
          marginRight: '10%',
          maxHeight: {
            xl: '85vh',
            lg: '85vh',
            md: '85vh',
            sm: '',
            xs: '',
          },
        }}
      >
        <Box
          sx={{ flexBasis: '75%', marginRight: '10px' }}
          data-testid="misinformation-detector-flex-item"
        >
          <MisinformationDetector user="" />
        </Box>

        <Box sx={{ flexBasis: '25%' }} data-testid="user-history-flex-item">
          <UserHistory user="" />
        </Box>
      </Box>
    </div>
  );
}

export default Polygraph;
