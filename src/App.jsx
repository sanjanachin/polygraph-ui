import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteList from './RouteList';
import firebase from './services/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
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
