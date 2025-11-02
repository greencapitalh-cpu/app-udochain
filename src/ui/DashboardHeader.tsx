import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoPath from "../assets/logo-udochain.png";

export default function DashboardHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const nav: [string, string][] = [
    ["Dashboard", "/dashboard"],
    ["Evidences", "https://wapp.udochain.com"],
    ["Identity", "https://wapp.udochain.com"],
    ["Plans", "https://wapp.udochain.com"],
    ["Inicio", "https://app.udochain.com"],
  ];

  return (
    <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-40">
      <div className="container-narrow flex items-center justify-between py-3 gap-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <img src={logoPath} alt="UDoChain" className="h-8 w-auto" />
          <span className="font-semibold text-udo-ink hidden sm:inline">UDoChain</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {nav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="px-3 py-1 rounded-full hover:bg-udo-sky text-udo-primary transition-all"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-sm text-udo-steel hidden sm:inline">
            {user?.username || user?.email || "User"}
          </span>
          <button
            className="px-3 py-1 rounded-lg bg-udo-primary text-white hover:bg-udo-ink"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
