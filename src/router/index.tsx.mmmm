// ✅ src/router/index.tsx — versión final estable y corregida
import { createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// 🔹 Layouts
import RootLayout from "../shared/RootLayout";
import DashboardLayout from "../shared/DashboardLayout";

// 🔹 Páginas
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Validate from "../pages/Validate";
import SignPage from "../pages/Sign";
import Vote from "../pages/Vote";
import Trace from "../pages/Trace";
import Invitations from "../pages/Invitations";
import Payments from "../pages/Payments";
import Settings from "../pages/Settings";
import Legal from "../pages/Legal";
import VerifyEmail from "../pages/VerifyEmail";
import OAuthSuccess from "../pages/OAuthSuccess";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";

// ===========================================================
// ✅ ProtectedDashboardRoute — versión corregida y segura
// ===========================================================
function ProtectedDashboardRoute({ children }: { children: JSX.Element }) {
  const { token, loading } = useAuth();

  // Mientras AuthContext carga, mostramos una pantalla neutra
  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-udo-steel">
        Checking session…
      </div>
    );
  }

  // 🔍 Diagnóstico y control
  const fromApp = localStorage.getItem("authFromApp") === "true";
  console.log("🔑 token:", token);
  console.log("📦 fromApp:", fromApp);

  // ✅ Corrección:
  // Antes se exigía que fromApp fuera true (token && fromApp),
  // pero los logins OAuth y recuperaciones no la setean aún.
  // Solo verificamos token para habilitar el acceso.
  const hasAccess = Boolean(token);

  if (!hasAccess) {
    console.warn("🚫 Redirigido: sesión no válida o externa");
    return <Navigate to="/login" replace />;
  }

  return children;
}

// ===========================================================
// 🔗 Enrutador principal (RootLayout → AuthProvider incluido)
// ===========================================================
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // El AuthProvider vive aquí
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "validate", element: <Validate /> },
      { path: "sign", element: <SignPage /> },
      { path: "vote", element: <Vote /> },
      { path: "trace", element: <Trace /> },
      { path: "invitations", element: <Invitations /> },
      { path: "payments", element: <Payments /> },
      { path: "settings", element: <Settings /> },
      { path: "legal", element: <Legal /> },
      { path: "verify-email", element: <VerifyEmail /> },
      { path: "oauth-success", element: <OAuthSuccess /> },
      { path: "reset-password/:token", element: <ResetPassword /> },
      { path: "forgot-password", element: <ForgotPassword /> },

      // 🔒 Dashboard protegido dentro del mismo contexto
      {
        path: "dashboard",
        element: (
          <ProtectedDashboardRoute>
            <DashboardLayout />
          </ProtectedDashboardRoute>
        ),
        children: [{ index: true, element: <Dashboard /> }],
      },

      // 🔚 Ruta final
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
