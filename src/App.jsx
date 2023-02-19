import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteList from './RouteList';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import Login from './pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser (user);
    });
  }, []);

  return (
    <Router>
      {user ? <Home user = {user} /> : <Login />} 
      <RouteList />
    </Router>
  );
}

export default App;
