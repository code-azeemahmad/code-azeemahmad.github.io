import * as React from "react";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Key, ShieldCheck, Trash2, ExternalLink, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { SUPPORTED_PROVIDERS, type LLMProviderId } from "@/lib/ai/types";

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProvider: LLMProviderId;
  apiKey: string;
  onSaveSettings: (provider: LLMProviderId, key: string) => void;
  onClearKey: () => void;
  onClearHistory?: () => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  selectedProvider,
  apiKey,
  onSaveSettings,
  onClearKey,
  onClearHistory,
}: SettingsModalProps) {
  const [provider, setProvider] = React.useState<LLMProviderId>(selectedProvider);
  const [keyInput, setKeyInput] = React.useState(apiKey);
  const [showKey, setShowKey] = React.useState(false);

  React.useEffect(() => {
    setProvider(selectedProvider);
    setKeyInput(apiKey);
  }, [selectedProvider, apiKey, isOpen]);

  const activeProviderConfig = SUPPORTED_PROVIDERS[provider];

  const handleSave = () => {
    onSaveSettings(provider, keyInput.trim());
    onClose();
  };

  const handleClear = () => {
    setKeyInput("");
    onClearKey();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Settings & AI Provider (BYOK)"
      description="Connect your personal LLM API key for live AI conversations or explore with verified local answers."
    >
      <div className="space-y-5 text-sm text-[#3d3d3a]">
        {/* BYOK Configuration Section */}
        <div className="rounded-xl border border-[#e6dfd8] bg-[#efe9de] p-4 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium text-[#141413]">
              <Key className="h-4 w-4 text-[#cc785c]" />
              <span>Bring Your Own Key (BYOK)</span>
            </div>
            {apiKey ? (
              <Badge variant="success" className="text-[10px]">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Live Key Active
              </Badge>
            ) : (
              <Badge variant="outline" className="text-[10px]">
                Portfolio Mode
              </Badge>
            )}
          </div>

          <p className="text-xs text-[#6c6a64] leading-relaxed">
            By default, the portfolio answers questions accurately using local knowledge retrieval.
            To enable dynamic live streaming with modern reasoning models, choose a provider below.
          </p>

          {/* Provider Selection */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-medium text-[#141413]">
              Select Provider
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {(Object.keys(SUPPORTED_PROVIDERS) as LLMProviderId[]).map((pId) => {
                const conf = SUPPORTED_PROVIDERS[pId];
                const isSelected = provider === pId;

                return (
                  <button
                    key={pId}
                    type="button"
                    onClick={() => setProvider(pId)}
                    className={`flex items-center justify-between rounded-lg border p-2.5 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "border-[#cc785c] bg-[#e8e0d2] text-[#141413] font-medium shadow-xs"
                        : "border-[#e6dfd8] bg-[#faf9f5] text-[#3d3d3a] hover:bg-[#efe9de] hover:border-[#d4cbbe]"
                    }`}
                  >
                    <div>
                      <div className="font-medium">{conf.name}</div>
                      <div className="text-[10px] text-[#6c6a64]">{conf.defaultModel}</div>
                    </div>
                    {isSelected && (
                      <span className="h-2 w-2 rounded-full bg-[#cc785c]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* API Key Input */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs">
              <label className="font-medium text-[#141413]">
                {activeProviderConfig.name} API Key
              </label>
              <a
                href={activeProviderConfig.helpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-[#cc785c] hover:underline"
              >
                <span>Get key</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>

            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder={activeProviderConfig.placeholder}
                className="w-full rounded-lg border border-[#e6dfd8] bg-[#faf9f5] px-3 py-2 pr-9 text-xs text-[#141413] placeholder:text-[#8e8b82] focus:border-[#cc785c] focus:outline-none focus:ring-2 focus:ring-[#cc785c]/20"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2.5 top-2.5 text-[#8e8b82] hover:text-[#141413] transition-colors"
                title={showKey ? "Hide key" : "Show key"}
              >
                {showKey ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Security & Privacy Notice */}
        <div className="rounded-xl border border-[#e6dfd8] bg-[#f5f0e8] p-3.5 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-[#5db8a6] shrink-0 mt-0.5" />
          <div className="text-xs text-[#3d3d3a] leading-relaxed">
            <div className="font-medium text-[#141413] mb-0.5">In-Memory Security Guarantee</div>
            Your API key is never written to disk, <code className="rounded bg-[#efe9de] border border-[#e6dfd8] px-1 py-0.5 text-[10px]">localStorage</code>, or transmitted to any server other than your selected provider directly from your browser. Closing or reloading the tab purges the key immediately.
          </div>
        </div>

        {/* Local Storage & History Actions */}
        {onClearHistory && (
          <div className="rounded-xl border border-[#e6dfd8] bg-[#faf9f5] p-3.5 flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-[#141413]">Local Conversation History</div>
              <div className="text-[11px] text-[#6c6a64]">Stored in your browser's private storage</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onClearHistory();
                onClose();
              }}
              className="text-[#c64545] hover:bg-[#efe9de] text-xs h-8 border-[#e6dfd8]"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Clear History
            </Button>
          </div>
        )}

        {/* Dialog Actions */}
        <div className="flex items-center justify-between pt-2">
          {keyInput ? (
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-[#6c6a64] hover:text-[#c64545] transition-colors cursor-pointer"
            >
              Remove key
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleSave}>
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
