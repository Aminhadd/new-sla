import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" };

export function Button({ className, variant = "default", ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium",
        variant === "default" ? "bg-primary text-white" : "border border-border bg-white",
        className
      )}
      {...props}
    />
  );
}
