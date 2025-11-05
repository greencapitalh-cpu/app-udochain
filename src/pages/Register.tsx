import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import SocialButtons from "../ui/SocialButtons";
import { Link, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import Loader from "../ui/Loader";
import useAutoTranslate from "../hooks/useAutoTranslate";

function isStrongPassword(pw: string) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(pw);
}
function isValidUsername(u: string) {
  return /^[A-Za-z0-9]{8}$/.test(u);
}

export default function Register() {
  useAutoTranslate(); // 🌍 Detects and auto-translates
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const { postJson } = useApi();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!isValidUsername(username)) {
      setError("Username must have exactly 8 alphanumeric characters (A–Z, a–z, 0–9).");
      return;
    }
    if (!isStrongPassword(password)) {
      setError("Password must include at least 8 characters with uppercase, lowercase, number, and symbol.");
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
        setMessage("Registration successful. Check your email to confirm your account before signing in.");
      } else {
        setMessage("Account created successfully. Check your email to confirm your account before signing in.");
      }
    } catch (err: any) {
      setError(err?.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-md mx-auto card p-6">
      <h1 className="text-xl font-semibold mb-4">Create your account</h1>

      {message ? (
        <div className="text-center">
          <p className="text-green-600 text-sm mb-4">{message}</p>
          <Button onClick={() => navigate("/login")} className="w-full">
            Go to Login
          </Button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <label className="block text-sm">Username (8 chars, A–Z, a–z, 0–9)</label>
          <Input
            value={username}
            onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
            placeholder="ex. Jhonny99"
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
      )}

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
