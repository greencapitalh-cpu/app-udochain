// [22] src/components/CreditMeter.tsx
import { useEffect, useMemo, useState } from "react";
import { creditsForSize, formatMB } from "../utils/bytes";
import useCredits from "../hooks/useCredits";

export default function CreditMeter({ files }: { files: File[] }) {
  const [totalBytes, setTotalBytes] = useState(0);
  const { balance } = useCredits();

  useEffect(() => {
    const sum = files.reduce((acc, f) => acc + f.size, 0);
    setTotalBytes(sum);
  }, [files]);

  const needed = useMemo(() => creditsForSize(totalBytes), [totalBytes]);

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-udo-steel">Selected</p>
          <p className="font-semibold">{formatMB(totalBytes)}</p>
        </div>
        <div>
          <p className="text-sm text-udo-steel">Credits needed</p>
          <p className="font-semibold">{needed}</p>
        </div>
        <div>
          <p className="text-sm text-udo-steel">Your credits</p>
          <p className={`font-semibold ${balance < needed ? "text-red-500" : ""}`}>{balance}</p>
        </div>
      </div>
    </div>
  );
}
