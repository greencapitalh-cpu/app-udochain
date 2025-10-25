// [NEW] src/hooks/useBiometric.ts
import useApi from "../hooks/useApi";

export type BiometricStartResponse = {
  ok: boolean;
  sessionId?: string;
  biometricIdHash?: string;
  message?: string;
};

export type BiometricConfirmResponse = {
  ok: boolean;
  message?: string;
};

export type BiometricCompleteResponse = {
  ok: boolean;
  creditsUnlocked?: number;
  balance?: number;
  user?: any;
  message?: string;
};

export default function useBiometric() {
  const { postJson, postForm, get } = useApi();

  // Inicia el flujo con una selfie (obligatorio) y GPS opcional
  const start = async (selfieBlob: Blob, gps?: { lat: number; lng: number; accuracy?: number }) => {
    const fd = new FormData();
    fd.append("selfie", selfieBlob, `selfie-${Date.now()}.jpg`);
    if (gps) fd.append("gps", JSON.stringify(gps));
    // Backend esperado: POST /api/biometric/start
    return postForm<BiometricStartResponse>("/api/biometric/start", fd);
  };

  // Confirma (ej. segundo factor/huella visual). Si tu backend no lo requiere, retornará ok=true.
  const confirm = async (sessionId: string) => {
    // Backend esperado: POST /api/biometric/confirm
    return postJson<BiometricConfirmResponse>("/api/biometric/confirm", { sessionId });
  };

  // Completa el registro y libera créditos
  const complete = async (sessionId: string) => {
    // Backend esperado: POST /api/biometric/complete
    return postJson<BiometricCompleteResponse>("/api/biometric/complete", { sessionId });
  };

  // (Opcional) refrescar /me para rehidratar el usuario con credits y flags
  const refreshMe = async () => {
    return get<any>("/api/auth/me");
  };

  return { start, confirm, complete, refreshMe };
}
