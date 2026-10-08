import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  tool: z.enum(["email", "notes", "planner"]),
  prompt: z.string().min(1).max(20000),
});

const SYSTEM: Record<string, string> = {
  email:
    "You are WorkWise, a professional workplace email writer. Write a complete email from the user's details, matching the requested audience and tone. Output plain text only (no markdown symbols like ** or #) in exactly this format:\nSubject: <subject line>\n\n<email body with greeting and sign-off>",
  notes:
    "You are WorkWise, a meeting notes summariser. Use only information present in the notes; never invent facts. Write \"Not stated\" for any missing item, owner or deadline. Output plain text only (no markdown symbols like ** or #) in exactly this format:\nSUMMARY\n<2-3 sentences>\n\nKEY POINTS\n- ...\n\nDECISIONS\n- ...\n\nACTION ITEMS\n- <task> | Owner: <name or Not stated> | Deadline: <date or Not stated>",
  planner:
    "You are WorkWise, a productivity planner. Build a prioritised plan that fits within the hours available for the chosen period (daily or weekly), ordering tasks by deadline urgency and importance, with time estimates. Output plain text only (no markdown symbols like ** or #) in exactly this format:\nPRIORITISED PLAN\n1. <task> (<time estimate>, <when>) - Reason: <one line>\n...\n\nTIME-SAVING TIPS\n1. ...\n2. ...",
};

export const generateAI = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { ok: false as const, error: "AI service is not configured." };

    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        instructions: SYSTEM[data.tool],
        input: data.prompt,
        reasoning: { effort: "low" },
        store: false,
        stream: true,
      }),
    });

    if (!res.ok || !res.body) {
      let msg = "Something went wrong generating your result. Please try again.";
      if (res.status === 429) msg = "Too many requests right now. Please wait a moment and try again.";
      if (res.status === 402) msg = "AI credits have run out for this workspace.";
      try {
        const j = await res.json();
        if (res.status === 403 && j?.error?.message) msg = j.error.message;
      } catch {}
      return { ok: false as const, error: msg };
    }

    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "";
    let text = "";
    let failed = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const frames = buf.split("\n\n");
      buf = frames.pop() ?? "";
      for (const f of frames) {
        for (const line of f.split("\n")) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const ev = JSON.parse(payload);
            if (ev.type === "response.output_text.delta") text += ev.delta ?? "";
            if (ev.type === "response.failed" || ev.type === "error")
              failed = ev.error?.message || ev.response?.error?.message || "Generation failed.";
          } catch {}
        }
      }
    }
    if (failed && !text) return { ok: false as const, error: failed };
    if (!text.trim()) return { ok: false as const, error: "The AI returned no content. Please try again." };
    return { ok: true as const, text: text.trim() };
  });
