// [25] src/pages/Register.tsx
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import SocialButtons from "../ui/SocialButtons";
import { Link, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";
import Loader from "../ui/Loader";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selfie, setSelfie] = useState<File | null>(null);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { postJson, postForm, patchJson } = useApi();
  const { login, setUser } = useAuth();
  const navigate = useNavigate();

  const onSelfieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setSelfie(f);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      // 1) Registro
      const reg = await postJson<{ token: string; user?: any }>(
        "/api/auth/register",
        { name, email, password }
      );
      login(reg.token, reg.user || null);

      // 2) Subir selfie (si el endpoint existe)
      if (selfie) {
        const fd = new FormData();
        fd.append("selfie", selfie);
        try {
          await postForm("/api/profile/selfie", fd);
        } catch {
          // Si no existe el endpoint, continuar sin bloquear
        }
      }

      // 3) Otorgar créditos iniciales (si el endpoint existe)
      try {
        const init = await patchJson<{ balance?: number }>(
          "/api/credits/init",
          {}
        );
        if (reg.user) {
          setUser({ ...reg.user, credits: init?.balance ?? reg.user.credits });
        }
      } catch {
        // Si no existe, ignorar
      }

      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-md mx-auto card p-6">
      <h1 className="text-xl font-semibold mb-4">Create your account</h1>
      <form onSubmit={submit} className="space-y-3">
        <label className="block text-sm">Full name</label>
        <Input
          value={name}
          onChange={(e) => setName((e.target as HTMLInputElement).value)}
          placeholder="Your name"
          required
        />
        <label className="block text-sm">Email</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
          placeholder="you@company.com"
          required
        />
        <label className="block text-sm">Password</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
          placeholder="••••••••"
          required
        />

        <label className="block text-sm">Selfie (for identity record)</label>
        <input
          type="file"
          accept="image/*"
          capture="user"
          onChange={onSelfieChange}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />

        <Button disabled={busy} type="submit">
          {busy ? "Creating…" : "Create account"}
        </Button>
        {busy && <Loader />}
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>

      <div className="my-4 h-px bg-slate-200" />
      <SocialButtons onGoogle={() => {}} onFacebook={() => {}} onApple={() => {}} />

      <p className="text-sm text-udo-steel mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-udo-primary underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
