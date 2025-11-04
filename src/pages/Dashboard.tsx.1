// [UPDATED] src/pages/Dashboard.tsx
import { useAuth } from "../context/AuthContext";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import useBiometric from "../hooks/useBiometric";
import BiometricModal from "../components/BiometricModal";

export default function Dashboard() {
  const { user, logout, setUser } = useAuth();
  const [openBio, setOpenBio] = useState(false);
  const { start, confirm, complete, refreshMe } = useBiometric();

  const handleBioSuccess = async (payload: { credits?: number; user?: any }) => {
    try {
      // Refrescar /me para traer credits/idBase actualizados (si el backend los marca ahí)
      const fresh = await refreshMe();
      setUser(fresh || payload.user || user);
    } catch {
      // fallback: si vino el balance, al menos actualizamos credits en memoria
      if (payload?.credits != null && user) {
        setUser({ ...user, credits: payload.credits, biometricReady: true });
      } else if (user) {
        setUser({ ...user, biometricReady: true });
      }
    } finally {
      setOpenBio(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto card p-6">
        <p className="text-red-600">No user data loaded.</p>
      </div>
    );
  }

  const credits = user.credits ?? 0;

  return (
    <div className="max-w-3xl mx-auto card p-6">
      <h1 className="text-2xl font-semibold mb-4">Welcome to your Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <div className="rounded-xl border p-4">
          <div className="text-sm text-udo-steel">User</div>
          <div className="font-medium">{user.name || "—"}</div>
          <div className="text-sm text-udo-steel">{user.email || "—"}</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-sm text-udo-steel">Credits</div>
          <div className="text-2xl font-semibold">{credits}</div>
          <div className="text-xs text-udo-steel">
            {credits > 0 ? "Ready to validate" : "Locked — complete biometric ID to unlock"}
          </div>
        </div>
      </div>

      {/* Aviso / CTA de biometría */}
      {credits === 0 && (
        <div className="p-4 rounded-xl bg-udo-sky/60 border border-udo-sky mb-6">
          <p className="text-udo-ink">
            To start validating documents, please complete your biometric identity registration.
          </p>
          <div className="mt-3">
            <Button onClick={() => setOpenBio(true)}>Activate biometric ID</Button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Link to="/validate">
          <Button>Validate</Button>
        </Link>
        <Link to="/sign">
          <Button>Sign</Button>
        </Link>
        <Link to="/vote">
          <Button>Vote</Button>
        </Link>
        <Link to="/trace">
          <Button>Trace</Button>
        </Link>
        <Button onClick={logout}>Log out</Button>
      </div>

      {/* Modal biométrico */}
      <BiometricModal
        open={openBio}
        onClose={() => setOpenBio(false)}
        onSuccess={handleBioSuccess}
        start={start}
        confirm={confirm}
        complete={complete}
      />
    </div>
  );
}
