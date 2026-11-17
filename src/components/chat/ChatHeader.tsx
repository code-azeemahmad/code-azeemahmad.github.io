import * as React from "react";
import {
  Menu,
  MessageSquarePlus,
  Settings,
  Download,
  Trash2,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export interface ChatHeaderProps {
  title?: string;
  hasMessages?: boolean;
  onOpenMobileMenu: () => void;
  onNewChat: () => void;
  onOpenSettings: () => void;
  onExportMarkdown?: () => void;
  onExportJson?: () => void;
  onDeleteCurrentChat?: () => void;
  isLiveAIEnabled?: boolean;
}

export function ChatHeader({
  title = "Portfolio Assistant",
  hasMessages = false,
  onOpenMobileMenu,
  onNewChat,
  onOpenSettings,
  onExportMarkdown,
  onExportJson,
  onDeleteCurrentChat,
  isLiveAIEnabled = false,
}: ChatHeaderProps) {
  const [exportMenuOpen, setExportMenuOpen] = React.useState(false);

  return (
    <header className="flex h-14 w-full shrink-0 items-center justify-between border-b border-neutral-800/80 bg-neutral-950/80 px-3 md:px-6 backdrop-blur-md">
      <div className="flex items-center gap-3 overflow-hidden">
        {/* Mobile menu trigger */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenMobileMenu}
          className="md:hidden text-neutral-400 hover:text-white shrink-0"
          aria-label="Open sidebar menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Title and status */}
        <div className="flex items-center gap-2 truncate">
          <span className="font-semibold text-sm text-neutral-100 truncate max-w-[180px] sm:max-w-xs md:max-w-md">
            {title}
          </span>
          <Badge
            variant={isLiveAIEnabled ? "default" : "secondary"}
            className="hidden sm:inline-flex text-[11px] shrink-0"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isLiveAIEnabled ? "bg-blue-400" : "bg-emerald-400"
              }`}
            />
            {isLiveAIEnabled ? "Live AI Active" : "Portfolio Mode"}
          </Badge>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 shrink-0">
        {hasMessages && (
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setExportMenuOpen((prev) => !prev)}
              className="h-8 w-8 text-neutral-400 hover:text-neutral-100"
              title="Export conversation"
              aria-label="Export conversation"
            >
              <Download className="h-4 w-4" />
            </Button>

            {exportMenuOpen && (
              <div
                className="absolute right-0 top-10 z-50 w-44 rounded-xl border border-neutral-800 bg-neutral-900 p-1.5 shadow-xl text-xs"
                onClick={() => setExportMenuOpen(false)}
              >
                <button
                  onClick={onExportMarkdown}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white text-left cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5 text-neutral-400" />
                  <span>Export as Markdown</span>
                </button>
                <button
                  onClick={onExportJson}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white text-left cursor-pointer"
                >
                  <Share2 className="h-3.5 w-3.5 text-neutral-400" />
                  <span>Export as JSON</span>
                </button>
                {onDeleteCurrentChat && (
                  <button
                    onClick={onDeleteCurrentChat}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-red-400 hover:bg-red-500/10 text-left border-t border-neutral-800 mt-1 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete Chat</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={onNewChat}
          className="h-8 w-8 text-neutral-400 hover:text-neutral-100"
          title="New conversation"
          aria-label="Start new conversation"
        >
          <MessageSquarePlus className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenSettings}
          className="h-8 w-8 text-neutral-400 hover:text-neutral-100"
          title="Settings and BYOK"
          aria-label="Open settings and BYOK provider configuration"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
