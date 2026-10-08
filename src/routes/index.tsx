import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ToolLayout, Segmented, fieldClass } from "@/components/ToolLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Email Generator — WorkWise" },
      { name: "description", content: "Draft professional workplace emails with AI, tailored to audience and tone." },
      { property: "og:title", content: "Email Generator — WorkWise" },
      { property: "og:description", content: "Draft professional workplace emails with AI, tailored to audience and tone." },
    ],
  }),
  component: EmailPage,
});

const AUDIENCES = ["Client", "Manager", "Team"] as const;
const TONES = ["Formal", "Informal", "Persuasive"] as const;

function EmailPage() {
  const [details, setDetails] = useState("");
  const [audience, setAudience] = useState<(typeof AUDIENCES)[number]>("Client");
  const [tone, setTone] = useState<(typeof TONES)[number]>("Formal");
  return (
    <AppShell title="Email Generator" subtitle="Describe what you need to say and get a ready-to-send email.">
      <ToolLayout
        tool="email"
        canSubmit={details.trim().length > 0}
        buildPrompt={() => `Audience: ${audience}\nTone: ${tone}\nEmail details:\n${details}`}
        inputs={
          <>
            <div>
              <label htmlFor="details" className="mb-2 block text-sm font-medium">Email details</label>
              <textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={8}
                placeholder="e.g. Follow up on last week's proposal, confirm the new delivery date of 20 October and ask for sign-off."
                className={fieldClass}
              />
            </div>
            <Segmented label="Audience" options={AUDIENCES} value={audience} onChange={setAudience} />
            <Segmented label="Tone" options={TONES} value={tone} onChange={setTone} />
          </>
        }
      />
    </AppShell>
  );
}
