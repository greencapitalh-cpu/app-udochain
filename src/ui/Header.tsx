        import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo-udochain.png"; // ✅ Import directo — la forma correcta

export default function Header() {
  const { pathname } = useLocation();
  const nav: [string, string][] = [
    ["Home", "/"],
    ["Dashboard", "/dashboard"],
    ["Validate", "/validate"],
    ["Sign", "/sign"],
    ["Vote", "/vote"],
    ["Trace", "/trace"],
    ["Payments", "/payments"]
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur shadow-sm">
      <div className="container-narrow py-3 flex flex-col items-center">
        <img
          src={logo}
          alt="UDoChain Logo"
          className="h-16 md:h-20 w-auto mb-1"
        />
        <Link
          to="/"
          className="font-bold tracking-wide text-udo-ink text-[clamp(1.1rem,2vw,1.6rem)]"
        >
          UDoChain
        </Link>
        <nav className="mt-3 flex flex-wrap gap-3 text-sm">
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
      </div>
    </header>
  );
}
