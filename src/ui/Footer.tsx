// [14] src/ui/Footer.tsx
export default function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200">
      <div className="container-narrow py-6 text-center text-sm text-udo-steel">
        © {new Date().getFullYear()} UDoChain — All rights reserved.
      </div>
    </footer>
  );
}
