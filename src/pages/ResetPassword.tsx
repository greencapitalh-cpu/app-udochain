// =======================================================
// 🔑 ResetPassword.tsx — Formulario de restablecimiento de contraseña
// =======================================================
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { req } = useApi();

  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await req("/api/auth/reset-password", {
        method: "POST",
        data: { token, newPassword: password },
      });
      setMessage(res.message || "Password reset successfully.");
      // Redirigir luego de unos segundos
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Reset your password</h1>
        <p className="text-sm text-gray-600 mb-6">
          Please enter a new password for your account.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            className="w-full border p-3 rounded mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full border p-3 rounded mb-3"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-udo-primary text-white py-2 rounded hover:bg-udo-primary/90"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
}
