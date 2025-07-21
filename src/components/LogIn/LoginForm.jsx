import React, { useState } from 'react';
import { loginUser } from '../../services/auth';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { PulseBubbleLoader } from 'react-loaders-kit';

const loaderProps = {
  loading: true,
  size: 25,
  duration: 1,
  colors: ['#ffffff', '#ffffff', '#ffffff'],
};

const LoginForm = ({ onClose, onSuccess }) => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser(credentials);
      const { user } = res.data;

      login(user);
      toast.success(`Welcome ${user.fullName} !`);

      onSuccess?.(user);
      onClose?.();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      console.error("Login error:", err.response?.data || err.message);
      setCredentials({ email: '', password: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        disabled={loading}
        value={credentials.email}
        onChange={handleChange}
        className="w-full p-2 bg-zinc-800 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        disabled={loading}
        value={credentials.password}
        onChange={handleChange}
        className="w-full p-2 bg-zinc-800 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-900 p-2 rounded flex justify-center items-center"
      >
        {loading ? <PulseBubbleLoader {...loaderProps} /> : 'Log In'}
      </button>
    </form>
  );
};

export default LoginForm;
