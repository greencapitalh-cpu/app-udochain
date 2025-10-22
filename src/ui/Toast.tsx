// [17] src/ui/Toast.tsx
import { useEffect, useState } from "react";

export default function Toast({ text }: { text: string }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg shadow-lg">
      {text}
    </div>
  );
}
