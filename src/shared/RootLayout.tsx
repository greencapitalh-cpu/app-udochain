// [12] src/shared/RootLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container-narrow py-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
