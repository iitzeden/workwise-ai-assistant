import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Mail, NotebookPen, ListChecks, Menu, X, ShieldCheck, Briefcase } from "lucide-react";

export const DISCLAIMER =
  "AI can make mistakes. Review all output before use and do not share sensitive personal or company data.";

const NAV = [
  { to: "/", label: "Email Generator", icon: Mail },
  { to: "/meetings", label: "Meeting Notes", icon: NotebookPen },
  { to: "/planner", label: "Task Planner", icon: ListChecks },
] as const;

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
          <Briefcase className="h-5 w-5" />
        </div>
        <div>
          <div className="text-lg font-semibold tracking-tight">WorkWise</div>
          <div className="text-xs text-sidebar-foreground/60">AI Workplace Assistant</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {NAV.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            activeOptions={{ exact: true }}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
            activeProps={{ className: "!bg-sidebar-primary !text-sidebar-primary-foreground" }}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="m-3 rounded-xl border border-sidebar-border bg-sidebar-accent p-4">
        <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold">
          <ShieldCheck className="h-3.5 w-3.5" /> Responsible AI
        </div>
        <p className="text-xs leading-relaxed text-sidebar-foreground/60">{DISCLAIMER}</p>
      </div>
    </div>
  );
}

export function AppShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 bg-sidebar text-sidebar-foreground lg:block">
        <SidebarContent />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/50 animate-in fade-in" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-sidebar text-sidebar-foreground shadow-2xl animate-in slide-in-from-left duration-200">
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-lg p-2 text-sidebar-foreground/70 hover:bg-sidebar-accent"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 flex items-center gap-3 border-b bg-background/90 px-4 py-3 backdrop-blur lg:hidden">
          <button aria-label="Open menu" onClick={() => setOpen(true)} className="rounded-lg p-2 hover:bg-muted">
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-semibold">WorkWise</span>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 lg:py-12">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
          <p className="mt-1.5 text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-8 text-center text-xs text-muted-foreground lg:hidden">{DISCLAIMER}</p>
        </main>
      </div>
    </div>
  );
}
