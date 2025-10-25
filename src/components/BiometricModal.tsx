// [NEW] src/components/BiometricModal.tsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import { useAuth } from "../context/AuthContext";
import useApi from "../hooks/useApi";

export default function BiometricModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { user, setUser } = useAuth();
  const { req } = useApi();

  // 🟢 Iniciar cámara al abrir modal
  useEffect(() => {
    if (open) startCamera();
    else stopCamera();
    return () => stopCamera();
  }, [open]);

  // 📸 Activar cámara frontal (fallback trasera)
  const startCamera = async () => {
    try {
      setError(null);
      setCameraReady(false);
      alert("Permite el acceso a la cámara. Se tomará una foto automática para validar tu identidad.");

      let s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      if (!s) {
        s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
      }

      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
      await videoRef.current?.play().catch(() => {});
      setCameraReady(true);

      startCountdown();
    } catch (err) {
      console.error(err);
      setError("No se pudo acceder a la cámara. Verifica permisos.");
    }
  };

  // 🔴 Detener cámara
  const stopCamera = () => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
    setCameraReady(false);
  };

  // ⏱️ Cuenta regresiva 3 → 0
  const startCountdown = () => {
    let seconds = 3;
    setCountdown(seconds);
    const interval = setInterval(() => {
      seconds -= 1;
      setCountdown(seconds);
      if (seconds <= 0) {
        clearInterval(interval);
        handleAutoCapture();
      }
    }, 1000);
  };

  // 📷 Capturar y enviar selfie al backend
  const handleAutoCapture = async () => {
    if (!videoRef.current) return;
    try {
      setCapturing(true);
      const v = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = v.videoWidth || 640;
      canvas.height = v.videoHeight || 480;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((b) => resolve(b as Blob), "image/jpeg", 0.9)
      );

      stopCamera();

      // ⚡ Subir al backend
      const formData = new FormData();
      formData.append("selfie", blob, `selfie-${Date.now()}.jpg`);
      formData.append("userId", user?.id || "");

      const resp = await req("/api/biometric/start", {
        method: "POST",
        body: formData,
      });

      if (resp?.ok && resp?.idBase) {
        setUser({
          ...user,
          idBase: resp.idBase,
          biometricStatus: "verified",
          biometricUpdatedAt: new Date().toISOString(),
          credits: resp.credits || user.credits,
        });
        alert("✅ Identidad biométrica verificada correctamente");
      } else {
        throw new Error(resp?.message || "Error en verificación biométrica");
      }

      onClose();
    } catch (err) {
      console.error("❌ Error en captura:", err);
      setError("Error al capturar o enviar la imagen. Intenta nuevamente.");
      stopCamera();
    } finally {
      setCapturing(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-[90%] max-w-md text-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <h2 className="text-2xl font-semibold mb-2">Verificación biométrica</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Se tomará una foto automáticamente para validar tu identidad.
            </p>

            <div className="relative w-full aspect-[3/4] bg-black rounded-xl overflow-hidden">
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              {countdown !== null && countdown > 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold bg-black/40">
                  {countdown}
                </div>
              )}
              {capturing && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white">
                  Procesando…
                </div>
              )}
            </div>

            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            {cameraReady && !capturing && (
              <p className="text-xs text-green-600 mt-2">Cámara activa — se apagará automáticamente</p>
            )}

            <div className="flex justify-center mt-6">
              <Button onClick={onClose} variant="secondary">
                Cancelar
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
