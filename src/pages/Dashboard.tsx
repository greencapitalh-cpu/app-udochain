// ✅ src/pages/Dashboard.tsx — versión limpia sin bloqueos, integrada con DashboardLayout y Header
export default function Dashboard() {
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
    { title: "Verify evidence", href: "https://wapp.udochain.com" },
    { title: "Enroll identity", href: "https://wapp.udochain.com" },
  ];

  return (
    <>
      <meta name="robots" content="noindex, nofollow" />

      <main className="flex-1 container-narrow px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-udo-primary">
          UDoChain Dashboard
        </h1>

        {/* 🔹 Cuadros principales */}
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

        {/* 🔹 Cuadros secundarios */}
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
