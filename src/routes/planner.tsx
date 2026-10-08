import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ToolLayout, Segmented, fieldClass } from "@/components/ToolLayout";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Task Planner — WorkWise" },
      { name: "description", content: "Get an AI-prioritised daily or weekly plan that fits your available hours." },
      { property: "og:title", content: "Task Planner — WorkWise" },
      { property: "og:description", content: "Get an AI-prioritised daily or weekly plan that fits your available hours." },
    ],
  }),
  component: PlannerPage,
});

const PERIODS = ["Daily", "Weekly"] as const;

function PlannerPage() {
  const [tasks, setTasks] = useState("");
  const [hours, setHours] = useState("8");
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>("Daily");
  return (
    <AppShell title="Task Planner" subtitle="List your tasks and deadlines to get a prioritised plan.">
      <ToolLayout
        tool="planner"
        canSubmit={tasks.trim().length > 0 && Number(hours) > 0}
        buildPrompt={() => `Plan type: ${period}\nHours available: ${hours}\nTasks and deadlines:\n${tasks}`}
        inputs={
          <>
            <div>
              <label htmlFor="tasks" className="mb-2 block text-sm font-medium">Tasks and deadlines</label>
              <textarea
                id="tasks"
                value={tasks}
                onChange={(e) => setTasks(e.target.value)}
                rows={8}
                placeholder={"e.g.\nQuarterly report – due Friday\nReply to client queries – today\nPrepare team slides – Wednesday"}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="hours" className="mb-2 block text-sm font-medium">Hours available</label>
              <input
                id="hours"
                type="number"
                min={1}
                max={168}
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className={`${fieldClass} max-w-[160px]`}
              />
            </div>
            <Segmented label="Plan type" options={PERIODS} value={period} onChange={setPeriod} />
          </>
        }
      />
    </AppShell>
  );
}
