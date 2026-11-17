import * as React from "react";
import type { Conversation, ChatMessage } from "@/types/chat";
import type { FeaturedChatTemplate } from "@/types/portfolio";
import {
  loadStoredConversations,
  saveStoredConversations,
  generateConversationTitle,
  exportConversationAsJson,
  exportConversationAsMarkdown,
} from "@/lib/storage/conversationStorage";

export function useConversationManager() {
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = React.useState<string | null>(null);
  const activeConversationIdRef = React.useRef<string | null>(activeConversationId);
  activeConversationIdRef.current = activeConversationId;

  const [searchQuery, setSearchQuery] = React.useState("");
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Load from localStorage on mount
  React.useEffect(() => {
    const { conversations: storedConversations, activeConversationId: storedActiveId } =
      loadStoredConversations();

    setConversations(storedConversations);
    setActiveConversationId(storedActiveId);
    activeConversationIdRef.current = storedActiveId;
    setIsInitialized(true);
  }, []);

  // Save to localStorage when conversations or active id changes (after initial load)
  React.useEffect(() => {
    if (!isInitialized) return;
    saveStoredConversations(conversations, activeConversationId);
  }, [conversations, activeConversationId, isInitialized]);

  const activeConversation = React.useMemo(() => {
    return conversations.find((c) => c.id === activeConversationId) || null;
  }, [conversations, activeConversationId]);

  const savedConversations = React.useMemo(() => {
    // Only display conversations that have actual messages or are featured template forks
    return conversations.filter(
      (c) => c.messages.length > 0 || c.isFeaturedFork
    );
  }, [conversations]);

  const filteredConversations = React.useMemo(() => {
    const list = savedConversations;
    if (!searchQuery.trim()) return list;
    const query = searchQuery.toLowerCase();
    return list.filter(
      (c) =>
        c.title.toLowerCase().includes(query) ||
        c.messages.some((m) => m.content.toLowerCase().includes(query))
    );
  }, [savedConversations, searchQuery]);

  /**
   * Idempotent New Conversation handler:
   * If already on the new conversation page (no active chat or chat with 0 messages),
   * stays on the page without creating redundant empty chats.
   */
  const startNewConversation = React.useCallback((): string | null => {
    const currentId = activeConversationIdRef.current;
    if (!currentId) {
      return null;
    }

    const currentActive = conversations.find((c) => c.id === currentId);
    if (currentActive && currentActive.messages.length === 0 && !currentActive.isFeaturedFork) {
      return currentId;
    }

    // Switch to clean new conversation page and prune any empty drafts
    activeConversationIdRef.current = null;
    setActiveConversationId(null);
    setConversations((prev) =>
      prev.filter((c) => c.messages.length > 0 || c.isFeaturedFork)
    );
    return null;
  }, [conversations]);

  /**
   * Idempotent Featured Template Fork handler:
   * Reuses existing unmodified forks of the same template rather than creating duplicates.
   */
  const forkFeaturedTemplate = React.useCallback(
    (template: FeaturedChatTemplate): string => {
      const currentId = activeConversationIdRef.current;
      const currentActive = conversations.find((c) => c.id === currentId);
      if (
        currentActive &&
        currentActive.featuredTopicId === template.id &&
        currentActive.messages.length === template.messages.length
      ) {
        return currentActive.id;
      }

      const existingFork = conversations.find(
        (c) =>
          c.featuredTopicId === template.id &&
          c.messages.length === template.messages.length
      );
      if (existingFork) {
        activeConversationIdRef.current = existingFork.id;
        setActiveConversationId(existingFork.id);
        return existingFork.id;
      }

      const id = `fork-${template.id}-${Date.now()}`;
      const forkedMessages: ChatMessage[] = template.messages.map((m, idx) => ({
        id: `msg-${Date.now()}-${idx}`,
        role: m.role,
        content: m.content,
        timestamp: Date.now() + idx,
      }));

      const newConv: Conversation = {
        id,
        title: template.title,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        messages: forkedMessages,
        isFeaturedFork: true,
        featuredTopicId: template.id,
      };

      activeConversationIdRef.current = id;
      setActiveConversationId(id);
      setConversations((prev) => [
        newConv,
        ...prev.filter((c) => c.messages.length > 0 || c.isFeaturedFork),
      ]);
      return id;
    },
    [conversations]
  );

  const selectConversation = React.useCallback((id: string) => {
    if (activeConversationIdRef.current === id) return;
    activeConversationIdRef.current = id;
    setActiveConversationId(id);
  }, []);

  const renameConversation = React.useCallback(
    (id: string, newTitle: string) => {
      const trimmed = newTitle.trim();
      if (!trimmed) return;

      setConversations((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, title: trimmed, updatedAt: Date.now() }
            : c
        )
      );
    },
    []
  );

  const deleteConversation = React.useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeConversationIdRef.current === id) {
        activeConversationIdRef.current = null;
        setActiveConversationId(null);
      }
    },
    []
  );

  const clearAllConversations = React.useCallback(() => {
    activeConversationIdRef.current = null;
    setActiveConversationId(null);
    setConversations([]);
  }, []);

  const addMessageToActive = React.useCallback(
    (msg: Omit<ChatMessage, "id" | "timestamp">): ChatMessage => {
      const newMsg: ChatMessage = {
        ...msg,
        id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        timestamp: Date.now(),
      };

      // Determine or assign the active conversation ID atomically
      let targetConvId = activeConversationIdRef.current;

      if (!targetConvId) {
        targetConvId = `conv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        activeConversationIdRef.current = targetConvId;
        setActiveConversationId(targetConvId);
      }

      setConversations((prev) => {
        const exists = prev.some((c) => c.id === targetConvId);
        if (exists) {
          return prev.map((c) => {
            if (c.id === targetConvId) {
              const isFirstUserMessage =
                c.messages.length === 0 && newMsg.role === "user";
              const title =
                isFirstUserMessage && c.title === "New Conversation"
                  ? generateConversationTitle(newMsg.content)
                  : c.title;

              return {
                ...c,
                title,
                updatedAt: Date.now(),
                messages: [...c.messages, newMsg],
              };
            }
            return c;
          });
        }

        // If it doesn't exist yet in prev, create it with this message
        const initialTitle =
          newMsg.role === "user"
            ? generateConversationTitle(newMsg.content)
            : "New Conversation";

        const newConv: Conversation = {
          id: targetConvId!,
          title: initialTitle,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          messages: [newMsg],
        };

        return [
          newConv,
          ...prev.filter((c) => c.messages.length > 0 || c.isFeaturedFork),
        ];
      });

      return newMsg;
    },
    []
  );

  const updateAssistantMessage = React.useCallback(
    (messageId: string, content: string) => {
      const activeId = activeConversationIdRef.current;
      if (!activeId) return;

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeId) {
            return {
              ...c,
              updatedAt: Date.now(),
              messages: c.messages.map((m) =>
                m.id === messageId ? { ...m, content } : m
              ),
            };
          }
          return c;
        })
      );
    },
    []
  );

  const exportActiveConversation = React.useCallback(
    (format: "json" | "markdown") => {
      const activeId = activeConversationIdRef.current;
      const currentActive = conversations.find((c) => c.id === activeId);
      if (!currentActive || currentActive.messages.length === 0) return;

      if (format === "json") {
        exportConversationAsJson(currentActive);
      } else {
        exportConversationAsMarkdown(currentActive);
      }
    },
    [conversations]
  );

  return {
    conversations,
    activeConversationId,
    activeConversation,
    searchQuery,
    setSearchQuery,
    filteredConversations,
    isInitialized,
    startNewConversation,
    forkFeaturedTemplate,
    selectConversation,
    renameConversation,
    deleteConversation,
    clearAllConversations,
    addMessageToActive,
    updateAssistantMessage,
    exportActiveConversation,
  };
}
