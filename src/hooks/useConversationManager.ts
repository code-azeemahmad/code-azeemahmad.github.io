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
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Load from localStorage on mount
  React.useEffect(() => {
    const { conversations: storedConversations, activeConversationId: storedActiveId } =
      loadStoredConversations();

    setConversations(storedConversations);
    setActiveConversationId(storedActiveId);
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

  const startNewConversation = React.useCallback((): string => {
    // 1. Idempotency: If currently active conversation is already empty, stay on it!
    if (
      activeConversation &&
      activeConversation.messages.length === 0 &&
      !activeConversation.isFeaturedFork
    ) {
      return activeConversation.id;
    }

    // 2. Redundancy: If an empty conversation draft already exists, activate and reuse it
    const existingEmpty = conversations.find(
      (c) => c.messages.length === 0 && !c.isFeaturedFork
    );
    if (existingEmpty) {
      setActiveConversationId(existingEmpty.id);
      return existingEmpty.id;
    }

    // 3. Otherwise create a single new conversation and prune any empty ones
    const id = `conv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const newConv: Conversation = {
      id,
      title: "New Conversation",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
    };

    setConversations((prev) => [
      newConv,
      ...prev.filter((c) => c.messages.length > 0 || c.isFeaturedFork),
    ]);
    setActiveConversationId(id);
    return id;
  }, [activeConversation, conversations]);

  const forkFeaturedTemplate = React.useCallback(
    (template: FeaturedChatTemplate): string => {
      // 1. Idempotency: If currently active conversation is an unmodified fork of this template, stay on it!
      if (
        activeConversation &&
        activeConversation.featuredTopicId === template.id &&
        activeConversation.messages.length === template.messages.length
      ) {
        return activeConversation.id;
      }

      // 2. Redundancy: If an unmodified fork of this template already exists in conversations, activate it
      const existingFork = conversations.find(
        (c) =>
          c.featuredTopicId === template.id &&
          c.messages.length === template.messages.length
      );
      if (existingFork) {
        setActiveConversationId(existingFork.id);
        return existingFork.id;
      }

      // 3. Otherwise create a fresh fork and prune any empty drafts
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

      setConversations((prev) => [
        newConv,
        ...prev.filter((c) => c.messages.length > 0 || c.isFeaturedFork),
      ]);
      setActiveConversationId(id);
      return id;
    },
    [activeConversation, conversations]
  );

  const selectConversation = React.useCallback((id: string) => {
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
      setConversations((prev) => {
        const updated = prev.filter((c) => c.id !== id);
        return updated;
      });

      setActiveConversationId((currentActiveId) => {
        if (currentActiveId === id) {
          return null;
        }
        return currentActiveId;
      });
    },
    []
  );

  const clearAllConversations = React.useCallback(() => {
    setConversations([]);
    setActiveConversationId(null);
  }, []);

  const addMessageToActive = React.useCallback(
    (msg: Omit<ChatMessage, "id" | "timestamp">): ChatMessage => {
      const newMsg: ChatMessage = {
        ...msg,
        id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        timestamp: Date.now(),
      };

      setConversations((prev) => {
        // If there's an active conversation, append to it
        if (activeConversationId) {
          const exists = prev.some((c) => c.id === activeConversationId);
          if (exists) {
            return prev.map((c) => {
              if (c.id === activeConversationId) {
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
        }

        // Otherwise create a new conversation immediately
        const newId = `conv-${Date.now()}`;
        const initialTitle =
          newMsg.role === "user"
            ? generateConversationTitle(newMsg.content)
            : "New Conversation";

        const newConv: Conversation = {
          id: newId,
          title: initialTitle,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          messages: [newMsg],
        };

        setActiveConversationId(newId);
        return [
          newConv,
          ...prev.filter((c) => c.messages.length > 0 || c.isFeaturedFork),
        ];
      });

      return newMsg;
    },
    [activeConversationId]
  );

  const updateAssistantMessage = React.useCallback(
    (messageId: string, content: string) => {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeConversationId) {
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
    [activeConversationId]
  );

  const exportActiveConversation = React.useCallback(
    (format: "json" | "markdown") => {
      if (!activeConversation) return;

      if (format === "json") {
        exportConversationAsJson(activeConversation);
      } else {
        exportConversationAsMarkdown(activeConversation);
      }
    },
    [activeConversation]
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
