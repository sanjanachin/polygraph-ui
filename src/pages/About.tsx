import React from 'react';
import NavBar from '../components/NavBar';
import ABOUT_DESTINATION from './constants';

function About() {
  React.useEffect(() => {
    window.location.replace(ABOUT_DESTINATION);
  }, []);
  return (
    <div data-testid="about-page">
      <NavBar />
      Redirecting to GitHub repo...
    </div>
  );
}

export default About;
