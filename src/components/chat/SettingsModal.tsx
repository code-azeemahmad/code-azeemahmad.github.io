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
      description="Connect your own LLM API key for live AI conversations or explore with verified local answers."
    >
      <div className="space-y-6 text-sm text-neutral-300">
        {/* BYOK Configuration Section */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium text-neutral-100">
              <Key className="h-4 w-4 text-blue-400" />
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

          <p className="text-xs text-neutral-400 leading-relaxed">
            By default, the portfolio answers questions accurately using local knowledge retrieval.
            To enable dynamic live streaming with modern reasoning models, choose a provider below.
          </p>

          {/* Provider Selection */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-medium text-neutral-300">
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
                        ? "border-blue-500/50 bg-blue-500/10 text-blue-300 font-medium"
                        : "border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700"
                    }`}
                  >
                    <div>
                      <div>{conf.name}</div>
                      <div className="text-[10px] text-neutral-500">{conf.defaultModel}</div>
                    </div>
                    {isSelected && (
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0 ml-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Key Input */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="api-key-input"
                className="text-xs font-medium text-neutral-300"
              >
                {activeProviderConfig.name} API Key
              </label>
              <a
                href={activeProviderConfig.helpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:underline"
              >
                <span>Get a key</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>

            <div className="relative">
              <input
                id="api-key-input"
                type={showKey ? "text" : "password"}
                placeholder={activeProviderConfig.placeholder}
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 pr-9 text-xs text-neutral-100 placeholder:text-neutral-600 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2.5 top-2.5 text-neutral-500 hover:text-neutral-300"
                aria-label={showKey ? "Hide key" : "Show key"}
              >
                {showKey ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>

            <div className="flex items-center justify-between pt-1 text-[10px] text-neutral-500">
              <span>Keys remain in memory and are never sent to any intermediary server.</span>
              {keyInput && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-red-400 hover:underline ml-2"
                >
                  Clear Key
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Privacy & Security Notice */}
        <div className="rounded-xl border border-neutral-800/80 bg-neutral-950/40 p-4 space-y-2">
          <div className="flex items-center gap-2 font-medium text-xs text-neutral-200">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Privacy Disclosure</span>
          </div>
          <ul className="text-xs text-neutral-400 space-y-1 list-disc list-inside leading-relaxed">
            <li>Requests go directly from your browser to {activeProviderConfig.name}'s API.</li>
            <li>No analytics or backend services proxy or record your credentials.</li>
            <li>Closing this tab automatically unloads the in-memory key.</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearHistory}
            className="text-xs text-neutral-400 hover:text-red-400 hover:bg-red-500/10 gap-1.5"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear Local History</span>
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleSave} className="px-5">
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
