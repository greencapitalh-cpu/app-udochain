import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoPath from "../assets/logo-udochain.png"; // ✅ Import directo desde assets

export default function Header() {
  const { pathname } = useLocation();
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const nav: [string, string][] = [
    ["Home", "/"],
    ["Dashboard", "/dashboard"],
    ["Validate", "/validate"],
    ["Sign", "/sign"],
    ["Vote", "/vote"],
    ["Trace", "/trace"],
    ["Payments", "/payments"],
  ];

  return (
    <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-40">
      <div className="container-narrow flex items-center justify-between py-3 gap-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoPath} alt="UDoChain" className="h-8 w-auto" />
          <span className="font-semibold text-udo-ink hidden sm:inline">
            UDoChain
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              to={href}
              className={`px-3 py-1 rounded-full ${
                pathname === href
                  ? "bg-udo-sky text-udo-primary"
                  : "hover:bg-slate-100"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {token ? (
            <>
              <span className="text-sm text-udo-steel hidden sm:inline">
                {user?.name || user?.email}
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
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 rounded-lg hover:bg-slate-100"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 rounded-lg bg-udo-primary text-white hover:bg-udo-ink"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
