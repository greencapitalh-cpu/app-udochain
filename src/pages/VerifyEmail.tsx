// app-udochain/src/pages/VerifyEmail.tsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import Loader from "../ui/Loader";
import Button from "../ui/Button";
import useAutoTranslate from "../hooks/useAutoTranslate";

export default function VerifyEmail() {
  useAutoTranslate();

  const [params] = useSearchParams();
  const token = params.get("token");
  const { postJson } = useApi();
  const [status, setStatus] = useState<"pending" | "success" | "error">("pending");
  const [message, setMessage] = useState("Verifying your account...");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Verification token not found.");
      return;
    }

    (async () => {
      try {
        const res = await postJson(`/api/auth/confirm/${token}`, {});
        if (res?.ok) {
          setStatus("success");
          setMessage("✅ Your email has been verified successfully!");
        } else {
          throw new Error(res?.message || "Verification failed");
        }
      } catch (err: any) {
        setStatus("error");
        setMessage(err?.message || "Verification failed.");
      }
    })();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      {status === "pending" && (
        <>
          <Loader />
          <p className="mt-4 text-sm text-udo-steel">{message}</p>
        </>
      )}

      {status === "success" && (
        <>
          <p className="text-green-600 text-lg font-semibold">{message}</p>
          <Button onClick={() => navigate("/login")} className="mt-4">
            Go to Login
          </Button>
        </>
      )}

      {status === "error" && (
        <>
          <p className="text-red-600 text-lg font-semibold mb-2">Verification Failed</p>
          <p className="text-sm text-udo-steel">{message}</p>
          <Button onClick={() => navigate("/register")} className="mt-4">
            Back to Register
          </Button>
        </>
      )}
    </div>
  );
}
