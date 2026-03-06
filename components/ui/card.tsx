import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/70 bg-white/85 p-5 shadow-lg shadow-cyan-100/60 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}
