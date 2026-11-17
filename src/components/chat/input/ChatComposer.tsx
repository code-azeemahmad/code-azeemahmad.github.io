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
    <div className="w-full max-w-3xl mx-auto px-4 pb-4 pt-2">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900/90 shadow-lg backdrop-blur-md focus-within:border-neutral-700 transition-colors"
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="w-full resize-none bg-transparent px-4 py-3.5 pr-14 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none disabled:opacity-50 min-h-[48px] max-h-[180px]"
          aria-label="Message input"
        />

        <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
          <div className="text-[11px] text-neutral-500">
            Press <kbd className="rounded bg-neutral-800 px-1 py-0.5 text-[10px] text-neutral-400">Enter</kbd> to send, <kbd className="rounded bg-neutral-800 px-1 py-0.5 text-[10px] text-neutral-400">Shift+Enter</kbd> for newline
          </div>

          <div className="flex items-center gap-1.5">
            {isLoading ? (
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={onStop}
                className="h-8 w-8 rounded-lg bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                title="Stop generation"
                aria-label="Stop generation"
              >
                <Square className="h-3.5 w-3.5 fill-current" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="default"
                size="icon"
                disabled={!value.trim() || disabled}
                className="h-8 w-8 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-30 disabled:bg-neutral-800 disabled:text-neutral-500 transition-all"
                title="Send message"
                aria-label="Send message"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </form>

      <p className="mt-2 text-center text-[11px] text-neutral-500">
        AI responses are grounded in Azeem's verified portfolio. Bring Your Own Key (BYOK) supported in Settings.
      </p>
    </div>
  );
}
