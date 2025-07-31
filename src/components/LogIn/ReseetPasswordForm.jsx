import { useEffect, useRef, useState } from 'react';
import { resetPassword } from '../../services/auth';

export default function ResetPasswordForm({ token, navigate }) {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' or 'success'
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus(); // Auto-focus input on mount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessageType('error');
      setMessage('Invalid or missing token.');
      setPassword('');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      await resetPassword(token, password);
      setMessageType('success');
      setMessage('Password reset successful! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessageType('error');
      setMessage(err?.response?.data?.message || 'Failed to reset password.');
      setPassword('');
      inputRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-zinc-900">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 text-white p-8 rounded-2xl shadow-lg w-full max-w-lg border border-zinc-700 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Reset Your Password</h2>

        <input
          ref={inputRef}
          type="password"
          placeholder="Enter New Password"
          className="w-full px-4 py-3 rounded bg-zinc-900 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 transition px-4 py-3 rounded font-medium disabled:opacity-50"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>

        {message && (
          <p
            className={`text-sm text-center ${
              messageType === 'error' ? 'text-red-400' : 'text-green-400'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
