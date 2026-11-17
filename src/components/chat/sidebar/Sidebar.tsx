import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import {
  MessageSquarePlus,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  FolderGit2,
  Briefcase,
  Wrench,
  Mail,
  Settings,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Search,
  Trash2,
  Pencil,
  X,
} from "lucide-react";
import type { Conversation } from "@/types/chat";

export interface FeaturedTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const FEATURED_TOPICS: FeaturedTopic[] = [
  {
    id: "about-me",
    title: "About Me",
    description: "Background & journey",
    icon: User,
  },
  {
    id: "projects",
    title: "Featured Projects",
    description: "Applications & systems",
    icon: FolderGit2,
  },
  {
    id: "experience",
    title: "Experience",
    description: "Roles & outcomes",
    icon: Briefcase,
  },
  {
    id: "skills",
    title: "Technical Skills",
    description: "Stack & tools",
    icon: Wrench,
  },
  {
    id: "contact",
    title: "Contact & Links",
    description: "Reach out & collaborate",
    icon: Mail,
  },
];

export interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  activeTopicId?: string | null;
  activeConversationId?: string | null;
  conversations: Conversation[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectTopic: (topicId: string) => void;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onRenameConversation: (id: string, newTitle: string) => void;
  onDeleteConversation: (id: string) => void;
  onClearAll: () => void;
  onExportActive: (format: "json" | "markdown") => void;
  onOpenSettings: () => void;
  className?: string;
}

