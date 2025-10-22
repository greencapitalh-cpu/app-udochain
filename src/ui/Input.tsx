// [16] src/ui/Input.tsx
import { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return (
    <input
      {...rest}
      className={`w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-udo-accent ${className}`}
    />
  );
}
