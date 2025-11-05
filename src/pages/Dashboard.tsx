import { useAuth } from "../context/AuthContext";
import logoBlanco from "../assets/logoblanco.png";
import bgDesktop from "../assets/background-dashboard-desktop.jpg";
import bgMobile from "../assets/background-dashboard-mobile.jpg";

export default function Dashboard() {
  const { user, token } = useAuth(); // ← obtiene el token actual
  const backgroundImage =
    typeof window !== "undefined" && window.innerWidth > 768
      ? bgDesktop
      : bgMobile;

  const wappUrl = token
    ? `https://wapp.udochain.com?token=${encodeURIComponent(token)}`
    : "https://wapp.udochain.com";

  return (
    <>
      {/* 🔹 Sección de bienvenida */}
      <section
        className="relative w-full h-[60vh] sm:h-[70vh] bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

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

      {/* 🔹 Botón único “Dashboard” */}
      <main className="flex-1 container-narrow px-4 py-16 flex flex-col items-center justify-center">
        <a
          href={wappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full sm:w-1/2 text-center p-6 border border-slate-200 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 bg-white font-semibold text-udo-primary text-xl"
        >
          Dashboard
        </a>
      </main>
    </>
  );
}
