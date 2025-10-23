// [36] src/hooks/useApi.ts
type Json = Record<string, any>;

export default function useApi() {
  const base = (import.meta.env.VITE_API_BASE_URL as string) || "";

  const url = (path: string) =>
    path.startsWith("http") ? path : `${base.replace(/\/$/, "")}${path}`;

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
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "omit",
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
      credentials: "omit",
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
      credentials: "omit",
    });
    return handle<T>(res);
  };

  const postForm = async <T = any>(path: string, form: FormData): Promise<T> => {
    const token = localStorage.getItem("token");
    const res = await fetch(url(path), {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: form,
      credentials: "omit",
    });
    return handle<T>(res);
  };

  return { base, get, postJson, patchJson, postForm };
}
