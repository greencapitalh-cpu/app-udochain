// [34] src/pages/Legal.tsx
import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";

export default function Legal() {
  const { req } = useApi();
  const [tos, setTos] = useState<string>("");
  const [privacy, setPrivacy] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const t = await req<{ html: string }>("/api/legal/tos");
        const p = await req<{ html: string }>("/api/legal/privacy");
        setTos(t.html); setPrivacy(p.html);
      } catch {
        setTos("<p>Terms of Service not available.</p>");
        setPrivacy("<p>Privacy Policy not available.</p>");
      }
    })();
  }, [req]);

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="font-semibold mb-2">Terms of Service</h3>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: tos }} />
      </div>
      <div className="card p-6">
        <h3 className="font-semibold mb-2">Privacy Policy</h3>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: privacy }} />
      </div>
    </div>
  );
}
