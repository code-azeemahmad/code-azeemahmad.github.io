import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  language?: string;
  children: string;
}

// Anthropic code-window-card: dark surface (#181715) on canvas
function CodeBlock({ language, children }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-3 overflow-hidden rounded-xl border border-[#252320] bg-[#181715] font-mono text-xs shadow-md">
      <div className="flex items-center justify-between border-b border-[#252320] bg-[#1f1e1b] px-3.5 py-1.5 text-[#a09d96]">
        <span className="text-[11px] uppercase tracking-wider text-[#a09d96]">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 text-[11px] text-[#a09d96] hover:text-[#faf9f5] transition-colors cursor-pointer"
          aria-label="Copy code block"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-[#5db872]" />
              <span className="text-[#5db872]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-3.5 leading-relaxed text-[#faf9f5] bg-[#181715]">
        <code>{children}</code>
      </div>
    </div>
  );
}

function isSafeUrl(url?: string): boolean {
  if (!url) return false;
  return url.startsWith("https://") || url.startsWith("http://") || url.startsWith("mailto:");
}

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="markdown-body space-y-2 text-[15px] leading-[1.65] text-body transition-colors">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-serif text-lg font-normal text-ink tracking-tight mt-3.5 mb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-serif text-base font-normal text-ink tracking-tight mt-3 mb-1.5">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-serif text-sm font-medium text-ink tracking-tight mt-2.5 mb-1">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="leading-relaxed mb-2 last:mb-0 text-body">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-5 space-y-1 my-2 text-body">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-5 space-y-1 my-2 text-body">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-primary bg-surface-soft pl-3 py-1 my-2 italic text-body-strong rounded-r">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => {
            if (!isSafeUrl(href)) {
              return <span>{children}</span>;
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:text-primary-active transition-colors font-medium"
              >
                {children}
              </a>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-3">
              <table className="w-full border-collapse border border-hairline text-xs">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-surface-card text-ink font-medium">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border border-hairline px-3 py-1.5 text-left font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-hairline px-3 py-1.5 text-body">{children}</td>
          ),
          code: ({ className, children }) => {
            const isCodeBlock = className && className.startsWith("language-");
            if (isCodeBlock) {
              const language = className ? className.replace("language-", "") : "";
              return <CodeBlock language={language}>{String(children).replace(/\n$/, "")}</CodeBlock>;
            }
            return (
              <code className="rounded border border-hairline bg-surface-card px-1.5 py-0.5 text-xs text-ink font-mono">
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
