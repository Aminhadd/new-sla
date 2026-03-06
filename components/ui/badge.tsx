import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("rounded-full bg-secondary px-2 py-1 text-xs font-semibold", className)}>{children}</span>;
}
