import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ToolLayout, fieldClass } from "@/components/ToolLayout";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summariser — WorkWise" },
      { name: "description", content: "Turn raw meeting notes into a summary, key points, decisions and action items." },
      { property: "og:title", content: "Meeting Notes Summariser — WorkWise" },
      { property: "og:description", content: "Turn raw meeting notes into a summary, key points, decisions and action items." },
    ],
  }),
  component: MeetingsPage,
});

function MeetingsPage() {
  const [notes, setNotes] = useState("");
  return (
    <AppShell title="Meeting Notes Summariser" subtitle="Paste your notes to get a summary, decisions and action items.">
      <ToolLayout
        tool="notes"
        canSubmit={notes.trim().length > 0}
        buildPrompt={() => `Meeting notes:\n${notes}`}
        inputs={
          <div>
            <label htmlFor="notes" className="mb-2 block text-sm font-medium">Meeting notes</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={14}
              placeholder="Paste your meeting notes here…"
              className={fieldClass}
            />
          </div>
        }
      />
    </AppShell>
  );
}
