import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white text-udo-ink dark:bg-slate-950 dark:text-slate-100 transition-colors">
      {/* 🔹 Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-40 shadow-sm transition-colors">
        <div className="container-narrow flex items-center justify-between py-4">
          {/* Logo + Nombre */}
          <h1 className="text-2xl font-bold text-udo-primary dark:text-udo-sky flex items-center gap-2">
            <img
              src="/assets/logo-udochain.png"
              alt="UDoChain Logo"
              className="h-8 w-auto"
            />
            UDoChain
          </h1>

          {/* Tabs */}
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link
              to="/dashboard"
              className="border-b-2 border-udo-primary pb-1 text-udo-ink dark:text-white"
            >
              Dashboard
            </Link>
            <Link
              to="#"
              className="text-udo-steel dark:text-slate-400 hover:text-udo-primary dark:hover:text-udo-sky"
            >
              Evidences
            </Link>
            <Link
              to="#"
              className="text-udo-steel dark:text-slate-400 hover:text-udo-primary dark:hover:text-udo-sky"
            >
              Identity
            </Link>
            <Link
              to="#"
              className="text-udo-steel dark:text-slate-400 hover:text-udo-primary dark:hover:text-udo-sky"
            >
              Plans
            </Link>
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-4">
            <Link
              to="https://app.udochain.com"
              className="text-udo-primary dark:text-udo-sky hover:underline text-sm"
            >
              Inicio
            </Link>
            <button className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm transition-colors">
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* 🔹 Contenido principal */}
      <main className="container-narrow py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card
            title="Validate"
            text="Verifica la autenticidad de tus documentos o datos."
            link="https://wapp.udochain.com"
          />
          <Card
            title="Sign"
            text="Firma documentos electrónicamente y gestiona tus contratos."
            link="https://wapp.udochain.com"
          />
          <Card
            title="Vote"
            text="Participa en decisiones votando con identidad validada."
            link="https://wapp.udochain.com"
          />
          <Card
            title="Trace"
            text="Rastrea el origen y la cadena de custodia de activos digitales."
            link="https://wapp.udochain.com"
          />
        </div>

        {/* Dos inferiores */}
        <div className="mt-10 grid gap-4">
          <CardHorizontal
            title="Verify evidence"
            text="Consulta y valida una evidencia ya registrada en blockchain."
            link="https://wapp.udochain.com"
          />
          <CardHorizontal
            title="Enroll identity"
            text="Registra tu identidad biométrica para futuras validaciones."
            link="https://wapp.udochain.com"
          />
        </div>
      </main>
    </div>
  );
}

/* 🔹 Tarjetas principales */
function Card({
  title,
  text,
  link,
}: {
  title: string;
  text: string;
  link: string;
}) {
  return (
    <Link
      to={link}
      className="block p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 
                 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
    >
      <h3 className="text-lg font-semibold mb-2 text-udo-ink dark:text-white">
        {title}
      </h3>
      <p className="text-sm text-udo-steel dark:text-slate-400">{text}</p>
    </Link>
  );
}

/* 🔹 Tarjetas horizontales inferiores */
function CardHorizontal({
  title,
  text,
  link,
}: {
  title: string;
  text: string;
  link: string;
}) {
  return (
    <Link
      to={link}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center 
                 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 
                 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <div>
        <h3 className="font-semibold text-udo-ink dark:text-white">{title}</h3>
        <p className="text-sm text-udo-steel dark:text-slate-400">{text}</p>
      </div>
      <Button className="mt-3 sm:mt-0 dark:bg-udo-sky dark:hover:bg-udo-primary">
        Go
      </Button>
    </Link>
  );
}
