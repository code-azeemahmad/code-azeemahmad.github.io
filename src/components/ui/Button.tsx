import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "dark";
  size?: "sm" | "md" | "lg" | "icon" | "icon-sm";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // 8px radius (--rounded-md), focus ring in primary coral at 20% alpha
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors cursor-pointer select-none rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cc785c]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f5] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.99]";

    const variantStyles = {
      // Primary coral CTA
      default:
        "bg-[#cc785c] text-white hover:bg-[#a9583e] active:bg-[#a9583e] disabled:bg-[#e6dfd8] disabled:text-[#6c6a64] shadow-sm",
      // Secondary cream with hairline border
      secondary:
        "bg-[#faf9f5] text-[#141413] hover:bg-[#efe9de] active:bg-[#e8e0d2] border border-[#e6dfd8] shadow-sm",
      // Outline with hairline border
      outline:
        "border border-[#e6dfd8] bg-transparent text-[#141413] hover:bg-[#efe9de] hover:text-[#141413]",
      // Ghost button
      ghost:
        "bg-transparent text-[#6c6a64] hover:bg-[#efe9de] hover:text-[#141413]",
      // Destructive
      destructive:
        "bg-[#c64545] text-white hover:bg-[#a33737] focus-visible:ring-[#c64545]",
      // Secondary on dark surface
      dark:
        "bg-[#252320] text-[#faf9f5] hover:bg-[#181715] border border-[#3d3d3a]",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-9 px-4 text-sm gap-2",
      lg: "h-11 px-5 text-base gap-2.5",
      icon: "h-9 w-9 p-0 flex items-center justify-center shrink-0",
      "icon-sm": "h-8 w-8 p-0 flex items-center justify-center shrink-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
