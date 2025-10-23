import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../hooks/useApi";

export default function Verify() {
  const { code } = useParams();
  const { req } = useApi();
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (!code) return;
        const isW1 = code.startsWith("w1:");
        const path = isW1 ? `/api/verify/w1/${encodeURIComponent(code.slice(3))}` : `/api/verify/w2/${encodeURIComponent(code)}`;
        const res = await req(path);
        setData(res);
      } catch (e:any) {
        setErr(e.message || "Verification error");
      }
    })();
  }, [code, req]);

  if (err) return <div className="container-narrow my-10">Error: {err}</div>;
  if (!data) return <div className="container-narrow my-10">Verifying…</div>;
  return (
    <div className="container-narrow my-10">
      <h1 className="text-2xl font-semibold mb-2">UDoChain™ Verifier</h1>
      <pre className="bg-slate-50 p-4 rounded-lg overflow-auto text-sm">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
