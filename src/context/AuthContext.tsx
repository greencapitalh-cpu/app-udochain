// ✅ src/context/AuthContext.tsx — versión accesible (5 reintentos, login estable)
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
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
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { get } = useApi();

  // 🧩 Validar sesión con hasta 5 intentos antes de forzar logout
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const me = await get<User>("/api/auth/me");
        if (me) {
          setUser(me);
          localStorage.removeItem("authRetries"); // ✅ sesión válida, limpiar contadores
        } else {
          throw new Error("Invalid session");
        }
      } catch (err) {
        console.warn("⚠️ AuthContext: sesión inválida o error de conexión", err);
        const retries = Number(localStorage.getItem("authRetries") || "0");

        if (retries >= 4) {
          // 👋 Después del 5.º intento fallido, limpiar token
          console.error("🔒 Token removido tras 5 intentos fallidos");
          localStorage.removeItem("token");
          localStorage.removeItem("authFromApp");
          localStorage.removeItem("authRetries");
          setToken(null);
          setUser(null);
        } else {
          // ⏳ Aumentar el contador y mantener sesión viva por ahora
          localStorage.setItem("authRetries", String(retries + 1));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  // ✅ LOGIN — Guarda token y bandera de acceso
  const login = (t: string, u?: User | null) => {
    localStorage.setItem("token", t);
    localStorage.setItem("authFromApp", "true");
    localStorage.removeItem("authRetries"); // Reiniciar contador en login correcto
    setToken(t);
    if (u) setUser(u);
  };

  // ✅ LOGOUT — Limpieza completa manual
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
