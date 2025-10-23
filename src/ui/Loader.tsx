// [18] src/ui/Loader.tsx
export default function Loader() {
  return (
    <div className="flex items-center justify-center gap-3 py-3">
      <span className="inline-block h-3 w-3 rounded-full bg-udo-primary animate-bounce [animation-delay:0ms]" />
      <span className="inline-block h-3 w-3 rounded-full bg-udo-primary animate-bounce [animation-delay:120ms]" />
      <span className="inline-block h-3 w-3 rounded-full bg-udo-primary animate-bounce [animation-delay:240ms]" />
    </div>
  );
}
