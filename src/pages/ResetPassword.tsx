// =======================================================
// 🔑 ResetPassword.tsx — versión restaurada y funcional (sin doble encriptación)
// =======================================================
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";

export default function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { postJson } = useApi();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage("⚠️ Passwords do not match.");
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      // ✅ Enviar la contraseña normal, sin MD5 (el backend ya aplica bcrypt)
      const res = await postJson("/api/auth/reset-password", {
        token,
        newPassword: password,
      });

      setMessage(res.message || "✅ Password reset successfully.");
      setIsError(false);

      // 🧹 Limpieza de sesión local
      localStorage.removeItem("token");
      localStorage.removeItem("authFromApp");

      // 🔁 Redirigir a login tras éxito
      setTimeout(() => navigate("/login"), 2500);
    } catch (err: any) {
      console.error("⚠️ Reset password error:", err);
      const msg =
        err?.message || "⚠️ Error resetting password. Invalid or expired link.";
      setMessage(msg);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-udo-primary">
          Reset your password
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Enter and confirm your new password below.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            className="w-full border border-gray-300 p-3 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-udo-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm password"
            className="w-full border border-gray-300 p-3 rounded mb-5 focus:outline-none focus:ring-2 focus:ring-udo-primary"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-udo-primary text-white py-2 rounded-lg hover:bg-udo-primary/90 disabled:opacity-60 transition"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-sm ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <button
          onClick={() => navigate("/login")}
          className="mt-6 text-sm text-udo-steel hover:underline"
        >
          Back to login
        </button>
      </div>
    </div>
  );
}
