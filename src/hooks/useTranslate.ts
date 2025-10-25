import { useState, useEffect } from "react";

/**
 * 🌐 Simple bilingual helper for English ↔ Spanish
 * - Auto-detects browser language
 * - Provides translator function t(en, es)
 * - Includes language toggle (🇺🇸 / 🇪🇸)
 */
export default function useTranslate() {
  const [lang, setLang] = useState<"en" | "es">("en");

  // Detect browser language once
  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("es")) setLang("es");
  }, []);

  // Translator helper
  const t = (en: string, es: string) => (lang === "es" ? es : en);

  // Language toggle component
  const LangToggle = () => (
    <div className="absolute top-4 right-4">
      <button
        onClick={() => setLang(lang === "en" ? "es" : "en")}
        className="text-xs font-medium text-gray-500 hover:text-gray-700 transition"
      >
        {lang === "en" ? "🇺🇸 EN" : "🇪🇸 ES"}
      </button>
    </div>
  );

  return { lang, setLang, t, LangToggle };
}
