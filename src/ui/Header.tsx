// [13] src/ui/Header.tsx
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const nav: [string, string][] = [
    ["Home", "/"],
    ["Dashboard", "/dashboard"],
    ["Validate", "/validate"],
    ["Sign", "/sign"],
    ["Vote", "/vote"],
    ["Trace", "/trace"],
    ["Payments", "/payments"]
  ];
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur shadow-sm">
      <div className="container-narrow py-3 flex flex-col items-center">
        <img
          src="/src/assets/logo-udochain.png"
          alt="UDoChain Logo"
          className="h-10 md:h-14 w-auto mb-1"
        />
        <Link
          to="/"
          className="font-bold tracking-wide text-udo-ink text-[clamp(1.1rem,2vw,1.6rem)]"
        >
