import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      login(token);
      navigate("/dashboard");
    } else {
      alert("Verification failed or expired");
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <p className="text-lg text-gray-700">Verifying your email...</p>
    </div>
  );
}
