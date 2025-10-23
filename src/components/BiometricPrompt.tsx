import Button from "../ui/Button";

export default function BiometricPrompt({
  img, onConfirm, onCancel
}:{img:string; onConfirm:()=>void; onCancel:()=>void}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="card p-6 max-w-md w-full text-center">
        <h3 className="text-lg font-semibold mb-2">Fingerprint verification</h3>
        <p className="text-sm text-udo-steel mb-4">Place your finger on the scanner.</p>
        <img src={img} alt="fingerprint placeholder" className="mx-auto w-28 h-28 object-contain mb-4" />
        <div className="flex justify-center gap-3">
          <Button onClick={onConfirm}>Verify</Button>
          <button className="px-4 py-2 rounded-lg hover:bg-slate-100" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
