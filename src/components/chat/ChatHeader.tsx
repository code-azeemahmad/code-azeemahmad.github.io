import * as React from "react";
import {
  Menu,
  MessageSquarePlus,
  Settings,
  Download,
  Trash2,
  Share2,
  Sun,
  Moon,
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
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
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
  theme = "dark",
  onToggleTheme,
}: ChatHeaderProps) {
  const [exportMenuOpen, setExportMenuOpen] = React.useState(false);

  return (
    <header className="flex h-14 w-full shrink-0 items-center justify-between border-b border-hairline bg-canvas px-3 md:px-6 select-none transition-colors">
      <div className="flex items-center gap-3 overflow-hidden">
        {/* Mobile menu trigger */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenMobileMenu}
          className="md:hidden text-muted hover:text-ink hover:bg-surface-card shrink-0"
          aria-label="Open sidebar menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Title and status */}
        <div className="flex items-center gap-2 truncate">
          <span className="font-serif text-base font-medium text-ink truncate max-w-[180px] sm:max-w-xs md:max-w-md tracking-tight">
            {title}
          </span>
          <Badge
            variant={isLiveAIEnabled ? "coral" : "default"}
            className="hidden sm:inline-flex text-[11px] shrink-0"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isLiveAIEnabled ? "bg-white" : "bg-[#5db8a6]"
              }`}
            />
            {isLiveAIEnabled ? "Live AI Active" : "Portfolio Mode"}
          </Badge>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Theme Switcher Button */}
        {onToggleTheme && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            className="h-8 w-8 text-muted hover:text-ink hover:bg-surface-card transition-colors"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-[#e8a55a]" />
            ) : (
              <Moon className="h-4 w-4 text-[#cc785c]" />
            )}
          </Button>
        )}

        {hasMessages && (
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setExportMenuOpen((prev) => !prev)}
              className="h-8 w-8 text-muted hover:text-ink hover:bg-surface-card"
              title="Export conversation"
              aria-label="Export conversation"
            >
              <Download className="h-4 w-4" />
            </Button>

            {exportMenuOpen && (
              <div
                className="absolute right-0 top-10 z-50 w-44 rounded-xl border border-hairline bg-canvas p-1.5 shadow-xl shadow-black/10 text-xs"
                onClick={() => setExportMenuOpen(false)}
              >
                <button
                  onClick={onExportMarkdown}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-body hover:bg-surface-card hover:text-ink text-left cursor-pointer transition-colors"
                >
                  <Download className="h-3.5 w-3.5 text-primary" />
                  <span>Export as Markdown</span>
                </button>
                <button
                  onClick={onExportJson}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-body hover:bg-surface-card hover:text-ink text-left cursor-pointer transition-colors"
                >
                  <Share2 className="h-3.5 w-3.5 text-primary" />
                  <span>Export as JSON</span>
                </button>
                {onDeleteCurrentChat && (
                  <button
                    onClick={onDeleteCurrentChat}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-[#c64545] hover:bg-surface-card text-left cursor-pointer border-t border-hairline mt-1 pt-1.5 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete Conversation</span>
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
          className="h-8 w-8 text-muted hover:text-ink hover:bg-surface-card"
          title="New conversation"
          aria-label="New conversation"
        >
          <MessageSquarePlus className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenSettings}
          className="h-8 w-8 text-muted hover:text-ink hover:bg-surface-card"
          title="Settings"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
