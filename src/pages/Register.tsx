// app-udochain/src/pages/Register.tsx
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import SocialButtons from "../ui/SocialButtons";
import { Link, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";
import Loader from "../ui/Loader";

function isStrongPassword(pw: string) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(pw);
}
function isValidUsername(u: string) {
  return /^[A-Za-z0-9]{8}$/.test(u);
}

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");

  const [busy, setBusy]   = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { postJson } = useApi();
  const { login }     = useAuth();
  const navigate      = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValidUsername(username)) {
      setError("Username debe tener EXACTAMENTE 8 caracteres alfanuméricos (A–Z, a–z, 0–9).");
      return;
    }
    if (!isStrongPassword(password)) {
      setError("La contraseña debe tener ≥8 chars e incluir mayúscula, minúscula, número y símbolo.");
      return;
    }

    setBusy(true);
    try {
      const reg = await postJson<{ token: string; user?: any }>("/api/auth/register", {
        username,
        email,
        password,
      });
      login(reg.token, reg.user || null);
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
        <label className="block text-sm">Username (8 chars, A–Z, a–z, 0–9)</label>
        <Input
          value={username}
          onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
          placeholder="e.g. CL4UD1O1"
          required
          maxLength={8}
          minLength={8}
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

        <Button disabled={busy} type="submit">
          {busy ? "Creating…" : "Create account"}
        </Button>
        {busy && <Loader />}
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>

      <div className="my-4 h-px bg-slate-200" />
      <SocialButtons />

      <p className="text-sm text-udo-steel mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-udo-primary underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
