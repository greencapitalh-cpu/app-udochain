// [36] src/hooks/useApi.ts
export default function useApi() {
  const base = import.meta.env.VITE_API_BASE_URL as string;
  const req = async <T>(path: string, opts?: RequestInit): Promise<T> => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      ...(opts?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
    const res = await fetch(`${base}${path}`, { ...opts, headers });
    if (!res.ok) throw new Error(await res.text());
    return res.json() as Promise<T>;
  };
  return { req, base };
}
