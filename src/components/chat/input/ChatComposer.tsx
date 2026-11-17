import * as React from "react";
import { ArrowUp, Square } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (message: string) => void;
  onStop?: () => void;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export function ChatComposer({
  value,
  onChange,
  onSubmit,
  onStop,
  isLoading = false,
  placeholder = "Ask anything about Azeem's portfolio...",
  disabled = false,
}: ChatComposerProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height based on content up to 180px
  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const nextHeight = Math.min(textarea.scrollHeight, 180);
    textarea.style.height = `${nextHeight}px`;
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading && !disabled) {
        onSubmit(value.trim());
      }
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading && !disabled) {
      onSubmit(value.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-4 pt-2 pb-3 sm:pb-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col rounded-xl border border-hairline bg-canvas shadow-sm transition-all focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/15"
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="w-full resize-none bg-transparent px-3.5 sm:px-4 py-3 sm:py-3.5 pr-14 text-[14px] sm:text-[15px] text-ink placeholder:text-muted-soft focus:outline-none disabled:opacity-50 min-h-[46px] sm:min-h-[50px] max-h-[180px] leading-relaxed"
          aria-label="Message input"
        />

        <div className="flex items-center justify-end sm:justify-between px-3 pb-2.5 pt-1">
          <div className="hidden sm:block text-[11px] text-muted-soft">
            Press <kbd className="rounded bg-surface-card border border-hairline px-1 py-0.5 text-[10px] text-body">Enter</kbd> to send, <kbd className="rounded bg-surface-card border border-hairline px-1 py-0.5 text-[10px] text-body">Shift+Enter</kbd> for newline
          </div>

          <div className="flex items-center gap-1.5">
            {isLoading ? (
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={onStop}
                className="h-8 w-8 rounded-lg bg-surface-card text-ink hover:bg-surface-cream-strong"
                title="Stop generation"
                aria-label="Stop generation"
              >
                <Square className="h-3.5 w-3.5 fill-current text-primary" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="default"
                size="icon"
                disabled={!value.trim() || disabled}
                className="h-8 w-8 rounded-lg bg-primary text-white hover:bg-primary-active active:bg-primary-active disabled:opacity-40 disabled:bg-primary-disabled disabled:text-muted transition-all shadow-xs"
                title="Send message"
                aria-label="Send message"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
