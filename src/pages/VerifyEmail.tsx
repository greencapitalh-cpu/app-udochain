// src/pages/VerifyEmail.tsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import Loader from "../ui/Loader";
import Button from "../ui/Button";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const { postJson } = useApi();
  const navigate = useNavigate();

  const [status, setStatus] = useState<"pending" | "success" | "error">("pending");
  const [lang, setLang] = useState<"en" | "es">(
    navigator.language.startsWith("es") ? "es" : "en"
  );
  const [message, setMessage] = useState(
    lang === "es" ? "Verificando tu cuenta..." : "Verifying your account..."
  );

  const t = (en: string, es: string) => (lang === "es" ? es : en);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage(
        t("Verification link not found or invalid.", "Enlace de verificación no encontrado o inválido.")
      );
      return;
    }

    (async () => {
      try {
        const res = await postJson(`/api/auth/confirm/${token}`, {});
        if (res?.ok || res?.message?.includes("verificada")) {
          setStatus("success");
          setMessage(
            t(
              "✅ Your email has been verified successfully!",
              "✅ Tu correo ha sido verificado correctamente."
            )
          );
        } else {
          throw new Error(
            res?.message ||
              t("Verification failed. Please try again.", "No se pudo verificar el correo.")
          );
        }
      } catch (err: any) {
        setStatus("error");
        setMessage(
          err?.message ||
            t("Verification failed. Please try again.", "No se pudo verificar la cuenta.")
        );
      }
    })();
  }, [token, lang]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gray-50">
      <div className="bg-white shadow-md rounded-xl p-6 max-w-md w-full">
        {/* 🌐 Language Toggle */}
        <div className="text-right mb-2">
          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="text-xs text-udo-primary hover:underline"
          >
            {lang === "en" ? "🇪🇸 Español" : "🇺🇸 English"}
          </button>
        </div>

        {/* 🧩 Dynamic content */}
        {status === "pending" && (
          <>
            <Loader />
            <p className="mt-4 text-sm text-udo-steel">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <p className="text-green-600 text-lg font-semibold mb-2">{message}</p>
            <p className="text-sm text-udo-steel mb-4">
              {t(
                "You can now log in with your credentials.",
                "Ya puedes iniciar sesión con tus credenciales."
              )}
            </p>
            <Button onClick={() => navigate("/login")} className="mt-2">
              {t("Go to Login", "Ir al inicio de sesión")}
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <p className="text-red-600 text-lg font-semibold mb-2">
              {t("Verification failed", "Verificación fallida")}
            </p>
            <p className="text-sm text-udo-steel mb-4">{message}</p>
            <Button onClick={() => navigate("/register")} className="mt-2">
              {t("Back to Register", "Volver al registro")}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
