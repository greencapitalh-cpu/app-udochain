// ✅ src/context/AuthContext.tsx — versión final estable y persistente
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

  // 🧩 Carga de sesión persistente
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const me = await get<User>("/api/auth/me");
        if (me) setUser(me);
        else throw new Error("Invalid session");
      } catch (err) {
        console.warn("⚠️ AuthContext: sesión inválida o expirada", err);
        // ❗ No limpiar token inmediatamente: esperar 1 retry antes de forzar logout
        const retries = Number(localStorage.getItem("authRetries") || "0");
        if (retries >= 1) {
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
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  // ✅ LOGIN — Guarda token y bandera de acceso
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
