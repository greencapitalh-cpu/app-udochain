// =======================================================
// ✅ VerifyEmail.tsx — PMDSU v1.7
// =======================================================
//
// 🚀 Qué hace:
//  - Lee ?token= desde el correo
//  - Llama al backend /api/auth/confirm/:token
//  - Si el token es válido, inicia sesión automática y redirige al dashboard
//  - Si falla, muestra error y permite reintentar o ir al login
//
// =======================================================

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";
import Loader from "../ui/Loader";
import Button from "../ui/Button";
import useAutoTranslate from "../hooks/useAutoTranslate";

export default function VerifyEmail() {
  useAutoTranslate();
  const [params] = useSearchParams();
  const token = params.get("token");
  const { postJson } = useApi();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [status, setStatus] = useState<"pending" | "success" | "error">("pending");
  const [message, setMessage] = useState("Verifying your account...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Verification token not found.");
      return;
    }

    (async () => {
      try {
        const res = await postJson(`/api/auth/confirm/${token}`, {});
        if (res?.ok && res?.token) {
          // ✅ Login automático y redirección
          login(res.token, res.user);
          setStatus("success");
          setMessage("✅ Email verified successfully. Redirecting...");
          setTimeout(() => navigate("/dashboard"), 1500);
        } else {
          throw new Error(res?.message || "Verification failed");
        }
      } catch (err: any) {
        console.error("❌ VerifyEmail error:", err);
        setStatus("error");
        setMessage(err?.message || "Verification failed.");
      }
    })();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      {status === "pending" && (
        <>
          <Loader />
          <p className="mt-4 text-sm text-udo-steel">{message}</p>
        </>
      )}

      {status === "success" && (
        <>
          <p className="text-green-600 text-lg font-semibold">{message}</p>
          <Button onClick={() => navigate("/dashboard")} className="mt-4">
            Go to Dashboard
          </Button>
        </>
      )}

      {status === "error" && (
        <>
          <p className="text-red-600 text-lg font-semibold mb-2">Verification Failed</p>
          <p className="text-sm text-udo-steel">{message}</p>
          <div className="flex gap-2 mt-4">
            <Button onClick={() => navigate("/register")}>Back to Register</Button>
            <Button onClick={() => navigate("/login")}>Go to Login</Button>
          </div>
        </>
      )}
    </div>
  );
}
