import * as React from "react";
import { X } from "lucide-react";

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

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation sidebar"
      className="fixed inset-0 z-50 md:hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div className="relative z-10 flex h-full w-72 max-w-[85vw] flex-col bg-neutral-900 shadow-2xl transition-transform">
        <div className="absolute right-2 top-3 z-20">
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800/80 text-neutral-400 hover:bg-neutral-800 hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Close navigation sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
}
