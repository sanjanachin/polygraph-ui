import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ handleLogout }) {
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const logout = async () => {
      setIsLoggingOut(true);
      await handleLogout();
      setIsLoggingOut(false);
      navigate('/');
    };
    logout();
  }, [handleLogout, navigate]);

  return (
    <div>
      {isLoggingOut ? (
        <p>Logging out...</p>
      ) : (
        <p>Successfully logged out. Redirecting to home page...</p>
      )}
    </div>
  );
}

export default Logout;
