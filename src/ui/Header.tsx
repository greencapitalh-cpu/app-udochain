// ✅ src/ui/Header.tsx — versión simplificada solo con Log in / Sign up
import { Link } from "react-router-dom";
import logoPath from "../assets/logo-udochain.png";

export default function Header() {
  return (
    <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-40">
      <div className="container-narrow flex items-center justify-between py-3 gap-4">
        {/* 🔹 Logo + marca */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoPath} alt="UDoChain" className="h-8 w-auto" />
          <span className="font-semibold text-udo-ink hidden sm:inline">
            UDoChain
          </span>
        </Link>

        {/* 🔹 Botones simples */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-3 py-1 rounded-lg hover:bg-slate-100 transition"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="px-3 py-1 rounded-lg bg-udo-primary text-white hover:bg-udo-ink transition"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
