export default function GeoToggle({ enabled, onChange }:{enabled:boolean; onChange:(v:boolean)=>void}) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <input type="checkbox" checked={enabled} onChange={(e)=>onChange(e.target.checked)} />
      <span className="text-sm text-udo-steel">Attach GPS (recommended)</span>
    </label>
  );
}
