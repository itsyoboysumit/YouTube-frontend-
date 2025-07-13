// ✅ src/hooks/useAuth.js
import { useContext } from 'react';
import AuthContext from '../context/AuthContext.jsx';

export const useAuth = () => useContext(AuthContext);
// This hook provides easy access to the authentication context throughout the application.
// It allows components to access authentication state and methods without needing to import the context directly.