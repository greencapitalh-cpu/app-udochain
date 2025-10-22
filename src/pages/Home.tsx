// [23] src/pages/Home.tsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="grid md:grid-cols-2 gap-6 items-center">
      <div className="card p-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">You do. We validate.</h1>
        <p className="text-udo-steel mb-6">
          Validate, sign, vote and trace with blockchain-backed trust. Simple, fast and secure.
        </p>
        <div className="flex gap-3">
          <Link to="/register" className="rounded-lg bg-udo-primary text-white px-4 py-2">Get Started</Link>
          <Link to="/login" className="rounded-lg border px-4 py-2">I already have an account</Link>
        </div>
      </div>
      <div className="card p-6">
        <h2 className="font-semibold mb-2">What you can do</h2>
        <ul className="list-disc pl-5 text-udo-steel">
          <li>Validate files of any type</li>
          <li>Request legally binding signatures</li>
          <li>Create and manage voting lists</li>
          <li>
