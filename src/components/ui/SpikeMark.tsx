import * as React from "react";

export interface SpikeMarkProps extends React.SVGAttributes<SVGElement> {
  className?: string;
}

export function SpikeMark({ className = "h-4 w-4 text-current", ...props }: SpikeMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2C12.3 7.3 16.7 11.7 22 12C16.7 12.3 12.3 16.7 12 22C11.7 16.7 7.3 12.3 2 12C7.3 11.7 11.7 7.3 12 2Z" />
    </svg>
  );
}
