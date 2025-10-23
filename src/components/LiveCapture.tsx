import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";

export default function LiveCapture({
  onReady,
  gpsEnabled,
  onToggleGps,
}:{ onReady:(payload:{media:File[]; note?:string})=>void; gpsEnabled:boolean; onToggleGps:(v:boolean)=>void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streamOk, setStreamOk] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) videoRef.current.srcObject = s;
        setStreamOk(true);
      } catch {
        setStreamOk(false);
      }
    })();
    return () => {
      const s = videoRef.current?.srcObject as MediaStream | undefined;
      s?.getTracks().forEach(t => t.stop());
    };
  }, []);

  const takePhoto = async () => {
    const v = videoRef.current!;
    const canvas = document.createElement("canvas");
    canvas.width = v.videoWidth || 1280;
    canvas.height = v.videoHeight || 720;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(v, 0, 0);
    const blob = await new Promise<Blob>((res) => canvas.toBlob((b)=>res(b!), "image/jpeg", 0.9));
    const file = new File([blob], `photo-${Date.now()}.jpg`, { type: "image/jpeg" });
    setPhotos((prev) => [...prev, file]);
  };

  const submit = () => {
    if (photos.length === 0) { alert("Capture at least one photo"); return; }
    onReady({ media: photos, note });
  };

  return (
    <div>
      <div className="rounded-xl overflow-hidden bg-black aspect-video">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="text-sm text-udo-steel">{streamOk ? "Camera ready" : "Camera not available"}</div>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={gpsEnabled} onChange={(e)=>onToggleGps(e.target.checked)} />
          <span className="text-sm text-udo-steel">Attach GPS</span>
        </label>
      </div>
      <div className="mt-3 flex gap-2">
        <Button onClick={takePhoto}>Take photo</Button>
        <Button onClick={submit}>Confirm & Validate</Button>
      </div>
      {photos.length > 0 && <div className="mt-3 text-sm text-udo-steel">{photos.length} photo(s) captured</div>}
      <textarea className="mt-3 w-full rounded-lg border px-3 py-2" placeholder="Add note (optional)" value={note} onChange={(e)=>setNote(e.target.value)} />
    </div>
  );
}
