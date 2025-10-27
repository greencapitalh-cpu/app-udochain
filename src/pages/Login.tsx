import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import SocialButtons from "../ui/SocialButtons";
import { Link, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";
import Loader from "../ui/Loader";
import useAutoTranslate from "../hooks/useAutoTranslate";

export default function Login() {
  useAutoTranslate(); // 🌍 Automatic translation based on browser
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { postJson } = useApi();
  const { login } = useAuth();
  const navigate = useNavigate();

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
      setError(err?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-md mx-auto card p-6">
      <h1 className="text-xl font-semibold mb-4">Log in</h1>
      <form onSubmit={submit} className="space-y-3">
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
          {busy ? "Signing in…" : "Continue"}
        </Button>
        {busy && <Loader />}
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>

      <div className="my-4 h-px bg-slate-200" />
      <SocialButtons />

      <p className="text-sm text-udo-steel mt-4">
  Don't have an account?{" "}
  <Link to="/register" className="text-udo-primary underline">
    Sign up
  </Link>
</p>

<p className="text-sm text-udo-steel mt-2">
  <Link to="/forgot-password" className="underline text-udo-primary">
    Forgot your password?
  </Link>
</p>
    </div>
  );
}
