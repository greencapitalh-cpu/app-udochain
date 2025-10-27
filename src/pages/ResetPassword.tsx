// =======================================================
// 🔑 ResetPassword.tsx — Formulario de restablecimiento de contraseña
// =======================================================
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { req } = useApi();

  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return setMessage("Passwords do not match.");

    setLoading(true);
    try {
      const res = await req("/api/auth/reset-password", {
        method: "POST",
        data: { token, newPassword: password },
      });
      setMessage(res.message || "Password reset successfully.");
      setTimeout(()
