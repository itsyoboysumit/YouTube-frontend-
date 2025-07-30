// pages/ResetPassword.jsx

import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { resetPassword } from '../services/auth';

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage('Invalid or missing token.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password);
      setMessage('Password reset successful! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
      <form onSubmit={handleSubmit} className="bg-zinc-800 p-6 rounded-xl space-y-4 w-full max-w-md">
        <h2 className="text-xl font-bold">Reset Your Password</h2>
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading} className="bg-green-600 px-4 py-2 rounded">
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}
