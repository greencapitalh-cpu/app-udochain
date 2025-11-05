// ✅ src/pages/Dashboard.tsx — antesala con fondo dinámico + redirección automática
import { useEffect } from "react";
import logoBlanco from "../assets/logoblanco.png";
import bgDesktop from "../assets/background-dashboard-desktop.jpg";
import bgMobile from "../assets/background-dashboard-mobile.jpg";

export default function Dashboard() {
  // 🔁 Redirección automática después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://wapp.udochain.com/dashboard";
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Determina el fondo según el tamaño de pantalla
  const backgroundImage =
    typeof window !== "undefined" && window.innerWidth > 768
      ? bgDesktop
      : bgMobile;

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      onClick={() => (window.location.href = "https://wapp.udochain.com/dashboard")}
    >
      {/* Oscurecer fondo para contraste */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <img
          src={logoBlanco}
          alt="UDoChain"
          className="h-20 sm:h-28 w-auto mb-3 drop-shadow-xl"
        />
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 drop-shadow-lg">
          UDoChain
        </h1>
        <p className="text-lg sm:text-xl italic opacity-90">
          You do, we validate
        </p>
      </div>
    </section>
  );
}
