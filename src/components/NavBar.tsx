import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ABOUT_DESTINATION from '../pages/constants';

const pages = [
  { display: 'Home', path: '/', id: 'home-button' },
  {
    display: 'About',
    path: ABOUT_DESTINATION,
    id: 'about-button',
    external: true,
  },
  { display: 'Logout', path: '/logout', id: 'logout-button' },
];

function NavBar() {
  return (
    <AppBar
      position="static"
      sx={{ boxShadow: 'none' }}
      data-testid="navigation-bar-parent"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Polygraph
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                data-testid={page.id}
                component={page.external ? undefined : Link}
                to={page.path}
                href={page.path}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  boxShadow: 'none',
                  ':hover': { color: 'white' },
                }}
                variant="contained"
              >
                {page.display}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
