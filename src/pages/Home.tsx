// [04] src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-udochain.png"; // ✅ Import correcto

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 p-6">
      {/* ✅ Logo que respeta proporciones naturales */}
      <div className="w-full flex justify-center mb-6">
        <img
          src={logo}
          alt="UDoChain Logo"
          className="max-h-32 w-auto object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      <h1 className="text-3xl font-bold mb-4">Welcome to UDoChain</h1>
      <p className="text-center max-w-md mb-6 text-gray-600">
        Validate, sign, trace, and vote with blockchain-level security — all in one simple platform.
      </p>

      <ul className="text-left mb-6 list-disc pl-6 space-y-2 text-gray-700">
        <li>Validate your documents with biometric verification</li>
        <li>Create and manage voting lists</li>
        <li>Invite others to sign or vote securely</li>
        <li>Trace processes with full transparency</li>
      </ul>

      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
