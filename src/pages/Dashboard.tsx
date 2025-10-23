import { useAuth } from "../context/AuthContext";
import Button from "../ui/Button";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-3xl mx-auto card p-6">
      <h1 className="text-2xl font-semibold mb-4">Welcome to your Dashboard</h1>

      {user ? (
        <>
          <p className="text-udo-steel mb-3">
            <strong>Name:</strong> {user.name || "—"}
          </p>
          <p className="text-udo-steel mb-3">
            <strong>Email:</strong> {user.email || "—"}
          </p>
          <p className="text-udo-steel mb-6">
            <strong>Credits:</strong> {user.credits ?? 0}
          </p>

          <Button onClick={logout}>Log out</Button>
        </>
      ) : (
        <p className="text-red-600">No user data loaded.</p>
      )}
    </div>
  );
}
