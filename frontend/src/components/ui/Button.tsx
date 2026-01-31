// filepath: /Users/macbookpro/Desktop/launch-platform/frontend/src/components/ui/Button.tsx
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  children: ReactNode;
}

export const Button = ({
  variant = "primary",
  children,
  className = "",
  ...rest
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition";
  const styles =
    variant === "primary"
      ? "bg-emerald-500 text-black hover:bg-emerald-400 active:bg-emerald-600"
      : "border border-rgba-white-10 bg-rgba-black-40 text-white hover:bg-rgba-white-5 active:bg-rgba-white-10";

  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  );
};