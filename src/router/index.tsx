// src/router/index.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// 🔹 Layouts
import RootLayout from "../shared/RootLayout";
import DashboardLayout from "../shared/DashboardLayout";

// 🔹 Páginas generales
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
// ✅ ProtectedDashboardRoute — versión segura y estable
// ===========================================================
// Esta versión no depende de document.referrer, sino del contexto real
// y de la bandera "authFromApp" almacenada en localStorage.
// Si el usuario tiene token válido y proviene del flujo interno
// (login, OAuth, verify o recovery), accede al Dashboard.
// ===========================================================
function ProtectedDashboardRoute({ children }: { children: JSX.Element }) {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-udo-steel">
        Checking session…
      </div>
    );
  }

  const fromApp = localStorage.getItem("authFromApp") === "true";
  const hasAccess = Boolean(token && fromApp);

  if (!hasAccess) {
    console.warn("🚫 Redirigido: sesión no válida o externa");
    return <Navigate to="/login" replace />;
  }

  return children;
}

// ===========================================================
// 🔗 Definición principal del enrutador
// ===========================================================
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
      { path: "*", element: <NotFound /> },
    ],
  },

  // 🔐 Sección privada protegida por contexto y flag
  {
    path: "/dashboard",
    element: (
      <ProtectedDashboardRoute>
        <DashboardLayout />
      </ProtectedDashboardRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
    ],
  },
]);

export default router;
