/**
 * 🌐 useAutoTranslate.ts
 * -----------------------------------------------------
 * Detects browser language and automatically translates
 * the app texts if user's language is Spanish ("es").
 * -----------------------------------------------------
 * ✅ Default language: English
 * ✅ Auto-translate for: Spanish
 * ✅ Expandable to FR / PT / IT / DE later
 */

import { useEffect } from "react";

const translations: Record<string, string> = {
  // 🔹 Common UI
  "Email": "Correo electrónico",
  "Password": "Contraseña",
  "Continue": "Continuar",
  "Signing in…": "Ingresando…",
  "Create account": "Crear cuenta",
  "Creating…": "Creando…",
  "Go to Login": "Ir al inicio de sesión",
  "Log in": "Iniciar sesión",
  "Sign up": "Regístrate",
  "Don’t have an account?": "¿No tienes una cuenta?",
  "Already have an account?": "¿Ya tienes una cuenta?",
  "Create your account": "Crea tu cuenta",
  "Username (8 chars, A–Z, a–z, 0–9)": "Nombre de usuario (8 caracteres, A–Z, a–z, 0–9)",
  "Account created successfully.": "Cuenta creada correctamente.",
  "Registration successful. Check your email to confirm your account before signing in.":
    "Registro exitoso. Revisa tu correo para confirmar tu cuenta antes de iniciar sesión.",
  "Login failed": "Error al iniciar sesión",
  "Registration failed": "Error en el registro",
  "Username must have exactly 8 alphanumeric characters (A–Z, a–z, 0–9).":
    "El nombre de usuario debe tener exactamente 8 caracteres alfanuméricos (A–Z, a–z, 0–9).",
  "Password must include at least 8 characters with uppercase, lowercase, number, and symbol.":
    "La contraseña debe tener al menos 8 caracteres e incluir mayúscula, minúscula, número y símbolo.",
};

export default function useAutoTranslate() {
  useEffect(() => {
    const lang = navigator.language.toLowerCase();
    if (!lang.startsWith("es")) return; // Only auto-translate if browser is Spanish

    // Translate visible text nodes
    const walk = (node: Node) => {
      if (node.nodeType === 3) {
        const text = node.nodeValue?.trim();
        if (text && translations[text]) {
          node.nodeValue = translations[text];
        }
      } else {
        node.childNodes.forEach(walk);
      }
    };
    walk(document.body);
  }, []);
}
