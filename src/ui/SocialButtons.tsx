// src/ui/SocialButtons.tsx
import React from "react";

export default function SocialButtons() {
  // ✅ Handlers con redirección directa al backend
  const handleGoogle = () => {
    window.location.assign("https://api.udochain.com/auth/google");
  };

  const handleFacebook = () => {
    window.location.assign("https://api.udochain.com/auth/facebook");
  };

  const handleApple = () => {
    window.location.assign("https://api.udochain.com/auth/apple");
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
      {/* 🔹 Google */}
      <button
        type="button"
        onClick={handleGoogle}
        className="w-full bg-white border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-slate-50 transition active:scale-[0.98]"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="h-5 w-5"
        />
        <span className="text-gray-700 font-medium">Continue with Google</span>
      </button>

      {/* 🔹 Facebook */}
      <button
        type="button"
        onClick={handleFacebook}
        className="w-full bg-[#1877F2] text-white rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-[#166fe5] transition active:scale-[0.98]"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-white"
        >
          <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.6V12h2.8V9.8c0-2.8 1.7-4.3 4.2-4.3 1.2 0 2.4.2 2.4.2v2.6h-1.4c-1.3 0-1.7.8-1.7 1.6V12h2.9l-.5 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
        </svg>
        <span className="font-medium">Continue with Facebook</span>
      </button>

      {/* 🔹 Apple */}
      <button
        type="button"
        onClick={handleApple}
        className="w-full bg-black text-white rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-800 transition active:scale-[0.98]"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-white"
        >
          <path d="M16.365 1.43c0 1.14-.46 2.23-1.2 3.05-.77.85-2.03 1.51-3.14 1.42-.14-1.1.38-2.26 1.17-3.11.8-.92 2.18-1.57 3.17-1.36ZM20.9 17.1c-.4.92-.9 1.76-1.55 2.6-.97 1.22-2.06 2.75-3.57 2.75-1.26 0-2.1-.82-3.53-.82-1.47 0-2.36.8-3.6.83-1.53.03-2.71-1.52-3.7-2.74C2.5 17.2 1.3 13.56 3 10.7c.99-1.7 2.78-2.77 4.73-2.8 1.23 0 2.4.86 3.53.86 1.09 0 1.98-.86 3.53-.86 1.56.03 3 .85 3.9 2.22-3.44 1.88-2.88 6.8.21 6.98Z" />
        </svg>
        <span className="font-medium">Continue with Apple</span>
      </button>
    </div>
  );
}
