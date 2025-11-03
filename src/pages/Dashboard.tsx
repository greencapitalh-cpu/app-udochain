// ✅ src/pages/Dashboard.tsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  // 🔒 BLOQUEO INTELIGENTE — ACCESOS LEGÍTIMOS SOLAMENTE
  // -----------------------------------------------------------------
  // Este bloque impide que el Dashboard se abra si el usuario entra
  // escribiendo directamente la URL o desde un buscador o dominio externo.
  // Solo se permite el acceso cuando:
  //   ✅ Viene desde el mismo dominio (login / registro interno)
  //   ✅ Viene desde Google o Facebook (OAuth)
  //   ✅ Tiene token válido en URL (verificación / recuperación)
  //   ✅ Tiene token en localStorage (ya autenticado)
  //   ✅ Se marcó flag interno de autenticación en sessionStorage
  //
  // 🧠 Si querés DESACTIVAR el bloqueo, comentá este useEffect completo.
  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const referrer = document.referrer || "";
    const sameHost = referrer.includes(window.location.host);
    const oauthDomains = ["accounts.google.com", "facebook.com"];
    const fromOAuth = oauthDomains.some((d) => referrer.includes(d));
    const hasTokenParam = window.location.search.includes("token=");
    const cameFromApp = sessionStorage.getItem("authFromApp") === "true";

    const allowed =
      token || sameHost || fromOAuth || hasTokenParam || cameFromApp;

    if (!allowed) {
      console.warn("⛔ Acceso bloqueado a /dashboard (no autorizado)");
      navigate("/login");
    }
  }, [navigate]);
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
