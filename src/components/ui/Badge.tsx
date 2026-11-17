import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "coral" | "secondary" | "outline" | "success" | "teal";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    // Default badge-pill: cream surface-card with hairline border
    default: "bg-[#efe9de] text-[#141413] border-[#e6dfd8]",
    // Signature coral badge: primary coral with white text
    coral: "bg-[#cc785c] text-white border-transparent uppercase tracking-wider text-[11px]",
    // Soft cream secondary
    secondary: "bg-[#f5f0e8] text-[#3d3d3a] border-[#e6dfd8]",
    // Minimal outline
    outline: "border-[#e6dfd8] bg-transparent text-[#6c6a64]",
    // Semantic success
    success: "bg-[#5db872]/15 text-[#246b38] border-[#5db872]/30",
    // Accent teal
    teal: "bg-[#5db8a6]/15 text-[#276e60] border-[#5db8a6]/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
