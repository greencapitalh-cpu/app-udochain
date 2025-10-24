// frontend/src/context/AuthContext.tsx
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
  name?: string;
  email?: string;
  credits?: number;
  biometricReady?: boolean; // bandera UI (opcional)
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
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { get } = useApi();

  useEffect(() => {
    (async () => {
      try {
        if (!token) {
          setUser(null);
          return;
        }
        const me = await get<User>("/api/auth/me");
        setUser(me || null);
      } catch {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const login = (t: string, u?: User | null) => {
    localStorage.setItem("token", t);
    setToken(t);
    if (u) setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("token");
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
