// [32] src/pages/Payments.tsx
import Button from "../ui/Button";

export default function Payments() {
  const checkout = async () => {
    // TODO: POST /api/payments/checkout/session y redirigir a 'url'
  };
  return (
    <div className="card p-6">
      <h3 className="font-semibold mb-2">Buy credits</h3>
      <p className="text-sm text-udo-steel">1 credit = 1 hash (W1) + 10 MB (W2)</p>
      <Button className="mt-3" onClick={checkout}>Go to Checkout</Button>
    </div>
  );
}
