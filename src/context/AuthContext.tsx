// ✅ src/context/AuthContext.tsx — versión estable y accesible (registro funcional + login persistente)
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
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { get } = useApi();

  // ✅ Verificar sesión activa solo después de tener token
  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const me = await get<User>("/api/auth/me");
        if (me) {
          setUser(me);
          localStorage.setItem("authFromApp", "true");
        }
      } catch (err) {
        console.warn("⚠️ Sesión inválida, limpiando token...");
        localStorage.removeItem("token");
        localStorage.removeItem("authFromApp");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  // ✅ LOGIN — guarda token y bandera
  const login = (t: string, u?: User | null) => {
    localStorage.setItem("token", t);
    localStorage.setItem("authFromApp", "true");
    setToken(t);
    if (u) setUser(u);
  };

  // ✅ LOGOUT — limpieza completa
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authFromApp");
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
