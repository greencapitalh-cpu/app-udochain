// [NEW] src/components/BiometricModal.tsx
import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import Finger from "../assets/fingerhash.png";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: (payload: { credits?: number; user?: any }) => void;
  start: (selfie: Blob, gps?: { lat: number; lng: number; accuracy?: number }) => Promise<any>;
  confirm: (sessionId: string) => Promise<any>;
  complete: (sessionId: string) => Promise<any>;
};

export default function BiometricModal({ open, onClose, onSuccess, start, confirm, complete }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [busy, setBusy] = useState(false);
  const [phase, setPhase] = useState<"idle" | "capturing" | "verifying" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [gpsOn, setGpsOn] = useState(true);
  const [gps, setGps] = useState<{ lat: number; lng: number; accuracy?: number } | null>(null);

  useEffect(() => {
    if (!open) return;
    (async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (e: any) {
        setError("Camera not available");
      }
    })();
    return () => {
      setPhase("idle");
      setError(null);
      setBusy(false);
      const s = stream;
      s?.getTracks().forEach((t) => t.stop());
      setStream(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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

  const captureSelfieBlob = async () => {
    const v = videoRef.current;
    if (!v) throw new Error("Camera not ready");
    const canvas = document.createElement("canvas");
    canvas.width = v.videoWidth || 1280;
    canvas.height = v.videoHeight || 720;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(v, 0, 0);
    const blob = await new Promise<Blob>((resolve) =>
      canvas.toBlob((b) => resolve(b as Blob), "image/jpeg", 0.92)
    );
    return blob;
  };

  const runFlow = async () => {
    setBusy(true);
    setError(null);
    setPhase("capturing");
    try {
      // 1) Capturar selfie
      const selfie = await captureSelfieBlob();

      // 2) /start
      const started = await start(selfie, gps || undefined);
      if (!started?.ok || !started?.sessionId) {
        throw new Error(started?.message || "Unable to start biometric session");
      }

      // 3) /confirm (si tu backend no lo requiere, devolverá ok=true)
      setPhase("verifying");
      const conf = await confirm(started.sessionId);
      if (!conf?.ok) {
        throw new Error(conf?.message || "Biometric confirmation failed");
      }

      // 4) /complete → libera créditos
      const done = await complete(started.sessionId);
      if (!done?.ok) {
        throw new Error(done?.message || "Biometric completion failed");
      }

      setPhase("success");
      onSuccess({ credits: done?.balance ?? done?.creditsUnlocked, user: done?.user });
      // Nota: el cierre real lo maneja el padre tras actualizar el AuthContext
    } catch (e: any) {
      setPhase("error");
      setError(e?.message || "Biometric flow failed");
    } finally {
      setBusy(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="card w-full max-w-xl p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Activate Biometric Identity</h3>
            <p className="text-sm text-udo-steel">
              Take a selfie to register your identity. This unlocks your initial credits.
            </p>
          </div>
          <button className="px-3 py-1 rounded-lg hover:bg-slate-100" onClick={onClose} disabled={busy}>
            Close
          </button>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="rounded-xl overflow-hidden bg-black aspect-video">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <input type="checkbox" checked={gpsOn} onChange={(e) => setGpsOn(e.target.checked)} />
              <span className="text-sm text-udo-steel">Attach GPS to this registration</span>
            </div>
            <div className="rounded-xl border p-3 flex items-center gap-3">
              <img src={Finger} alt="finger" className="w-12 h-12" />
              <div>
                <div className="font-medium">Fingerprint/FACE visual check</div>
                <div className="text-xs text-udo-steel">
                  Visual fingerprint placeholder – your backend confirms the match.
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Button onClick={runFlow} disabled={busy} className="w-full">
                {busy
                  ? phase === "capturing"
                    ? "Capturing selfie…"
                    : phase === "verifying"
                    ? "Verifying identity…"
                    : "Processing…"
                  : "Start verification"}
              </Button>
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              {phase === "success" && (
                <p className="text-green-600 text-sm mt-2">Biometric verification completed ✅</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
