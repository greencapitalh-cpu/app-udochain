// [30] src/pages/Trace.tsx
import { useState } from "react";
import FileDropzone from "../components/FileDropzone";
import Button from "../ui/Button";

export default function Trace() {
  const [files, setFiles] = useState<File[]>([]);
  const check = async () => {
    // TODO: subir/consultar hash
  };
  return (
    <div className="space-y-4">
      <FileDropzone onFiles={setFiles} />
      <Button onClick={check} disabled={files.length === 0}>Check Integrity</Button>
    </div>
  );
}
