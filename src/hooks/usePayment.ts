// [39] src/hooks/usePayment.ts
import useApi from "./useApi";

export default function usePayment() {
  const { req } = useApi();
  const provider = (import.meta.env.VITE_PAYMENT_PROVIDER || "stripe") as "stripe" | "lemonsqueezy";

  const checkout = async () => {
    if (provider === "stripe") {
      const { url } = await req<{ url: string }>("/api/payments/checkout/session", { method: "POST" });
      if (url) window.location.href = url;
    } else {
      const { url } = await req<{ url: string }>("/api/payments/lemonsqueezy/checkout", { method: "POST" });
      if (url) window.location.href = url;
    }
  };

  return { checkout, provider };
}
