// ✅ AuthContext.tsx — versión estable (registro funcional + 5 reintentos + dashboard protegido)
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import useApi from "../hooks/useApi";

type User = {
  _id?: string;
  username?: string;
  name?: string;
  email?: string;
  credits?: number;
  biometricReady?: boolean;
  idBase?: string | null;
  idVerifiedAt?: string | null;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (t: string, u?: User | null) => void;
  logout: () => void;
  setUser: (u: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { get } = useApi();

  // 🧩 Control inteligente de sesión (no interfiere con /register o /login)
  useEffect(() => {
    const fetchUser = async () => {
      // Evitar validación durante login o registro
      if (
        location.pathname.startsWith("/register") ||
        location.pathname.startsWith("/login")
      ) {
        setLoading(false);
        return;
      }

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const me = await get<User>("/api/auth/me");
        if (me) {
          setUser(me);
          localStorage.removeItem("authRetries");
        } else {
          throw new Error("Invalid session");
        }
      } catch (err) {
        console.warn("⚠️ Sesión inválida o error de conexión:", err);
        const retries = Number(localStorage.getItem("authRetries") || "0");

        if (retries >= 4) {
          console.error("🔒 Token eliminado tras 5 intentos fallidos");
          localStorage.removeItem("token");
          localStorage.removeItem("authFromApp");
          localStorage.removeItem("authRetries");
          setToken(null);
          setUser(null);
        } else {
          localStorage.setItem("authRetries", String(retries + 1));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, location.pathname]); // ⚡ escucha ruta y token

  // ✅ LOGIN — Guarda token y limpia contadores
  const login = (t: string, u?: User | null) => {
    localStorage.setItem("token", t);
    localStorage.setItem("authFromApp", "true");
    localStorage.removeItem("authRetries");
    setToken(t);
    if (u) setUser(u);
  };

  // ✅ LOGOUT — Limpieza completa
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authFromApp");
    localStorage.removeItem("authRetries");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ token, user, loading, login, logout, setUser }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
