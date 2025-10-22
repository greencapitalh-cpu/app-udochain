// [29] src/pages/Vote.tsx
import Button from "../ui/Button";
import FileDropzone from "../components/FileDropzone";
import { useState } from "react";

export default function Vote() {
  const [list, setList] = useState<File[]>([]);
  const uploadList = async () => {
    // TODO: POST /api/batch/vote-list con FormData 'list'
  };
  return (
    <div className="space-y-4">
      <div className="card p-6">
        <h3 className="font-semibold mb-2">Create or import a voting list</h3>
        <FileDropzone onFiles={setList} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" multiple={false} />
        <Button className="mt-3" onClick={uploadList} disabled={list.length === 0}>Upload & Invite</Button>
      </div>
    </div>
  );
}
