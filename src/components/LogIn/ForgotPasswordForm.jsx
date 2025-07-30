import { useState } from "react";
import { toast } from "react-hot-toast";
import { forgotPassword } from "../../services/auth"; // API service

const ForgotPasswordForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await forgotPassword({ email }); // Sends POST to /auth/forgot-password
      toast.success("Password reset email sent! Please check your inbox.");
      onClose?.(); // Close the modal if provided
    } catch (err) {
      const message =
        err?.response?.data?.message || "Failed to send reset email";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleReset} className="space-y-4">
      <input
        type="email"
        required
        value={email}
        disabled={loading}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your registered email"
        className="w-full p-2 bg-zinc-800 rounded text-white placeholder-gray-400"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full p-2 rounded ${
          loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Sending..." : "Send Reset Email"}
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
