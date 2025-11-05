// ✅ src/pages/Dashboard.tsx — versión con fondo dinámico + logo y frase sobre la imagen
import logoBlanco from "../assets/logoblanco.png";
import bgDesktop from "../assets/background-dashboard-desktop.jpg";
import bgMobile from "../assets/background-dashboard-mobile.jpg";

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

  // Determina el fondo según el tamaño de pantalla
  const backgroundImage =
    typeof window !== "undefined" && window.innerWidth > 768
      ? bgDesktop
      : bgMobile;

  return (
    <>
      {/* 🔹 Sección de bienvenida */}
      <section
        className="relative w-full h-[60vh] sm:h-[70vh] bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Oscurecer fondo para contraste */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Contenido centrado */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <img
            src={logoBlanco}
            alt="UDoChain"
            className="h-20 sm:h-24 w-auto mb-3 drop-shadow-xl"
          />
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 drop-shadow-lg">
            UDoChain
          </h1>
          <p className="text-lg sm:text-xl italic opacity-90">
            You do, we validate
          </p>
        </div>
      </section>

      {/* 🔹 Contenido del dashboard */}
      <main className="flex-1 container-narrow px-4 py-10">
        <h2 className="text-2xl font-bold mb-8 text-center text-udo-primary">
          Panel principal
        </h2>

        {/* Cuadros principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {mainCards.map(({ title, desc, href }) => (
            <a
              key={title}
              href={href}
              className="block p-6 border border-slate-200 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 bg-white"
            >
              <h3 className="text-xl font-semibold mb-2 text-udo-primary">
                {title}
              </h3>
              <p className="text-sm text-udo-steel leading-snug">{desc}</p>
            </a>
          ))}
        </div>

        {/* Cuadros secundarios */}
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
