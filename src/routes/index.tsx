import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Eye, RefreshCw, ShieldCheck, Zap, Plug, Mic } from "lucide-react";
import { StatusBar } from "@/components/StatusBar";
import { Window } from "@/components/Window";
import { BootTerminal } from "@/components/BootTerminal";
import { PlanningLoop } from "@/components/PlanningLoop";
import { QuickStart } from "@/components/QuickStart";

const GITHUB_URL = "https://github.com/agentos";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "AgentOS — AI controls your Linux desktop" },
      {
        name: "description",
        content:
          "AgentOS gives Large Language Models the ability to see your screen, reason about it, and take action — one precise step at a time.",
      },
      { property: "og:title", content: "AgentOS — AI controls your Linux desktop" },
      {
        property: "og:description",
        content:
          "Desktop automation platform for LLMs. Multi-modal perception, iterative planning, three-tier safety.",
      },
    ],
  }),
});

const STATS = [
  ["100+", "MCP Tools"],
  ["091", "AT-SPI Tools"],
  ["016", "Test Suites"],
  ["005", "Perception Modalities"],
  ["009", "API Endpoints"],
];

const FEATURES = [
  {
    Icon: Eye,
    name: "Multi-Modal Perception",
    desc: "5 sensing modalities: screenshots, Tesseract OCR, AT-SPI accessibility tree (91 tools), NCC template matching, cursor tracking.",
  },
  {
    Icon: RefreshCw,
    name: "Iterative Planning Loop",
    desc: "Plans one action per iteration. Re-observes screen. Re-plans. Resilient to any UI change by design.",
  },
  {
    Icon: ShieldCheck,
    name: "Three-Tier Safety System",
    desc: "Every action classified: SAFE (auto-run), CAUTION (policy check), DESTRUCTIVE (user confirmation required). Full audit trail.",
  },
  {
    Icon: Zap,
    name: "Real-Time Streaming API",
    desc: "Actions, thoughts, and decisions stream live via NDJSON on port 3000. Full cancellation support.",
  },
  {
    Icon: Plug,
    name: "100+ MCP Tools",
    desc: "Model Context Protocol server on port 8765 with 100+ tools across 8 namespaces. Any LLM can connect.",
  },
  {
    Icon: Mic,
    name: "Voice Commands",
    desc: "Whisper-powered speech-to-text built into the Electron desktop app. Speak your goal, watch it happen.",
  },
];

const TEAM = [
  { initials: "AK", username: "abdullah.kapadia", name: "Abdullah Kapadia" },
  { initials: "AY", username: "ali.yahya", name: "Ali Yahya" },
  { initials: "SI", username: "syed.ansab", name: "Syed Ansab Iqbal" },
];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShown(true)),
      { threshold: 0.12 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, shown };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={shown ? "animate-fade-up" : "opacity-0"}
    >
      {children}
    </div>
  );
}

