// [28] src/pages/Sign.tsx
import { useState } from "react";
import FileDropzone from "../components/FileDropzone";
import Button from "../ui/Button";

export default function SignPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [email, setEmail] = useState("");

  const createInvitation = async () => {
    // TODO: enviar invitación /api/invite/create o /api/batch/sign-list (CSV)
  };

  return (
    <div className="space-y-4">
      <div className="card p-6">
        <h3 className="font-semibold mb-2">Upload a document</h3>
        <FileDropzone onFiles={setFiles} multiple={false} />
      </div>
      <div className="card p-6">
        <h3 className="font-semibold mb-2">Invite signer</h3>
        <input className="w-full rounded-lg border px-3 py-2" placeholder="Signer email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <Button className="mt-3" onClick={createInvitation} disabled={!email}>Create Invitation</Button>
      </div>
    </div>
  );
}
