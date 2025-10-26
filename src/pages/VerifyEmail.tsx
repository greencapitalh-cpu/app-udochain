// =======================================================
// ✅ VerifyEmail.tsx — PMDSU v1.3 (DETALLADO)
// =======================================================
//
// Qué hace:
// - Lee ?token= de la URL (llega desde el email).
// - Llama a /api/auth/confirm/:token (POST) con token codificado.
// - Si responde ok+token → guarda sesión (useAuth.login) y redirige a /dashboard.
// - Muestra estados "pending", "success" o "error".
//
// Requisitos:
// - useApi.postJson (ya existente en tu proyecto).
// - useAuth.login(token, user) que guarde token + datos del usuario.
// - useAutoTranslate para traducción automática (política de idioma).
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
  const token = params.get("token"); // viene desde el email
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
        // ⚠️ IMPORTANTE: codificar token (evita romper si tiene + / =)
        const res = await postJson(`/api/auth/confirm/${encodeURIComponent(token)}`, {});
        // Esperamos { ok:true, token, user }
        if (res?.ok && res?.token) {
          // Guarda sesión inmediatamente y redirige (UX limpia)
          login(res.token, res.user);
          setStatus("success");
          setMessage("✅ Account verified successfully. Redirecting...");
          setTimeout(() => navigate("/dashboard"), 1500);
        } else {
          throw new Error(res?.message || "Verification failed");
        }
      } catch (err: any) {
        console.error("❌ verify-email error:", err?.message || err);
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
          <Loader />
        </>
      )}

      {status === "error" && (
        <>
          <p className="text-red-600 text-lg font-semibold mb-2">Verification Failed</p>
          <p className="text-sm text-udo-steel">{message}</p>
          <div className="mt-4 flex gap-2 justify-center">
            <Button onClick={() => navigate("/register")}>Back to Register</Button>
            <Button onClick={() => navigate("/login")} variant="secondary">Go to Login</Button>
          </div>
        </>
      )}
    </div>
  );
}
