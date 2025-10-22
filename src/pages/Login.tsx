// [24] src/pages/Login.tsx
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import SocialButtons from "../ui/SocialButtons";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: conectar con backend (auth)
  };

  return (
    <div className="max-w-md mx-auto card p-6">
      <h1 className="text-2xl font-bold mb-4">Log in</h1>
      <form className="space-y-3" onSubmit={submit}>
        <label className="block">
          <span className="text-sm">Email</span>
          <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" required />
        </label>
        <label className="block">
          <span classN
