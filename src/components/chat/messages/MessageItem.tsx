import * as React from "react";
import { User, Copy, Check, ExternalLink, Bookmark } from "lucide-react";
import { SpikeMark } from "@/components/ui/SpikeMark";
import { MarkdownRenderer } from "./MarkdownRenderer";
import type { ChatMessage } from "@/types/chat";

export interface MessageItemProps {
  message: ChatMessage;
}

export function MessageItem({ message }: MessageItemProps) {
  const [copied, setCopied] = React.useState(false);
  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex items-start gap-3.5 group ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold border ${
          isUser
            ? "bg-surface-card text-ink border-hairline shadow-xs"
            : "bg-surface-card text-primary border-hairline shadow-xs"
        }`}
        aria-hidden="true"
      >
        {isUser ? <User className="h-4 w-4" /> : <SpikeMark className="h-4 w-4 text-primary" />}
      </div>

      {/* Message Content Bubble */}
      <div
        className={`relative max-w-[88%] sm:max-w-[82%] rounded-xl px-4.5 py-3.5 text-sm transition-all shadow-xs ${
          isUser
            ? "border border-hairline bg-surface-card text-ink"
            : "border border-hairline bg-canvas text-body"
        }`}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap leading-relaxed font-normal">{message.content}</div>
        ) : (
          <MarkdownRenderer content={message.content} />
        )}

        {/* Source References & Citations */}
        {!isUser && message.citations && message.citations.length > 0 && (
          <div className="mt-3.5 border-t border-hairline pt-2.5">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted mb-2 uppercase tracking-wider">
              <Bookmark className="h-3 w-3 text-primary" />
              <span>Referenced Sources</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {message.citations.map((citation) => {
                const isLink = !!citation.url;
                const Component = isLink ? "a" : "span";
                return (
                  <Component
                    key={citation.id}
                    {...(isLink
                      ? {
                          href: citation.url,
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                    className="inline-flex items-center gap-1 rounded-full border border-hairline bg-surface-card px-2.5 py-1 text-[11px] text-ink hover:bg-surface-cream-strong transition-colors"
                  >
                    <span className="truncate max-w-[180px]">{citation.title}</span>
                    {isLink && <ExternalLink className="h-2.5 w-2.5 text-primary" />}
                  </Component>
                );
              })}
            </div>
          </div>
        )}

        {/* Assistant Footer */}
        {!isUser && (
          <div className="mt-2.5 flex items-center justify-between border-t border-hairline pt-2 text-[11px] text-muted-soft">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5db8a6]" />
              <span>Grounded in portfolio</span>
            </span>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-muted-soft hover:text-primary transition-colors cursor-pointer"
              aria-label="Copy assistant response"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-[#5db872]" />
                  <span className="text-[#5db872]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
