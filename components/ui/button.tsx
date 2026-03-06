import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" };

export function Button({ className, variant = "default", ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "default"
          ? "bg-gradient-to-r from-primary to-cyan-500 text-white shadow-cyan-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-200/80"
          : "border border-border bg-white/80 text-foreground backdrop-blur hover:-translate-y-0.5 hover:bg-secondary",
        className
      )}
      {...props}
    />
  );
}
