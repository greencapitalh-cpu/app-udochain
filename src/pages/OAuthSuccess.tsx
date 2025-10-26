// =======================================================
// ✅ OAuthSuccess.tsx — UDoChain PMDSU v1.3
// =======================================================
//
// 🔍 Qué hace:
// - Lee el parámetro ?token= que viene de Google, Facebook o Apple OAuth.
// - Valida el token llamando a /api/auth/me.
// - Guarda la sesión en el AuthContext (login(token, user)).
// - Muestra un mensaje tipo “Validando tu sesión…” mientras se procesa.
// - Redirige automáticamente a /dashboard.
//
// 🧩 Requisitos previos:
// - useApi.ts → debe tener postJson/getJson
// - useAuth.tsx → debe tener login(token, user)
// - useAutoTranslate() activo (para multilenguaje)
//
// =======================================================

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";
import Loader from "../ui/Loader";
import useAutoTranslate from "../hooks/useAutoTranslate";

export default function OAuthSuccess() {
  useAutoTranslate(); // 🌍 Traducción automática (multilenguaje)

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token");
  const { getJson } = useApi();
  const { login } = useAuth();

  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [message, setMessage] = useState("Validando tu sesión...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No se encontró el token de sesión.");
      return;
    }

    (async () => {
      try {
        // 🚀 Consultar /api/auth/me con token temporal para obtener datos del usuario
        const user = await getJson("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (user && user.email) {
          // 💾 Guarda sesión en el contexto global
          login(token, user);
          setMessage("✅ Sesión verificada. Redirigiendo...");
          setTimeout(() => navigate("/dashboard"), 1500);
        } else {
          throw new Error("Respuesta inválida del servidor.");
        }
      } catch (err: any) {
        console.error("❌ OAuthSuccess error:", err.message || err);
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
