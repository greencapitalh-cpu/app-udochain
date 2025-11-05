// ✅ src/pages/Dashboard.tsx — versión portal visual con botón de acceso manual
import logoBlanco from "../assets/logoblanco.png";
import bgDesktop from "../assets/background-dashboard-desktop.jpg";
import bgMobile from "../assets/background-dashboard-mobile.jpg";

export default function Dashboard() {
  // Determina el fondo según el tamaño de pantalla
  const backgroundImage =
    typeof window !== "undefined" && window.innerWidth > 768
      ? bgDesktop
      : bgMobile;

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Oscurecer fondo */}
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
        <p className="text-lg sm:text-xl italic opacity-90 mb-8">
          You do, we validate
        </p>

        {/* 🔹 Botón / flecha para acceder al dashboard */}
        <a
          href="https://wapp.udochain.com/dashboard"
          className="flex items-center gap-2 bg-udo-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-udo-ink transition-all hover:-translate-y-1"
        >
          Access Dashboard
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
