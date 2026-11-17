import * as React from "react";
import { cn } from "@/lib/utils";

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function MobileDrawer({ isOpen, onClose, children }: MobileDrawerProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation sidebar"
      className={cn(
        "fixed inset-0 z-50 md:hidden transition-[visibility] duration-300",
        isOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"
      )}
    >
      {/* Warm tinted backdrop with smooth opacity fade */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-out",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel with smooth springy slide-in from left */}
      <div
        className={cn(
          "relative z-10 flex h-full w-72 max-w-[85vw] flex-col bg-surface-soft border-r border-hairline shadow-2xl transition-transform duration-300 ease-out text-ink",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full w-full overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
