// [23] src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 p-6">
      <img
        src="/logo.png"
        alt="UDoChain Logo"
        className="w-20 h-20 mb-6"
      />
      <h1 className="text-3xl font-bold mb-4">Welcome to UDoChain</h1>
      <p className="text-center max-w-md mb-6">
        The easiest way to validate, sign, trace, and vote with blockchain-level
        security. One platform — full control.
      </p>

      <ul className="text-left mb-6 list-disc pl-6">
        <li>Validate your documents with biometric proof</li>
        <li>Create and manage voting lists</li>
        <li>Invite participants to sign and vote</li>
        <li>Trace processes in real time</li>
      </ul>

      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
