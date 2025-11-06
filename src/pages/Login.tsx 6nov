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

  // 🔒 Forgot Password States
  const [showForgot, setShowForgot] = useState(false);
  const [emailReset, setEmailReset] = useState("");
  const [resetMsg, setResetMsg] = useState<string | null>(null);
  const [resetError, setResetError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError(null);
    setResetMsg(null);
    if (!emailReset) return setResetError("Please enter your email");
    setSending(true);
    try {
      const res = await postJson("/api/auth/forgot-password", { email: emailReset });
      setResetMsg(res.message || "Password reset email sent.");
    } catch (err: any) {
      setResetError(err.message || "Unable to send email");
    } finally {
      setSending(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const data = await postJson<{ token: string; user?: any }>("/api/auth/login", {
        email,
        password,
      });

      // ✅ Guarda token local y redirige a WAPP
      login(data.token, data.user || null);
      window.location.href = `https://wapp.udochain.com/?token=${encodeURIComponent(
        data.token
      )}`;
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

        <Button disabled={busy} type="submit" className="w-full">
          {busy ? "Signing in…" : "Continue"}
        </Button>

        <div className="text-right mt-2">
          <button
            type="button"
            onClick={() => setShowForgot(true)}
            className="text-udo-primary text-sm underline hover:text-udo-steel"
          >
            Forgot your password?
          </button>
        </div>

        {busy && <Loader />}
        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
      </form>

      <div className="my-4 h-px bg-slate-200" />
      <SocialButtons />

      <p className="text-sm text-udo-steel mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-udo-primary underline">
          Sign up
        </Link>
      </p>

      {/* 🧩 Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-xl">
            <h2 className="text-xl font-semibold text-center mb-2 text-udo-primary">
              Forgot your password?
            </h2>
            <p className="text-sm text-udo-steel text-center mb-4">
              Enter your email and we’ll send you a reset link.
            </p>

            <form onSubmit={handleForgot} className="space-y-3">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={emailReset}
                onChange={(e) => setEmailReset(e.target.value)}
                required
              />
              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-udo-primary text-white rounded-lg"
              >
                {sending ? "Sending..." : "Send reset link"}
              </Button>
            </form>

            {resetError && (
              <p className="text-red-500 text-sm mt-3 text-center">{resetError}</p>
            )}
            {resetMsg && (
              <p className="text-green-600 text-sm mt-3 text-center">{resetMsg}</p>
            )}

            <div className="text-center mt-5">
              <button
                className="text-udo-steel text-sm hover:underline"
                onClick={() => setShowForgot(false)}
              >
                Back to login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
