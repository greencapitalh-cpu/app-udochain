import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying your email...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("Invalid or expired verification link.");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    try {
      // Guardamos token y dejamos que AuthContext lo valide
      login(token);
      setStatus("Email verified successfully! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error("Email verification error:", err);
      setStatus("Verification failed. Please log in again.");
      setTimeout(() => navigate("/login"), 2000);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <p className="text-lg text-gray-700">{status}</p>
    </div>
  );
}
