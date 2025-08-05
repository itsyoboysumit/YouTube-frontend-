import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { logoutUser, getCurrentUser, refreshToken } from '../services/auth';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser.data);
    } catch (err) {
      console.error("Login failed while fetching current user", err);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout error:", err);
    }
    setUser(null);
  };

  useEffect(() => {
    const tryRestoreSession = async () => {
      try {
        await refreshToken();
        const currentUser = await getCurrentUser();
        setUser(currentUser.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    tryRestoreSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
