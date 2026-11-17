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
      {/* Warm tinted backdrop */}
      <div
        className="fixed inset-0 bg-[#141413]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div className="relative z-10 flex h-full w-72 max-w-[85vw] flex-col bg-[#f5f0e8] border-r border-[#e6dfd8] shadow-2xl transition-transform text-[#141413]">
        <div className="absolute right-2 top-3 z-20">
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e6dfd8] bg-[#faf9f5] text-[#6c6a64] hover:bg-[#efe9de] hover:text-[#141413] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cc785c]/30"
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
