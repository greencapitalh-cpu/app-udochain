// app-udochain/src/pages/ForgotPassword.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import useApi from "../hooks/useApi";
import useAutoTranslate from "../hooks/useAutoTranslate";

export default function ForgotPassword() {
  useAutoTranslate();

  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { postJson } = useApi();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setBusy(true);

    try {
      const res = await postJson("/api/auth/forgot-password", { email });
      if (res?.ok) {
        setMessage(
          "If your email exists in our system, you will receive a reset link shortly."
        );
      } else {
        throw new Error(res?.message || "Something went wrong");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to send reset email");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-md mx-auto card p-6 text-center">
      <h1 className="text-xl font-semibold mb-4">Reset your password</h1>

      {message ? (
        <div>
          <p className="text-green-600 text-sm mb-4">{message}</p>
          <Button onClick={() => navigate("/login")} className="w-full">
            Go to Login
          </Button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3 text-left">
          <label className="block text-sm">Email address</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            placeholder="you@company.com"
            required
          />
          <Button disabled={busy} type="submit" className="w-full">
            {busy ? "Sending…" : "Send reset link"}
          </Button>
          {busy && <Loader />}
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </form>
      )}

      <div className="my-4 h-px bg-slate-200" />
      <p className="text-sm text-udo-steel">
        Remembered your password?{" "}
        <Link to="/login" className="text-udo-primary underline">
          Go back to login
        </Link>
      </p>
    </div>
  );
}
