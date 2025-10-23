import Button from "../ui/Button";

export default function ResultPanel({ data }:{ data:any }) {
  const w1 = data?.w1Hash || data?.files?.[0]?.w1Hash;
  const pdf = data?.pdfUrl;
  return (
    <div className="card p-6 mt-6">
      <h3 className="font-semibold text-lg mb-2">Validation completed</h3>
      <div className="text-sm text-udo-steel">
        {w1 ? <>Public hash (W1): <span className="font-mono">{w1}</span></> : "No public hash available"}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button onClick={()=>pdf && (window.location.href = pdf)} disabled={!pdf}>Download certificate (PDF)</Button>
        <button className="px-4 py-2 rounded-lg border hover:bg-slate-50" onClick={()=>alert("Coming soon: Public QR")}>Public QR</button>
        <button className="px-4 py-2 rounded-lg border hover:bg-slate-50" onClick={()=>alert("Coming soon: Private QR")}>Private QR</button>
      </div>
    </div>
  );
}
