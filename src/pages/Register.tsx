import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import SocialButtons from "../ui/SocialButtons";
import { Link, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import Loader from "../ui/Loader";
import useTranslate from "../hooks/useTranslate";

function isStrongPassword(pw: string) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(pw);
}
function isValidUsername(u: string) {
  return /^[A-Za-z0-9]{8}$/.test(u);
}

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const { postJson } = useApi();
  const navigate = useNavigate();
  const { t, LangToggle } = useTranslate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!isValidUsername(username)) {
      setError(
        t(
          "Username must have exactly 8 alphanumeric characters (A–Z, a–z, 0–9).",
          "El nombre de usuario debe tener exactamente 8 caracteres alfanuméricos (A–Z, a–z, 0–9)."
        )
      );
      return;
    }
    if (!isStrongPassword(password)) {
      setError(
        t(
          "Password must include at least 8 characters with uppercase, lowercase, number, and symbol.",
          "La contraseña debe tener al menos 8 caracteres e incluir mayúscula, minúscula, número y símbolo."
        )
      );
      return;
    }

    setBusy(true);
    try {
      const reg = await postJson("/api/auth/register", {
        username,
        email,
        password,
      });

      if (reg?.next === "verify_email") {
        setMessage(
          t(
            "Registration successful. Check your email to confirm your account before signing in.",
            "Registro exitoso. Revisa tu correo para confirmar tu cuenta antes de iniciar sesión."
          )
        );
      } else {
        setMessage(
          t("Account created successfully.", "Cuenta creada correctamente.")
        );
      }
    } catch (err: any) {
      setError(err?.message || t("Registration failed", "Error en el registro"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative max-w-md mx-auto card p-6">
      <LangToggle />
      <h1 className="text-xl font-semibold mb-4">
        {t("Create your account", "Crea tu cuenta")}
      </h1>

      {message ? (
        <div className="text-center">
          <p className="text-green-600 text-sm mb-4">{message}</p>
          <Button onClick={() => navigate("/login")} className="w-full">
            {t("Go to Login", "Ir a inicio de sesión")}
          </Button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <label className="block text-sm">
            {t("Username (8 chars, A–Z, a–z, 0–9)", "Nombre de usuario (8 caracteres, A–Z, a–z, 0–9)")}
          </label>
          <Input
            value={username}
            onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
            placeholder="e.g. CL4UD1O1"
            required
            maxLength={8}
            minLength={8}
          />
          <label className="block text-sm">{t("Email", "Correo electrónico")}</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            placeholder="you@company.com"
            required
          />
          <label className="block text-sm">{t("Password", "Contraseña")}</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
            placeholder="••••••••"
            required
          />

          <Button disabled={busy} type="submit">
            {busy ? t("Creating…", "Creando…") : t("Create account", "Crear cuenta")}
          </Button>
          {busy && <Loader />}
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>
      )}

      <div className="my-4 h-px bg-slate-200" />
      <SocialButtons />

      <p className="text-sm text-udo-steel mt-4">
        {t("Already have an account?", "¿Ya tienes una cuenta?")}{" "}
        <Link to="/login" className="text-udo-primary underline">
          {t("Log in", "Iniciar sesión")}
        </Link>
      </p>
    </div>
  );
}
