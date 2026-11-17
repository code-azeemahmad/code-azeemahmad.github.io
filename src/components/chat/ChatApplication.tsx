import * as React from "react";
import { Sidebar } from "./sidebar/Sidebar";
import { MobileDrawer } from "./sidebar/MobileDrawer";
import { ChatHeader } from "./ChatHeader";
import { WelcomeScreen } from "./welcome/WelcomeScreen";
import { ChatComposer } from "./input/ChatComposer";
import { SettingsModal } from "./SettingsModal";
import { MessageItem } from "./messages/MessageItem";
import { SpikeMark } from "@/components/ui/SpikeMark";
import { ArrowRight } from "lucide-react";
import { getFeaturedChatById } from "@/data";
import { useConversationManager } from "@/hooks/useConversationManager";
import { useTheme } from "@/hooks/useTheme";
import { executeChatStream } from "@/lib/ai/chatOrchestrator";
import { SUPPORTED_PROVIDERS, type LLMProviderId } from "@/lib/ai/types";

export function ChatApplication() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // Theme hook: default is dark, persisted in localStorage
  const { theme, toggleTheme } = useTheme();

  // In-memory BYOK provider credentials
  const [selectedProvider, setSelectedProvider] = React.useState<LLMProviderId>("gemini");
  const [apiKey, setApiKey] = React.useState<string>("");

  const abortControllerRef = React.useRef<AbortController | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const {
    activeConversation,
    activeConversationId,
    searchQuery,
    setSearchQuery,
    filteredConversations,
    startNewConversation,
    forkFeaturedTemplate,
    selectConversation,
    renameConversation,
    deleteConversation,
    clearAllConversations,
    addMessageToActive,
    updateAssistantMessage,
    exportActiveConversation,
  } = useConversationManager();

  const messages = activeConversation?.messages || [];

  // Auto-scroll to bottom of conversation
  React.useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const handleNewChat = () => {
    if (isLoading) {
      handleStop();
    }
    startNewConversation();
    setInputValue("");
    setIsMobileDrawerOpen(false);
  };

  const handleSelectFeaturedTopic = (topicId: string) => {
    if (isLoading) {
      handleStop();
    }
    setIsMobileDrawerOpen(false);
    const template = getFeaturedChatById(topicId);

    if (template) {
      forkFeaturedTemplate(template);
    } else {
      startNewConversation();
      handleSendMessage(`Tell me about ${topicId}`);
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // 1. Add user message
    addMessageToActive({
      role: "user",
      content: content.trim(),
    });

    setInputValue("");
    setIsLoading(true);

    // 2. Prepare assistant placeholder message
    const placeholderMsg = addMessageToActive({
      role: "assistant",
      content: "",
    });

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    let accumulatedText = "";

    try {
      const result = await executeChatStream({
        userQuery: content.trim(),
        history: messages.map((m) => ({ role: m.role, content: m.content })),
        providerId: selectedProvider,
        apiKey: apiKey.trim(),
        signal: abortController.signal,
        onToken: (token) => {
          accumulatedText += token;
          updateAssistantMessage(placeholderMsg.id, accumulatedText);
        },
      });

      // Update final content with citations
      updateAssistantMessage(placeholderMsg.id, result.content);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        // User voluntarily stopped generation
        if (!accumulatedText) {
          updateAssistantMessage(
            placeholderMsg.id,
            "*(Generation stopped by user)*"
          );
        }
      } else {
        const errorMsg =
          err instanceof Error
            ? err.message
            : "An unexpected error occurred while contacting the AI provider.";

        updateAssistantMessage(
          placeholderMsg.id,
          `⚠️ **Provider Error**: ${errorMsg}\n\n*Check your API key in Settings or clear it to use the built-in verified portfolio responder.*`
        );
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const activeTemplate = activeConversation?.featuredTopicId
    ? getFeaturedChatById(activeConversation.featuredTopicId)
    : null;

  const currentProviderConfig = SUPPORTED_PROVIDERS[selectedProvider];

  return (
    <div className="flex h-screen h-[100dvh] w-full overflow-hidden bg-canvas text-ink antialiased font-sans transition-colors">
      {/* Desktop Collapsible Sidebar */}
      <div className="hidden md:flex md:shrink-0">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
          activeTopicId={activeConversation?.featuredTopicId || null}
          activeConversationId={activeConversationId}
          conversations={filteredConversations}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectTopic={handleSelectFeaturedTopic}
          onSelectConversation={(id) => {
            selectConversation(id);
          }}
          onNewChat={handleNewChat}
          onRenameConversation={renameConversation}
          onDeleteConversation={deleteConversation}
          onClearAll={clearAllConversations}
          onOpenSettings={() => setIsSettingsOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      </div>

      {/* Mobile Slide-over Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      >
        <Sidebar
          isMobile={true}
          isCollapsed={false}
          onToggleCollapse={() => setIsMobileDrawerOpen(false)}
          activeTopicId={activeConversation?.featuredTopicId || null}
          activeConversationId={activeConversationId}
          conversations={filteredConversations}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectTopic={handleSelectFeaturedTopic}
          onSelectConversation={(id) => {
            selectConversation(id);
            setIsMobileDrawerOpen(false);
          }}
          onNewChat={handleNewChat}
          onRenameConversation={renameConversation}
          onDeleteConversation={deleteConversation}
          onClearAll={clearAllConversations}
          onOpenSettings={() => {
            setIsMobileDrawerOpen(false);
            setIsSettingsOpen(true);
          }}
          theme={theme}
          onToggleTheme={toggleTheme}
          className="w-full border-r-0"
        />
      </MobileDrawer>

      {/* Main Conversation Workspace */}
      <div className="flex flex-1 flex-col h-full overflow-hidden bg-canvas transition-colors">
        <ChatHeader
          title={
            activeConversation?.title ||
            (apiKey ? `Azeem Ahmad • Live AI (${currentProviderConfig.name})` : "Azeem Ahmad")
          }
          hasMessages={messages.length > 0}
          isLiveAIEnabled={!!apiKey.trim()}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenMobileMenu={() => setIsMobileDrawerOpen(true)}
          onNewChat={handleNewChat}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onExportMarkdown={() => exportActiveConversation("markdown")}
          onExportJson={() => exportActiveConversation("json")}
          onDeleteCurrentChat={() => {
            if (activeConversationId) {
              deleteConversation(activeConversationId);
            }
          }}
        />

        {/* Message Scroll Area / Welcome Screen */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <WelcomeScreen
              onSelectPrompt={(prompt) => {
                if (prompt.includes("project")) {
                  handleSelectFeaturedTopic("projects");
                } else if (
                  prompt.includes("background") ||
                  prompt.includes("About")
                ) {
                  handleSelectFeaturedTopic("about-me");
                } else if (
                  prompt.includes("skill") ||
                  prompt.includes("Technologies")
                ) {
                  handleSelectFeaturedTopic("skills");
                } else if (
                  prompt.includes("contact") ||
                  prompt.includes("Opportunities")
                ) {
                  handleSelectFeaturedTopic("contact");
                } else {
                  handleSendMessage(prompt);
                }
              }}
            />
          ) : (
            <div className="mx-auto max-w-3xl px-4 py-6 space-y-6">
              {messages.map((message) => (
                <MessageItem key={message.id} message={message} />
              ))}

              {isLoading && !messages[messages.length - 1]?.content && (
                <div className="flex items-start gap-3.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-card border border-hairline text-primary shadow-xs">
                    <SpikeMark className="h-4 w-4" />
                  </div>
                  <div className="rounded-xl border border-hairline bg-surface-card px-4 py-3 text-sm text-muted shadow-xs">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      <span>
                        {apiKey
                          ? `Streaming live response from ${currentProviderConfig.name}...`
                          : "Searching portfolio knowledge base..."}
                      </span>
                    </span>
                  </div>
                </div>
              )}

              {/* Follow-up suggestions from active template */}
              {activeTemplate && activeTemplate.suggestedQuestions && (
                <div className="pt-3">
                  <div className="text-[11px] font-medium text-muted mb-2 uppercase tracking-wider">
                    Suggested Questions
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeTemplate.suggestedQuestions.map((question, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(question)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-surface-card px-3 py-1.5 text-xs text-ink hover:bg-surface-cream-strong transition-colors cursor-pointer text-left shadow-xs font-normal"
                      >
                        <span>{question}</span>
                        <ArrowRight className="h-3 w-3 text-primary" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Bottom Composer Dock */}
        <ChatComposer
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSendMessage}
          isLoading={isLoading}
          onStop={handleStop}
        />
      </div>

      {/* Settings & BYOK Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        selectedProvider={selectedProvider}
        apiKey={apiKey}
        onSaveSettings={(prov, key) => {
          setSelectedProvider(prov);
          setApiKey(key);
        }}
        onClearKey={() => setApiKey("")}
        onClearHistory={clearAllConversations}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
}

export default ChatApplication;