export function Sidebar({
  isCollapsed,
  onToggleCollapse,
  activeTopicId,
  activeConversationId,
  conversations,
  searchQuery,
  onSearchChange,
  onSelectTopic,
  onSelectConversation,
  onNewChat,
  onRenameConversation,
  onDeleteConversation,
  onClearAll,
  onExportActive,
  onOpenSettings,
  className,
}: SidebarProps) {
  const [editingConvId, setEditingConvId] = React.useState<string | null>(null);
  const [editTitle, setEditTitle] = React.useState("");
  const [confirmClearOpen, setConfirmClearOpen] = React.useState(false);

  const handleStartRename = (e: React.MouseEvent, conv: Conversation) => {
    e.stopPropagation();
    setEditingConvId(conv.id);
    setEditTitle(conv.title);
  };

  const handleSaveRename = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (editingConvId && editTitle.trim()) {
      onRenameConversation(editingConvId, editTitle.trim());
      setEditingConvId(null);
    }
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onDeleteConversation(id);
  };

  return (
    <>
      <aside
        className={cn(
          "flex h-full flex-col border-r border-neutral-800/80 bg-neutral-900/95 transition-all duration-200 select-none",
          isCollapsed ? "w-16" : "w-64",
          className
        )}
        aria-label="Chat sidebar"
      >
        {/* Top Header */}
        <div className="flex h-14 items-center justify-between px-3 border-b border-neutral-800/60">
          {!isCollapsed && (
            <div className="flex items-center gap-2.5 overflow-hidden px-1">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold text-xs">
                AA
              </div>
              <div className="flex flex-col truncate">
                <span className="text-sm font-semibold text-neutral-100 truncate">
                  Azeem Ahmad
                </span>
                <span className="text-[10px] text-neutral-400 truncate">
                  Portfolio Assistant
                </span>
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="h-8 w-8 text-neutral-400 hover:text-neutral-100"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* New Chat Action */}
        <div className="p-2.5 space-y-2">
          <Button
            variant="secondary"
            onClick={onNewChat}
            className={cn(
              "w-full justify-start gap-2.5 rounded-xl border border-neutral-800 bg-neutral-800/70 hover:bg-neutral-800 text-neutral-100 shadow-sm",
              isCollapsed && "justify-center px-0"
            )}
            title="New conversation"
            aria-label="Start new conversation"
          >
            <MessageSquarePlus className="h-4 w-4 text-blue-400 shrink-0" />
            {!isCollapsed && (
              <span className="text-xs font-medium">New Conversation</span>
            )}
          </Button>

          {/* Search Input (visible when not collapsed) */}
          {!isCollapsed && (
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search conversations..."
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950/60 py-1.5 pl-8 pr-7 text-xs text-neutral-200 placeholder:text-neutral-500 focus:border-blue-500/80 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-2 top-2 text-neutral-500 hover:text-neutral-300"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Scrollable Middle Area */}
        <div className="flex-1 overflow-y-auto px-2 py-1 space-y-4">
          {/* Featured Topics Section */}
          <div>
            {!isCollapsed && (
              <div className="flex items-center justify-between px-2 py-1 text-[11px] font-medium tracking-wider uppercase text-neutral-500">
                <span>Featured Topics</span>
                <Sparkles className="h-3 w-3 text-blue-400/80" />
              </div>
            )}

            <nav className="mt-1 space-y-0.5" aria-label="Featured portfolio topics">
              {FEATURED_TOPICS.map((topic) => {
                const Icon = topic.icon;
                const isActive = activeTopicId === topic.id;

                return (
                  <button
                    key={topic.id}
                    onClick={() => onSelectTopic(topic.id)}
                    title={`${topic.title}: ${topic.description}`}
                    aria-label={topic.title}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500",
                      isActive
                        ? "bg-blue-600/15 text-blue-400 font-medium border border-blue-500/20"
                        : "text-neutral-400 hover:bg-neutral-800/60 hover:text-neutral-200",
                      isCollapsed && "justify-center px-0 py-2.5"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isActive ? "text-blue-400" : "text-neutral-400"
                      )}
                    />
                    {!isCollapsed && (
                      <div className="truncate">
                        <div className="truncate leading-none">{topic.title}</div>
                        <div className="text-[10px] text-neutral-500 truncate mt-0.5">
                          {topic.description}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Stored Conversations List */}
          <div>
            {!isCollapsed && (
              <div className="flex items-center justify-between px-2 py-1 text-[11px] font-medium tracking-wider uppercase text-neutral-500">
                <span>Recent History ({conversations.length})</span>
                {conversations.length > 0 && (
                  <button
                    onClick={() => setConfirmClearOpen(true)}
                    className="text-[10px] text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                    title="Clear all conversation history"
                  >
                    Clear
                  </button>
                )}
              </div>
            )}

            {!isCollapsed ? (
              conversations.length === 0 ? (
                <div className="px-2 py-3 text-center">
                  <MessageSquare className="h-4 w-4 mx-auto text-neutral-600 mb-1.5" />
                  <p className="text-[11px] text-neutral-500">No saved chats yet</p>
                  <p className="text-[10px] text-neutral-600 mt-0.5">
                    Chats save locally in your browser
                  </p>
                </div>
              ) : (
                <div className="space-y-0.5 mt-1">
                  {conversations.map((conv) => {
                    const isActive = activeConversationId === conv.id;

                    return (
                      <div
                        key={conv.id}
                        onClick={() => onSelectConversation(conv.id)}
                        className={cn(
                          "group relative flex items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors cursor-pointer",
                          isActive
                            ? "bg-neutral-800 text-neutral-100 font-medium"
                            : "text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200"
                        )}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <MessageSquare className="h-3.5 w-3.5 shrink-0 text-neutral-500 group-hover:text-neutral-300" />
                          <span className="truncate">{conv.title}</span>
                        </div>

                        {/* Quick action buttons on hover */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => handleStartRename(e, conv)}
                            className="p-1 text-neutral-400 hover:text-white"
                            title="Rename"
                          >
                            <Pencil className="h-3 w-3" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(e, conv.id)}
                            className="p-1 text-neutral-400 hover:text-red-400"
                            title="Delete"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              <div
                className="flex justify-center py-2 text-neutral-600"
                title={`${conversations.length} saved chats`}
              >
                <MessageSquare className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>

        {/* Footer Profile & Settings */}
        <div className="border-t border-neutral-800/60 p-2 space-y-1">
          {activeConversationId && !isCollapsed && (
            <div className="flex items-center justify-between px-2 py-1 text-xs">
              <span className="text-[11px] text-neutral-500">Export chat:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onExportActive("markdown")}
                  className="rounded px-1.5 py-0.5 text-[10px] text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  title="Export active conversation as Markdown"
                >
                  MD
                </button>
                <button
                  onClick={() => onExportActive("json")}
                  className="rounded px-1.5 py-0.5 text-[10px] text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  title="Export active conversation as JSON"
                >
                  JSON
                </button>
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            onClick={onOpenSettings}
            className={cn(
              "w-full justify-start gap-2.5 rounded-lg px-2.5 text-xs text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60",
              isCollapsed && "justify-center px-0"
            )}
            title="Settings & BYOK Provider"
            aria-label="Settings and BYOK Provider configuration"
          >
            <Settings className="h-4 w-4 shrink-0 text-neutral-400" />
            {!isCollapsed && <span>Settings & BYOK</span>}
          </Button>

          {!isCollapsed && (
            <div className="flex items-center justify-between px-2.5 py-1 text-[10px] text-neutral-500">
              <span>azeemahmad.me</span>
              <a
                href="https://github.com/code-azeemahmad/code-azeemahmad.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-neutral-300 transition-colors"
              >
                <span>GitHub</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>
          )}
        </div>
      </aside>

      {/* Rename Dialog */}
      <Dialog
        isOpen={editingConvId !== null}
        onClose={() => setEditingConvId(null)}
        title="Rename Conversation"
        description="Enter a new title for this conversation."
      >
        <form onSubmit={handleSaveRename} className="space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 focus:border-blue-500 focus:outline-none"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setEditingConvId(null)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="default" size="sm">
              Save
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Confirm Clear All Dialog */}
      <Dialog
        isOpen={confirmClearOpen}
        onClose={() => setConfirmClearOpen(false)}
        title="Clear All History"
        description="Are you sure you want to delete all saved conversations from this browser? This action cannot be undone."
      >
        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setConfirmClearOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => {
              onClearAll();
              setConfirmClearOpen(false);
            }}
          >
            Delete All
          </Button>
        </div>
      </Dialog>
    </>
  );
}
