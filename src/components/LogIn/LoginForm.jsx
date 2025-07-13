import React, { useState } from 'react';
import { loginUser } from '../../services/auth';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';

const LoginForm = ({ onClose, onSuccess }) => {
  const { login } = useAuth(); // ✅ Use directly
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(credentials);

      const { user } = res.data;
      const { accessToken } = res;

      login(user); // update context state

      toast.success(`Welcome ${user.fullName} !`);

      localStorage.setItem('accessToken', accessToken);

      onSuccess?.(user);
      onClose?.();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      console.error("❌ Login failed:", err.response?.data || err.message);
      setCredentials({ email: '', password: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={credentials.email}
        onChange={handleChange}
        className="w-full p-2 bg-zinc-800 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        value={credentials.password}
        onChange={handleChange}
        className="w-full p-2 bg-zinc-800 rounded"
      />
      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-900 p-2 rounded"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
