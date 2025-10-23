// [27] src/pages/Validate.tsx
import { useState } from "react";
import FileDropzone from "../components/FileDropzone";
import CreditMeter from "../components/CreditMeter";
import Button from "../ui/Button";

export default function Validate() {
  const [files, setFiles] = useState<File[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  const submit = async () => {
    // TODO: conectar a POST /api/upload/any?consume=true con FormData
    setConfirmed(true);
  };

  return (
    <div className="space-y-4">
      <FileDropzone onFiles={(fs) => setFiles(fs)} />
      {files.length > 0 && <CreditMeter files={files} />}
      <div className="card p-6">
        <h3 className="font-semibold mb-2">Fingerprint verification</h3>
        <p className="text-sm text-udo-steel mb-3">
          Please place your finger on the scanner when ready (placeholder).
        </p>
        <img src="/src/assets/fingerhash.png" alt="Fingerprint placeholder" className="h-24 mx-auto mb-4" />
        <Button onClick={submit} disabled={files.length === 0}>Confirm & Validate</Button>
        {confirmed && <p className="text-sm text-green-600 mt-2">Validation submitted.</p>}
      </div>
    </div>
  );
}
