import { useState } from "react";
import { toast } from "react-hot-toast";
import { forgotPassword } from "../../services/auth";

const ForgotPasswordForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await forgotPassword({ email }); 
      toast.success("Password reset email sent! Please check your inbox.");
      onClose?.();
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
          loading ? "bg-red-400" : "bg-zinc-600 hover:bg-red-700"
        }`}
      >
        {loading ? "Sending..." : "Send Reset Email"}
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
