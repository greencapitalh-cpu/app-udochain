//src/pages/Validate.tsx
import { useEffect, useMemo, useState, useRef } from "react";
import FileDropzone from "../components/FileDropzone";
import CreditMeter from "../components/CreditMeter";
import Button from "../ui/Button";
import useUpload from "../hooks/useUpload";
import useApi from "../hooks/useApi";

export default function Validate() {
  const [tab, setTab] = useState<"upload" | "live">("upload");
  const [files, setFiles] = useState<File[]>([]);
  const [gpsOn, setGpsOn] = useState(false);
  const [gps, setGps] = useState<{ lat: number; lng: number; accuracy?: number } | null>(null);
  const [bioPrompt, setBioPrompt] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { uploadAny } = useUpload();
  const { req } = useApi();

  // Live capture
  const videoRef = useRef<HTMLVideoElement>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [liveReady, setLiveReady] = useState(false);

  useEffect(() => {
    if (!gpsOn) return setGps(null);
    navigator.geolocation?.getCurrentPosition(
      (pos) =>
        setGps({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        }),
      () => setGps(null),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, [gpsOn]);

  // --- Live camera setup ---
  useEffect(() => {
    if (tab !== "live") return;
    (async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = s;
        setLiveReady(true);
      } catch {
        setLiveReady(false);
      }
    })();
    return () => {
      const s = videoRef.current?.srcObject as MediaStream | undefined;
      s?.getTracks().forEach((t) => t.stop());
    };
  }, [tab]);

  const takePhoto = async () => {
    const v = videoRef.current!;
    const canvas = document.createElement("canvas");
    canvas.width = v.videoWidth || 1280;
    canvas.height = v.videoHeight || 720;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(v, 0, 0);
    const blob = await new Promise<Blob>((r) => canvas.toBlob((b) => r(b!), "image/jpeg", 0.9));
    const file = new File([blob], `photo-${Date.now()}.jpg`, { type: "image/jpeg" });
    setPhotos((p) => [...p, file]);
  };

  // --- Common flow ---
  const canValidate = useMemo(
    () => (tab === "upload" ? files.length > 0 : photos.length > 0),
    [tab, files, photos]
  );

  const handleValidate = () => setBioPrompt(true);

  const confirmBio = async () => {
    setBioPrompt(false);
    setLoading(true);
    try {
      if (tab === "upload") {
        const fd = new FormData();
        files.forEach((f) => fd.append("files", f));
        fd.append("meta", JSON.stringify({ gps }));
        const res = await uploadAny(fd, true, gpsOn);
        setResult({ mode: "upload", ...res });
      } else {
        const fd = new FormData();
        photos.forEach((f) => fd.append("media", f));
        if (gpsOn && gps) fd.append("gps", JSON.stringify(gps));
        const res = await req("/api/validate/live", { method: "POST", body: fd as any } as any);
        setResult({ mode: "live", ...res });
      }
    } catch (err: any) {
      alert(err.message || "Validation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-narrow my-8">
      <div className="card p-6">
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setTab("upload")}
            className={`px-4 py-2 rounded-lg ${
              tab === "upload" ? "bg-udo-sky text-udo-primary" : "hover:bg-slate-100"
            }`}
          >
            Upload
          </button>
          <button
            onClick={() => setTab("live")}
            className={`px-4 py-2 rounded-lg ${
              tab === "live" ? "bg-udo-sky text-udo-primary" : "hover:bg-slate-100"
            }`}
          >
            Live capture
          </button>
        </div>

        {tab === "upload" ? (
          <>
            <FileDropzone onFiles={setFiles} />
            {files.length > 0 && (
              <>
                <div className="mt-4">
                  <CreditMeter files={files} />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={gpsOn}
                      onChange={(e) => setGpsOn(e.target.checked)}
                    />
                    <span className="text-sm text-udo-steel">Attach GPS</span>
                  </label>
                  <Button onClick={handleValidate} disabled={!canValidate || loading}>
                    {loading ? "Validating…" : "Confirm & Validate"}
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="rounded-xl overflow-hidden bg-black aspect-video">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-udo-steel">
                {liveReady ? "Camera active" : "Camera not available"}
              </div>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={gpsOn}
                  onChange={(e) => setGpsOn(e.target.checked)}
                />
                <span className="text-sm text-udo-steel">Attach GPS</span>
              </label>
            </div>
            <div className="mt-4 flex gap-3">
              <Button onClick={takePhoto}>Take photo</Button>
              <Button onClick={handleValidate} disabled={!canValidate || loading}>
                {loading ? "Validating…" : "Confirm & Validate"}
              </Button>
            </div>
            {photos.length > 0 && (
              <p className="text-sm text-udo-steel mt-3">{photos.length} photo(s) captured</p>
            )}
          </>
        )}
      </div>

      {bioPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="card p-6 max-w-sm text-center">
            <h3 className="font-semibold mb-2">Fingerprint verification</h3>
            <p className="text-sm text-udo-steel mb-3">Place your finger on the scanner.</p>
            <img
              src="/src/assets/fingerhash.png"
              alt="fingerprint"
              className="w-24 h-24 mx-auto mb-4"
            />
            <div className="flex justify-center gap-3">
              <Button onClick={confirmBio}>Verify</Button>
              <button
                className="px-4 py-2 rounded-lg hover:bg-slate-100"
                onClick={() => setBioPrompt(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="card mt-8 p-6">
          <h3 className="font-semibold text-lg mb-3">Validation completed</h3>
          <p className="text-sm text-udo-steel mb-2">
            Public hash (W1):{" "}
            <span className="font-mono break-all">{result?.w1Hash || result?.hash || "—"}</span>
          </p>
          <div className="flex flex-wrap gap-3 mt-3">
            <Button
              onClick={() => alert("Download PDF (backend will serve certificate)")}
            >
              Download certificate (PDF)
            </Button>
            <Button
              className="bg-white text-udo-primary border border-udo-primary hover:bg-udo-sky"
              onClick={() => alert("Public QR")}
            >
              Public QR
            </Button>
            <Button
              className="bg-white text-udo-primary border border-udo-primary hover:bg-udo-sky"
              onClick={() => alert("Private QR")}
            >
              Private QR
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
