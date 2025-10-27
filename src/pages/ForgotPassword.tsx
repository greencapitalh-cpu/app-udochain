// =======================================================
// 🧭 ForgotPassword.tsx — Solicitud de restablecimiento de contraseña
// =======================================================
import React, { useState } from "react";
import useApi from "../hooks/useApi";

export default function ForgotPassword() {
  const { req } = useApi();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await req("/api/auth/forgot-password", {
        method: "POST",
        data: { email },
      });
      setMessage(res.message || "Password reset link sent to your email.");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error sending reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Forgot your password?</h1>
        <p className="text-sm text-gray-600 mb-6">
          Enter your email address below, and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            className="w-full border p-3 rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-udo-primary text-white py-2 rounded hover:bg-udo-primary/90"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
}
