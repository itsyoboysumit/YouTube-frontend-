import { useState } from "react";
import { toast } from "react-hot-toast";
import { changePassword } from "../../services/auth"; // you write this API

const ForgotPasswordForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await changePassword({ email }); // your backend API
      toast.success("Password reset email sent!");
      onClose?.();
    } catch (err) {
      toast.error("Something went wrong",err);
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
        className="w-full p-2 bg-zinc-800 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-800 p-2 rounded"
      >
        {loading ? "Sending..." : "Send Reset Email"}
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
