import { useState, type ReactNode } from "react";
import { Copy, Check, Loader2, Sparkle, AlertCircle } from "lucide-react";
import { generateAI } from "@/lib/ai.functions";

export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <div className="mb-2 text-sm font-medium">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              value === o ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-muted"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export const fieldClass =
  "w-full rounded-lg border bg-card px-3.5 py-3 text-sm outline-none transition focus:border-foreground/40 focus:ring-2 focus:ring-ring/30";

export function ToolLayout({
  tool,
  inputs,
  buildPrompt,
  canSubmit,
}: {
  tool: "email" | "notes" | "planner";
  inputs: ReactNode;
  buildPrompt: () => string;
  canSubmit: boolean;
}) {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const run = async () => {
    setLoading(true);
    setError("");
    try {
      const r = await generateAI({ data: { tool, prompt: buildPrompt() } });
      if (r.ok) setOutput(r.text);
      else setError(r.error);
    } catch {
      setError("Couldn't reach the AI service. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="flex flex-col gap-5 rounded-2xl border bg-card p-6 shadow-soft">
        <h2 className="font-semibold">Input</h2>
        {inputs}
        <button
          onClick={run}
          disabled={!canSubmit || loading}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkle className="h-4 w-4" />}
          {loading ? "Generating…" : "Generate"}
        </button>
      </section>

      <section className="flex min-h-[420px] flex-col rounded-2xl border bg-card p-6 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Output</h2>
          <button
            onClick={copy}
            disabled={!output}
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-40"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        {error && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-foreground/20 bg-muted p-3 text-sm">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
          </div>
        )}
        {loading ? (
          <div className="flex-1 space-y-3">
            {[90, 75, 85, 60, 80, 40].map((w, i) => (
              <div key={i} className="h-3.5 animate-pulse rounded bg-muted" style={{ width: `${w}%` }} />
            ))}
          </div>
        ) : output ? (
          <textarea
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            aria-label="Editable AI output"
            className={`${fieldClass} min-h-[340px] flex-1 resize-y leading-relaxed`}
          />
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            Your AI-generated result will appear here.
          </div>
        )}
        {output && !loading && <p className="mt-2 text-xs text-muted-foreground">You can edit the result directly.</p>}
      </section>
    </div>
  );
}
