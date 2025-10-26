// =======================================================
// ✅ OAuthSuccess.tsx — PMDSU v1.7
// =======================================================
//
// 🚀 Qué hace:
//  - Recibe token de Google, Facebook o Email verified
//  - Llama a /api/auth/me para validar usuario
//  - Guarda sesión y redirige automáticamente al dashboard
//
// =======================================================

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";
import Loader from "../ui/Loader";
import useAutoTranslate from "../hooks/useAutoTranslate";

export default function OAuthSuccess() {
  useAutoTranslate();

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token") || params.get("authToken");
  const { getJson } = useApi();
  const { login } = useAuth();

  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [message, setMessage] = useState("Validando tu sesión...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token de sesión no encontrado.");
      return;
    }

    (async () => {
      try {
        const user = await getJson("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (user && user.email) {
          login(token, user);
          setMessage("✅ Sesión verificada. Redirigiendo al Dashboard...");
          setTimeout(() => navigate("/dashboard"), 1500);
        } else {
          throw new Error("Respuesta inválida del servidor.");
        }
      } catch (err: any) {
        console.error("❌ OAuthSuccess error:", err);
        setStatus("error");
        setMessage("Error al validar la sesión. Intenta nuevamente.");
      }
    })();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      {status === "loading" ? (
        <>
          <Loader />
          <p className="mt-4 text-sm text-udo-steel">{message}</p>
        </>
      ) : (
        <>
          <p className="text-red-600 font-semibold mb-3">Error</p>
          <p className="text-sm text-udo-steel">{message}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-4 py-2 bg-udo-primary text-white rounded-md"
          >
            Volver al inicio de sesión
          </button>
        </>
      )}
    </div>
  );
}
