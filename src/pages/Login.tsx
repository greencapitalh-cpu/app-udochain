// frontend/src/pages/Login.tsx
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import SocialButtons from "../ui/SocialButtons";
import { Link, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";
import Loader from "../ui/Loader";
import useTranslate from "../hooks/useTranslate";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { postJson } = useApi();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t, LangToggle } = useTranslate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const data = await postJson<{ token: string; user?: any }>("/api/auth/login", {
        email,
        password,
      });
      login(data.token, data.user || null);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.message || t("Login failed", "Error al iniciar sesión"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative max-w-md mx-auto card p-6">
      <LangToggle />
      <h1 className="text-xl font-semibold mb-4">
        {t("Log in", "Iniciar sesión")}
      </h1>
      <form onSubmit={submit} className="space-y-3">
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
          {busy ? t("Signing in…", "Ingresando…") : t("Continue", "Continuar")}
        </Button>
        {busy && <Loader />}
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>

      <div className="my-4 h-px bg-slate-200" />
      <SocialButtons />

      <p className="text-sm text-udo-steel mt-4">
        {t("Don’t have an account?", "¿No tienes una cuenta?")}{" "}
        <Link to="/register" className="text-udo-primary underline">
          {t("Sign up", "Regístrate")}
        </Link>
      </p>
    </div>
  );
}
