import { useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (userData, refreshToken) => {
    setUser(userData);
    localStorage.setItem('refreshToken', refreshToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('refreshToken');
  };

  useEffect(() => {
  const refreshToken = localStorage.getItem('refreshToken');

  const tryRestoreSession = async () => {
    if (refreshToken) {
      try {
        // 1. Call refresh endpoint to get new tokens
        const res = await axios.post('/api/v1/users/refresh-token', { refreshToken });

        const { accessToken, refreshToken: newRefreshToken } = res.data;

        // 2. Save new refresh token
        localStorage.setItem('refreshToken', newRefreshToken);

        // 3. Set access token for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // 4. Now fetch user data by hitting the current user endpoint
        const profileRes = await axios.get('/api/v1/users/current-user');
        setUser(profileRes.data.data); 
        console.log("User restored from session:", profileRes.data.data);
        console.log("Name:", profileRes.data.data.fullName);

      } catch (err) {
        console.error('Session restore failed', err);
        logout();
      }
    }

    setLoading(false);
  };

  tryRestoreSession();
}, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
