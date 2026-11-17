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
        className="relative flex flex-col rounded-xl border border-[#e6dfd8] bg-[#faf9f5] shadow-sm transition-all focus-within:border-[#cc785c] focus-within:ring-3 focus-within:ring-[#cc785c]/15"
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="w-full resize-none bg-transparent px-4 py-3.5 pr-14 text-sm text-[#141413] placeholder:text-[#8e8b82] focus:outline-none disabled:opacity-50 min-h-[48px] max-h-[180px] leading-relaxed"
          aria-label="Message input"
        />

        <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
          <div className="text-[11px] text-[#8e8b82]">
            Press <kbd className="rounded bg-[#efe9de] border border-[#e6dfd8] px-1 py-0.5 text-[10px] text-[#3d3d3a]">Enter</kbd> to send, <kbd className="rounded bg-[#efe9de] border border-[#e6dfd8] px-1 py-0.5 text-[10px] text-[#3d3d3a]">Shift+Enter</kbd> for newline
          </div>

          <div className="flex items-center gap-1.5">
            {isLoading ? (
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={onStop}
                className="h-8 w-8 rounded-lg bg-[#efe9de] text-[#141413] hover:bg-[#e8e0d2]"
                title="Stop generation"
                aria-label="Stop generation"
              >
                <Square className="h-3.5 w-3.5 fill-current text-[#cc785c]" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="default"
                size="icon"
                disabled={!value.trim() || disabled}
                className="h-8 w-8 rounded-lg bg-[#cc785c] text-white hover:bg-[#a9583e] active:bg-[#a9583e] disabled:opacity-40 disabled:bg-[#e6dfd8] disabled:text-[#8e8b82] transition-all shadow-xs"
                title="Send message"
                aria-label="Send message"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </form>

      {/* Grounding Disclaimer */}
      <div className="mt-2 text-center text-[11px] text-[#8e8b82]">
        Grounded portfolio answers are factual and source-referenced. Live responses powered by BYOK streaming.
      </div>
    </div>
  );
}
