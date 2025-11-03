import { createBrowserRouter, Navigate } from "react-router-dom";

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

// 🔒 BLOQUEO LINK (NIVEL ROUTER)
// -------------------------------------------------------------------
// Este componente evita que el router renderice Dashboard si el usuario
// llega directo por URL o sin pasar por una página interna.
function ProtectedDashboardRoute({ children }: { children: JSX.Element }) {
  const referrer = document.referrer || "";
  const sameHost = referrer.includes(window.location.host);

  if (!sameHost) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
// -------------------------------------------------------------------

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

  // 🔒 Sección privada (solo accesible desde navegación interna)
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
