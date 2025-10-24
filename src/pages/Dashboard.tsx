// frontend/src/pages/Dashboard.tsx
import { useAuth } from "../context/AuthContext";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-3xl mx-auto card p-6">
      <h1 className="text-2xl font-semibold mb-4">Welcome to your Dashboard</h1>

      {user ? (
        <>
          <p className="text-udo-steel mb-1"><strong>Name:</strong> {user.name || "—"}</p>
          <p className="text-udo-steel mb-1"><strong>Email:</strong> {user.email || "—"}</p>
          <p className="text-udo-steel mb-4"><strong>Credits:</strong> {user.credits ?? 0}</p>

          {/* Aviso: sin idBase (biometría) ⇒ no puede validar / usar créditos */}
          {(!("biometricReady" in user) && (user.credits ?? 0) === 0) && (
            <div className="p-4 rounded-lg bg-udo-sky/60 border border-udo-sky mb-4">
              <p className="text-udo-ink">
                To start validating documents, please complete your biometric identity registration.
              </p>
              <Link to="/validate" className="inline-block mt-3">
                <Button>Go to Validate</Button>
              </Link>
            </div>
          )}

          <div className="flex gap-3">
            <Link to="/validate"><Button>Validate</Button></Link>
            <Link to="/sign"><Button>Sign</Button></Link>
            <Link to="/vote"><Button>Vote</Button></Link>
            <Link to="/trace"><Button>Trace</Button></Link>
            <Button onClick={logout}>Log out</Button>
          </div>
        </>
      ) : (
        <p className="text-red-600">No user data loaded.</p>
      )}
    </div>
  );
}
