// [19] src/ui/EmptyState.tsx
export default function EmptyState({ title, text }: { title: string; text?: string }) {
  return (
    <div className="card p-8 text-center">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {text ? <p className="text-udo-steel">{text}</p> : null}
    </div>
  );
}
