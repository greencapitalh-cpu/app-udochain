import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { token, loading } = useAuth();

  // 🧠 BLOQUEO INTELIGENTE SINCRONIZADO CON AuthContext
  // -----------------------------------------------------------------
  // Este bloque protege el Dashboard de accesos externos.
  // Solo permite acceso si:
  //   ✅ existe un token válido (login normal, Google, Facebook, recovery)
  //   ✅ Y existe el flag authFromApp en localStorage (viene desde la app)
  //
  // En cualquier otro caso, redirige a /login.
  //
  // 📝 Para desactivar temporalmente el bloqueo, comenta este useEffect.
  // -----------------------------------------------------------------
  useEffect(() => {
    if (loading) return; // ⏳ espera AuthContext

    const fromApp = localStorage.getItem("authFromApp") === "true";
    const hasValidSession = Boolean(token && fromApp);

    if (!hasValidSession) {
      console.warn("🚫 Acceso bloqueado: entrada directa o externa detectada");
      navigate("/login");
    }
  }, [loading, token, navigate]);
  // -----------------------------------------------------------------

  const mainCards = [
    {
      title: "Validate",
      desc: "Verifica la autenticidad de tus documentos o datos.",
      href: "https://wapp.udochain.com",
    },
    {
      title: "Sign",
      desc: "Firma documentos electrónicamente y gestiona tus contratos.",
      href: "https://wapp.udochain.com",
    },
    {
      title: "Vote",
      desc: "Participa en decisiones votando con identidad validada.",
      href: "https://wapp.udochain.com",
    },
    {
      title: "Trace",
      desc: "Rastrea y audita la trazabilidad de tus evidencias.",
      href: "https://wapp.udochain.com",
    },
  ];

  const secondaryCards = [
    {
      title: "Verify evidence",
      href: "https://wapp.udochain.com",
    },
    {
      title: "Enroll identity",
      href: "https://wapp.udochain.com",
    },
  ];

  return (
    <>
      {/* 🚫 Evita indexación de buscadores */}
      <meta name="robots" content="noindex, nofollow" />

      <main className="flex-1 container-narrow px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-udo-primary">
          UDoChain Dashboard
        </h1>

        {/* 🔹 Cuadros principales (Validate, Sign, Vote, Trace) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {mainCards.map(({ title, desc, href }) => (
            <a
              key={title}
              href={href}
              className="block p-6 border border-slate-200 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 bg-white"
            >
              <h2 className="text-xl font-semibold mb-2 text-udo-primary">
                {title}
              </h2>
              <p className="text-sm text-udo-steel leading-snug">{desc}</p>
            </a>
          ))}
        </div>

        {/* 🔹 Cuadros secundarios (Verify evidence, Enroll identity) */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {secondaryCards.map(({ title, href }) => (
            <a
              key={title}
              href={href}
              className="flex-1 p-4 text-center border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all bg-white font-medium hover:-translate-y-0.5"
            >
              {title}
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
