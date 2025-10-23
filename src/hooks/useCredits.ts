// [37] src/hooks/useCredits.ts
import { useEffect, useState } from "react";
import useApi from "./useApi";

export default function useCredits() {
  const { req } = useApi();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const data = await req<{ balance: number }>("/api/credits/balance");
        setBalance(data.balance || 0);
      } catch {
        setBalance(0);
      }
    })();
  }, [req]);

  return { balance };
}
