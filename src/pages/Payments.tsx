// [32] src/pages/Payments.tsx
import Button from "../ui/Button";

export default function Payments() {
  const handleCheckout = async (plan: string) => {
    // TODO: conectar con /api/payments/create-session
    // Ejemplo:
    // const res = await fetch(`/api/payments/create-session?plan=${plan}`, { method: "POST" });
    // const data = await res.json();
    // window.location.href = data.url;
  };

  const plans = [
    {
      name: "Starter",
      credits: "80 credits",
      price: "$10",
      description: "Ideal for individuals who want to start validating documents easily.",
    },
    {
      name: "Growth",
      credits: "400 credits",
      price: "$50",
      description: "Perfect for growing teams or small companies.",
    },
    {
      name: "Scale",
      credits: "1,600 credits",
      price: "$200",
      description: "Designed for organizations with continuous blockchain validation needs.",
    },
    {
      name: "Enterprise",
      credits: "Custom credits",
      price: "Contact us",
      description: "Unlimited access, API integration, and dedicated support.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Purchase Credits</h1>
      <p className="text-center text-gray-500 mb-8">
        1 USD = 8 credits · Pay securely with Google Pay, Apple Pay, or card.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="border rounded-2xl p-6 shadow hover:shadow-lg transition bg-white text-center"
          >
            <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
            <p className="text-gray-700 mb-1">{plan.credits}</p>
            <p className="text-udo-blue font-bold text-xl mb-3">{plan.price}</p>
            <p className="text-sm text-gray-500 mb-4">{plan.description}</p>

            <Button onClick={() => handleCheckout(plan.name)}>
              {plan.name === "Enterprise" ? "Contact sales" : "Buy now"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
