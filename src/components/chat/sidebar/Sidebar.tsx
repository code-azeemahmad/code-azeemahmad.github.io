import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { SpikeMark } from "@/components/ui/SpikeMark";
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
  MessageSquare,
  Search,
  Trash2,
  Pencil,
  X,
  Sun,
  Moon,
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
  isMobile?: boolean;
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
  onOpenSettings: () => void;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
  className?: string;
}

export function Sidebar({
  isCollapsed,
  onToggleCollapse,
  isMobile = false,
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
  onOpenSettings,
  theme = "dark",
  onToggleTheme,
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
          "flex h-full flex-col border-r border-hairline bg-surface-soft text-ink transition-all duration-200 select-none",
          isCollapsed ? "w-16" : "w-64",
          className
        )}
        aria-label="Chat sidebar"
      >
        {/* Top Header */}
        <div className="flex h-14 items-center justify-between px-3 border-b border-hairline">
          {!isCollapsed && (
            <div className="flex items-center gap-2.5 overflow-hidden px-1">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-card border border-hairline text-primary">
                <SpikeMark className="h-4 w-4" />
              </div>
              <div className="flex flex-col truncate">
                <span className="font-serif text-sm font-medium text-ink truncate tracking-tight">
                  Azeem Ahmad
                </span>
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="h-8 w-8 text-muted hover:text-ink hover:bg-surface-card"
            title={isMobile ? "Close menu" : isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={isMobile ? "Close menu" : isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isMobile ? (
              <X className="h-4 w-4" />
            ) : isCollapsed ? (
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
              "w-full justify-start gap-2.5 rounded-lg border border-hairline bg-canvas hover:bg-surface-card text-ink shadow-sm transition-colors",
              isCollapsed && "justify-center px-0"
            )}
            title="New conversation"
            aria-label="Start new conversation"
          >
            <MessageSquarePlus className="h-4 w-4 text-primary shrink-0" />
            {!isCollapsed && (
              <span className="text-xs font-medium">New Conversation</span>
            )}
          </Button>

          {/* Search Input (visible when not collapsed) */}
          {!isCollapsed && (
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-soft" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search conversations..."
                className="w-full rounded-lg border border-hairline bg-canvas py-1.5 pl-8 pr-7 text-xs text-ink placeholder:text-muted-soft focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-2 top-2 text-muted-soft hover:text-ink"
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
              <div className="flex items-center justify-between px-2 py-1 text-[11px] font-medium tracking-wider uppercase text-muted">
                <span>Featured Topics</span>
                <Sparkles className="h-3 w-3 text-primary" />
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
                      "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
                      isActive
                        ? "bg-surface-card text-ink font-medium border border-hairline shadow-xs"
                        : "text-body hover:bg-surface-card hover:text-ink",
                      isCollapsed && "justify-center px-0 py-2.5"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isActive ? "text-primary" : "text-muted"
                      )}
                    />
                    {!isCollapsed && (
                      <div className="truncate">
                        <div className="truncate leading-none">{topic.title}</div>
                        <div className="text-[10px] text-muted truncate mt-0.5">
                          {topic.description}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Conversation History Section */}
          {!isCollapsed && (
            <div>
              <div className="flex items-center justify-between px-2 py-1 text-[11px] font-medium tracking-wider uppercase text-muted">
                <span>Chat History</span>
                {conversations.length > 0 && (
                  <button
                    onClick={() => setConfirmClearOpen(true)}
                    className="text-[10px] text-muted-soft hover:text-[#c64545] transition-colors cursor-pointer"
                    title="Clear all conversations"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="mt-1 space-y-0.5">
                {conversations.length === 0 ? (
                  <div className="px-2.5 py-3 text-center text-xs text-muted-soft">
                    {searchQuery ? "No matching chats" : "No saved chats yet"}
                  </div>
                ) : (
                  conversations.map((conv) => {
                    const isActive = activeConversationId === conv.id;
                    const isEditing = editingConvId === conv.id;

                    if (isEditing) {
                      return (
                        <form
                          key={conv.id}
                          onSubmit={handleSaveRename}
                          className="flex items-center gap-1 px-1 py-1"
                        >
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            autoFocus
                            onBlur={() => setEditingConvId(null)}
                            className="w-full rounded border border-primary bg-canvas px-2 py-1 text-xs text-ink focus:outline-none"
                          />
                        </form>
                      );
                    }

                    return (
                      <div
                        key={conv.id}
                        onClick={() => onSelectConversation(conv.id)}
                        className={cn(
                          "group relative flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition-colors cursor-pointer",
                          isActive
                            ? "bg-surface-card text-ink font-medium border border-hairline shadow-xs"
                            : "text-body hover:bg-surface-card hover:text-ink"
                        )}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <MessageSquare
                            className={cn(
                              "h-3.5 w-3.5 shrink-0",
                              isActive ? "text-primary" : "text-muted-soft"
                            )}
                          />
                          <span className="truncate">{conv.title}</span>
                        </div>

                        {/* Action buttons on hover */}
                        <div className="hidden group-hover:flex items-center gap-1 shrink-0 bg-surface-card pl-1 rounded">
                          <button
                            onClick={(e) => handleStartRename(e, conv)}
                            className="p-1 text-muted hover:text-ink transition-colors"
                            title="Rename"
                            aria-label={`Rename ${conv.title}`}
                          >
                            <Pencil className="h-3 w-3" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(e, conv.id)}
                            className="p-1 text-muted hover:text-[#c64545] transition-colors"
                            title="Delete"
                            aria-label={`Delete ${conv.title}`}
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Profile & Settings Card */}
        <div className="border-t border-hairline p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] bg-surface-card transition-colors">
          {!isCollapsed ? (
            <div className="flex items-center justify-between rounded-lg bg-canvas p-2 border border-hairline">
              <div className="flex items-center gap-2 overflow-hidden">
                <img
                  src="/azeempic.jpeg"
                  alt="Azeem Ahmad"
                  className="h-7 w-7 shrink-0 rounded-full object-cover object-[40%_20%] border border-primary"
                />
                <div className="truncate">
                  <div className="text-xs font-medium text-ink truncate">
                    Azeem Ahmad
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {onToggleTheme && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggleTheme}
                    className="h-7 w-7 text-muted hover:text-ink hover:bg-surface-card"
                    title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                  >
                    {theme === "dark" ? (
                      <Sun className="h-3.5 w-3.5 text-[#e8a55a]" />
                    ) : (
                      <Moon className="h-3.5 w-3.5 text-primary" />
                    )}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onOpenSettings}
                  className="h-7 w-7 text-muted hover:text-ink hover:bg-surface-card"
                  title="Settings & AI Provider"
                  aria-label="Settings & AI Provider"
                >
                  <Settings className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5">
              <img
                src="/azeempic.jpeg"
                alt="Azeem Ahmad"
                className="h-7 w-7 shrink-0 rounded-full object-cover object-[40%_20%] border border-primary mb-0.5"
                title="Azeem Ahmad"
              />
              {onToggleTheme && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleTheme}
                  className="w-full text-muted hover:text-ink hover:bg-surface-card"
                  title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4 text-[#e8a55a]" />
                  ) : (
                    <Moon className="h-4 w-4 text-primary" />
                  )}
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={onOpenSettings}
                className="w-full text-muted hover:text-ink hover:bg-surface-card"
                title="Settings & AI Provider"
                aria-label="Settings & AI Provider"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Clear All Confirmation Dialog */}
      <Dialog
        isOpen={confirmClearOpen}
        onClose={() => setConfirmClearOpen(false)}
        title="Clear All Conversations"
        description="Are you sure you want to remove all saved conversation history from your browser? This action cannot be undone."
      >
        <div className="mt-4 flex justify-end gap-2.5">
          <Button
            variant="outline"
            onClick={() => setConfirmClearOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onClearAll();
              setConfirmClearOpen(false);
            }}
          >
            Clear All History
          </Button>
        </div>
      </Dialog>
    </>
  );
}
