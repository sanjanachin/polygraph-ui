import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import RouteList from './RouteList';
import { auth } from './services/firebase';
import Login from './pages/LoginPage';
import Logout from './pages/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        setUser(newUser.email);
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      // Do nothing. User should try again.
    }
  };

  return (
    <Router>
      <Routes>
        {!user && <Route path="/" element={<Login />} />}
        {user && (
          <>
            <Route path="/" element={<RouteList user={user} />} />
            <Route
              path="/logout"
              element={<Logout handleLogout={handleLogout} />}
            />
            <Route path="/*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
