import type { ReactNode } from "react";

export const Badge = ({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "success";
}) => {
  const style =
    variant === "success"
      ? "bg-rgba-emerald-20 text-emerald-300"
      : "bg-rgba-white-10 text-white";

  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs ${style}`}>
      {children}
    </span>
  );
};

