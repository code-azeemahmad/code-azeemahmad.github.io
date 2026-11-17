import * as React from "react";
import { User, Bot, Copy, Check, ExternalLink, Bookmark } from "lucide-react";
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
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-semibold ${
          isUser
            ? "bg-blue-600 text-white shadow-sm"
            : "bg-neutral-800 text-blue-400 border border-neutral-700/60 shadow-sm"
        }`}
        aria-hidden="true"
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Message Content Bubble */}
      <div
        className={`relative max-w-[88%] sm:max-w-[82%] rounded-2xl px-4 py-3 text-sm shadow-sm transition-all ${
          isUser
            ? "bg-blue-600 text-white"
            : "border border-neutral-800 bg-neutral-900/90 text-neutral-200"
        }`}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
        ) : (
          <MarkdownRenderer content={message.content} />
        )}

        {/* Source References & Citations */}
        {!isUser && message.citations && message.citations.length > 0 && (
          <div className="mt-3 border-t border-neutral-800/80 pt-2.5">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 mb-1.5">
              <Bookmark className="h-3 w-3 text-blue-400" />
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
                    className="inline-flex items-center gap-1 rounded-md border border-neutral-800 bg-neutral-950/60 px-2 py-0.5 text-[10px] text-neutral-300 hover:border-neutral-700 hover:text-white transition-colors"
                  >
                    <span className="truncate max-w-[180px]">{citation.title}</span>
                    {isLink && <ExternalLink className="h-2.5 w-2.5 text-neutral-500" />}
                  </Component>
                );
              })}
            </div>
          </div>
        )}

        {/* Assistant Footer */}
        {!isUser && (
          <div className="mt-2.5 flex items-center justify-between border-t border-neutral-800/60 pt-2 text-[11px] text-neutral-500">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400/80" />
              <span>Grounded in portfolio</span>
            </span>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 hover:text-neutral-300 transition-colors cursor-pointer"
              aria-label="Copy assistant response"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
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