function Index() {
  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-7">
      <StatusBar />

      {/* HERO */}
      <section className="relative overflow-hidden scanlines">
        <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center min-h-[calc(100vh-7rem)]">
          <div className="lg:col-span-3 animate-fade-up">
            <Window title="agent@agentos: ~" glow>
              <BootTerminal />
            </Window>
          </div>

          <div className="lg:col-span-2 space-y-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Your Desktop.
              <br />
              <span className="glow-orange text-primary">Controlled by AI.</span>
              <span className="blink text-accent">▋</span>
            </h1>
            <p className="text-muted-foreground font-mono text-sm leading-relaxed">
              AgentOS gives Large Language Models the ability to see your screen,
              reason about it, and take action — one precise step at a time.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-mono text-sm hover:bg-[#ff6633] transition-colors border border-primary"
                style={{ borderRadius: 2 }}
              >
                ⬡ View on GitHub
              </a>
              <button
                onClick={scrollToDemo}
                className="inline-flex items-center gap-2 px-4 py-2 bg-surface text-foreground font-mono text-sm hover:bg-surface-elevated transition-colors border border-border hover:border-accent"
                style={{ borderRadius: 2 }}
              >
                ▶ Watch Demo
              </button>
            </div>

            <div className="font-mono text-sm space-y-1 pt-4 border-t border-border">
              {STATS.map(([n, l]) => (
                <div key={l} className="flex gap-4">
                  <span className="text-accent glow-blue tabular-nums w-14">{n}</span>
                  <span className="text-muted-foreground">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <Reveal>
          <div className="font-mono text-sm text-muted-foreground mb-6">
            <span className="text-success">#</span> // See AgentOS in action
          </div>
          <Window title="agent@agentos:~$ ./run_demo.sh" glow>
            <video
              src="./demo.mp4"
              controls
              className="w-full block bg-black"
              onError={(e) => {
                const v = e.currentTarget;
                v.style.display = "none";
                const next = v.nextElementSibling as HTMLElement | null;
                if (next) next.style.display = "block";
              }}
            />
            <pre
              className="hidden font-mono text-sm p-6 text-muted-foreground bg-[#0a0a0a]"
            >
{`agent@agentos:~$ ERROR: demo.mp4 not found
Please drop demo.mp4 into the project root.`}
            </pre>
          </Window>
        </Reveal>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <Reveal>
          <Window title="System Monitor — Planning Loop">
            <div className="p-6 bg-[#0f0f0f]">
              <PlanningLoop />
              <div
                className="mt-8 flex items-start gap-3 p-4 font-mono text-xs"
                style={{ background: "#1a0500", borderLeft: "3px solid #e95420" }}
              >
                <span className="text-primary text-base leading-none">⚠</span>
                <span className="text-muted-foreground leading-relaxed">
                  <span className="text-primary">SAFETY POLICY ACTIVE</span> — Destructive actions
                  (rm, sudo, shutdown, passwords) require explicit user confirmation before execution.
                  All actions are logged.
                </span>
              </div>
            </div>
          </Window>
        </Reveal>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <Reveal>
          <Window title="agentos — Features">
            <div>
              {FEATURES.map((f, i) => (
                <Reveal key={f.name} delay={i * 60}>
                  <div
                    className="group flex items-center gap-4 px-5 py-5 border-b border-border last:border-b-0 transition-colors hover:bg-surface-elevated animate-slide-in-left"
                    style={{ background: i % 2 === 0 ? "#1a1a1a" : "#1f1f1f" }}
                  >
                    <div className="w-12 flex justify-center shrink-0 text-primary glow-orange">
                      <f.Icon className="w-7 h-7" strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-foreground mb-1">{f.name}</div>
                      <div className="font-mono text-xs text-muted-foreground leading-relaxed">
                        {f.desc}
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-success shrink-0 px-2 py-1 border border-success/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
                      ACTIVE
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Window>
        </Reveal>
      </section>

      {/* QUICK START */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
        <Reveal>
          <div className="font-mono text-sm text-muted-foreground mb-6">
            agent@agentos:~$ <span className="text-foreground">cat QUICKSTART.md</span>
          </div>
          <QuickStart />
          <div className="mt-6 flex justify-center">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-mono text-sm hover:bg-[#ff6633] transition-colors"
              style={{ borderRadius: 2 }}
            >
              → Full Setup Guide on GitHub
            </a>
          </div>
        </Reveal>
      </section>

      {/* TEAM */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <Reveal>
          <Window title="System Users — AgentOS">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-[#0f0f0f]">
              {TEAM.map((u) => (
                <div
                  key={u.username}
                  className="flex flex-col items-center text-center p-6 bg-surface border border-border hover:border-primary transition-colors"
                >
                  <div
                    className="w-20 h-20 flex items-center justify-center font-mono text-2xl font-bold text-primary border-2 border-primary bg-[#0a0a0a] mb-4"
                  >
                    {u.initials}
                  </div>
                  <div className="font-mono text-xs text-accent mb-1">{u.username}</div>
                  <div className="font-bold text-foreground">{u.name}</div>
                </div>
              ))}
            </div>
          </Window>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111] border-t border-border h-12 flex items-center px-4 md:px-8 font-mono text-xs text-muted-foreground">
        <div className="flex-1 flex items-center gap-2">
          <span className="text-primary">⬡</span>
          AgentOS v1.0.0
        </div>
        <div className="flex-1 text-center">© 2026 AgentOS Team</div>
        <div className="flex-1 text-right">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2.1.1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
