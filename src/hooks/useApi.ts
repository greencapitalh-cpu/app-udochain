// [36] src/hooks/useApi.ts — versión segura y universal
type Json = Record<string, any>;

export default function useApi() {
  const base =
    (import.meta.env.VITE_API_URL as string) ||
    "https://api.udochain.com";

  // 🧩 Siempre asegura un solo slash entre base y path
  const url = (path: string) => {
    if (path.startsWith("http")) return path;
    const cleanBase = base.replace(/\/+$/, ""); // quita barras al final
    const cleanPath = path.replace(/^\/+/, ""); // quita barras al inicio
    return `${cleanBase}/${cleanPath}`;         // une con una sola barra
  };

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
