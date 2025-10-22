// [15] src/ui/Button.tsx
import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center rounded-lg bg-udo-primary text-white px-4 py-2 hover:bg-udo-ink transition-all disabled:opacity-50 ${className}`}
    />
  );
}
