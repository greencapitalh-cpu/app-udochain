// [26] src/pages/Dashboard.tsx
import { Link } from "react-router-dom";

const Tile = ({ title, to, desc }: { title: string; to: string; desc: string }) => (
  <Link to={to} className="card p-5 hover:shadow-lg transition-all">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-udo-steel">{desc}</p>
  </Link>
);

export default function Dashboard() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Tile title="Validate" to="/validate" desc="Upload any file and fingerprint" />
      <Tile title="Sign" to="/sign" desc="Request signatures from people" />
      <Tile title="Vote" to="/vote" desc="Create a voting list or import CSV/XLSX" />
      <Tile title="Trace" to="/trace" desc="Check integrity and storage states" />
    </div>
  );
}

