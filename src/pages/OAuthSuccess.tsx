// =======================================================
// ✅ OAuthSuccess.tsx — UDoChain PMDSU v1.4 (Multiplataforma)
// =======================================================
//
// 🔍 Qué hace:
// - Captura el token de Google, Facebook o Apple (?token / ?authToken).
// - Valida el token con /api/auth/me.
// - Guarda sesión global (AuthContext) y redirige al Dashboard.
// - Traduce automáticamente según idioma del dispositivo.
//
// =======================================================

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";
import Loader from "../ui/Loader";
import useAutoTranslate from "../hooks/useAutoTranslate";

export default function OAuthSuccess() {
  useAutoTranslate(); // 🌍 Traducción automática

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { getJson } = useApi();
  const { login } = useAuth();

  // 🔑 Captura token universal (Google / Facebook / Apple)
  const token = params.get("token") || params.get("authToken");

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
        // 🚀 Validar token contra backend
        const user = await getJson("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (user && user.email) {
          // 💾 Guardar sesión en AuthContext
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
