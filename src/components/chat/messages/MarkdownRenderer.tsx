import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  language?: string;
  children: string;
}

function CodeBlock({ language, children }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-3 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/80 px-3.5 py-1.5 text-neutral-400">
        <span className="text-[11px] uppercase tracking-wider text-neutral-400">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 text-[11px] hover:text-white transition-colors cursor-pointer"
          aria-label="Copy code block"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-3.5 leading-relaxed text-neutral-200">
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
    <div className="markdown-body space-y-2 text-sm leading-relaxed text-neutral-200">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-lg font-bold text-neutral-100 mt-3 mb-2">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-semibold text-neutral-100 mt-3 mb-1.5">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-semibold text-neutral-100 mt-2.5 mb-1">{children}</h3>
          ),
          p: ({ children }) => <p className="leading-relaxed mb-2 last:mb-0">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-5 space-y-1 my-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-5 space-y-1 my-2">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-blue-500/60 bg-blue-500/5 pl-3 py-1 my-2 italic text-neutral-300 rounded-r">
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
                className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors"
              >
                {children}
              </a>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-3">
              <table className="min-w-full divide-y divide-neutral-800 text-xs border border-neutral-800 rounded-lg">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-neutral-900">{children}</thead>,
          tbody: ({ children }) => (
            <tbody className="divide-y divide-neutral-800/60 bg-neutral-950/40">{children}</tbody>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-left font-medium text-neutral-300 uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => <td className="px-3 py-2 text-neutral-300">{children}</td>,
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(children).replace(/\n$/, "");
            const isMultiline = codeString.includes("\n");

            if (isMultiline || match) {
              return (
                <CodeBlock language={match ? match[1] : undefined}>
                  {codeString}
                </CodeBlock>
              );
            }

            return (
              <code
                className="rounded bg-neutral-800/80 px-1.5 py-0.5 font-mono text-[12px] text-blue-300 border border-neutral-700/50"
                {...props}
              >
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
