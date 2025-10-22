// [21] src/components/FileDropzone.tsx
import { useCallback, useState } from "react";

type FileDropzoneProps = {
  onFiles: (files: File[]) => void;
  accept?: string; // opcional; por defecto acepta todos
  multiple?: boolean;
};

export default function FileDropzone({ onFiles, accept, multiple = true }: FileDropzoneProps) {
  const [isOver, setIsOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOver(false);
    const files = Array.from(e.dataTransfer.files || []);
    if (!files.length) return;
    onFiles(files);
  }, [onFiles]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;
    onFiles(files);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      className={`card p-6 border-2 border-dashed ${isOver ? "border-udo-primary bg-udo-sky/40" : "border-slate-200"}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") (document.getElementById("fileInput") as HTMLInputElement)?.click(); }}
    >
      <p className="text-center text-udo-steel">
        Drag & drop files here, or click to select.
      </p>
      <div className="mt-4 flex justify-center">
        <label className="cursor-pointer rounded-lg border px-4 py-2 hover:bg-slate-50">
          Browse files
          <input id="fileInput" type="file" className="hidden" accept={accept} multiple={multiple} onChange={handleInput} />
        </label>
      </div>
    </div>
  );
}
