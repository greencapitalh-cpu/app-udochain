// app-udochain/src/context/AuthContext.tsx
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
  username?: string;   // ✅ nuevo
  name?: string;       // se llenará en biometría base
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
  }, [token]); // eslint-disable-line

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
########## HOOKS ##########

======================
26.	FILE: src/hooks/useApi.ts
======================
// [36] src/hooks/useApi.ts
type Json = Record<string, any>;

export default function useApi() {
  // 🔧 Ajuste PMDSU — base URL sin /api
  const base =
    (import.meta.env.VITE_API_URL as string) ||
    "https://api.udochain.com";

  const url = (path: string) =>
    path.startsWith("http")
      ? path
      : `${base.replace(/\/$/, "")}${path.startsWith("/") ? "" : "/"}${path}`;

  const handle = async <T = any>(res: Response): Promise<T> => {
    const text = await res.text();
    let data: any;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { message: text || "Unexpected response" };
    }
    if (!res.ok) {
      const msg = data?.message || res.statusText || "Request failed";
      throw new Error(msg);
    }
    return data as T;
  };

  const get = async <T = any>(path: string): Promise<T> => {
    const token = localStorage.getItem("token");
    const res = await fetch(url(path), {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return handle<T>(res);
  };

  const postJson = async <T = any>(path: string, body?: Json): Promise<T> => {
    const token = localStorage.getItem("token");
    const res = await fetch(url(path), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    return handle<T>(res);
  };

  const patchJson = async <T = any>(path: string, body?: Json): Promise<T> => {
    const token = localStorage.getItem("token");
    const res = await fetch(url(path), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    return handle<T>(res);
  };

  const postForm = async <T = any>(path: string, form: FormData): Promise<T> => {
    const token = localStorage.getItem("token");
    const res = await fetch(url(path), {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    });
    return handle<T>(res);
  };

  return { base, get, postJson, patchJson, postForm };
}
