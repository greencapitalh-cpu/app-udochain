import Button from "../ui/Button";

export default function Dashboard() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-16">
      <h1 className="text-3xl font-bold mb-4 text-udo-primary">Welcome to UDoChain Dashboard</h1>
      <p className="text-gray-600 mb-8 max-w-lg">
        Manage your blockchain operations and access all UDoChain services from one place.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["Validate", "Sign", "Vote", "Trace"].map((label) => (
          <a
            key={label}
            href="https://wapp.udochain.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-32">{label}</Button>
          </a>
        ))}
      </div>
    </section>
  );
}
