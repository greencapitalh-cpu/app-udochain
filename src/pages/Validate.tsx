// [27] src/pages/Validate.tsx
import { useState } from "react";
import FileDropzone from "../components/FileDropzone";
import CreditMeter from "../components/CreditMeter";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import useApi from "../hooks/useApi";
import fingerhash from "../assets/fingerhash.png"; // ✅ Fingerprint local en /src/assets/

export default function Validate() {
  const [files, setFiles] = useState<File[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { postForm } = useApi();

  const submit = async () => {
    if (!files.length) return;
    setBusy(true);
    setError(null);
    try {
      // (Parte I) — Validación de archivos y placeholder biométrico
      // Enviar archivos; si el backend soporta consumo, usar consume=true
      const fd = new FormData();
      files.forEach((f) => fd.append("files", f));
      await postForm("/api/upload/any?consume=true", fd);

      // Si más adelante se activa confirmación biométrica real:
      // try { await postJson("/api/biometric/confirm", { ok: true }); } catch {}

      setConfirmed(true);
      setFiles([]);
    } catch (err: any) {
      setError(err?.message || "Validation failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-6">
      {/* Sección principal de archivos */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-3">Validate files</h2>
        <FileDropzone onFiles={(fs) => setFiles(fs)} />
        {files.length > 0 && (
          <div className="mt-4">
            <CreditMeter files={files} />
          </div>
        )}
      </div>

      {/* Sección biométrica */}
      <div className="card p-6 grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Fingerprint verification</h3>
          <p className="text-sm text-udo-steel mb-3">
            Please place your finger on the scanner when ready (placeholder).
          </p>
          <div className="rounded-xl border bg-white p-6 grid place-items-center">
            <img
              src={fingerhash}
              alt="Fingerprint placeholder"
              className="h-32 w-32 object-contain opacity-80"
            />
          </div>
        </div>

        {/* Botón y feedback */}
        <div className="flex flex-col justify-between">
          <div className="text-sm text-udo-steel">
            The biometric confirmation is required before submitting the
            validation. In this stage, fingerprint is a placeholder and will be
            activated when your device is supported.
          </div>

          <div className="mt-4">
            <Button onClick={submit} disabled={files.length === 0 || busy}>
              {busy ? "Submitting…" : "Confirm & Validate"}
            </Button>
            {busy && <Loader />}
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            {confirmed && (
              <p className="text-green-700 text-sm mt-2">
                Validation submitted successfully.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
