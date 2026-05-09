import { useEffect, useRef, useState } from "react";
import { Window } from "./Window";

type Pkg = { name: string; desc: string };
type Group = { category: string; packages: Pkg[] };

const GROUPS: Group[] = [
  {
    category: "AI & Intelligence",
    packages: [
      { name: "anthropic-claude-api", desc: "vision + reasoning engine" },
      { name: "openai-whisper", desc: "speech-to-text (Python/Flask)" },
      { name: "tesseract-js", desc: "on-device OCR engine" },
    ],
  },
  {
    category: "Backend",
    packages: [
      { name: "typescript", desc: "ES2022 strict mode" },
      { name: "nodejs", desc: "v18+ async runtime" },
      { name: "pnpm", desc: "package manager" },
      { name: "zod", desc: "schema validation" },
      { name: "vitest", desc: "test framework" },
    ],
  },
  {
    category: "System Control",
    packages: [
      { name: "xdotool", desc: "X11 input automation" },
      { name: "nut-js", desc: "mouse + keyboard control" },
      { name: "at-spi2", desc: "Linux accessibility bridge" },
      { name: "dbus-next", desc: "D-Bus communication layer" },
      { name: "x11", desc: "display server protocol" },
    ],
  },
  {
    category: "Frontend",
    packages: [
      { name: "electron", desc: "desktop app framework" },
      { name: "sharp", desc: "image processing + WebP" },
    ],
  },
  {
    category: "Infrastructure",
    packages: [
      { name: "postgresql", desc: "v16 structured persistence" },
      { name: "docker", desc: "containerization" },
      { name: "jsonl", desc: "audit log format" },
      { name: "ndjson", desc: "real-time event streaming" },
    ],
  },
];

const TOTAL = GROUPS.reduce((n, g) => n + g.packages.length, 0);

export function TechStack() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShown(true)),
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  let rowIndex = 0;

  return (
    <div ref={ref}>
      <Window title="apt — Installed Packages" glow>
        <div className="bg-[#0a0a0a] font-mono text-[13px]">
          <div className="px-5 py-4 border-b border-border">
            <span className="text-muted-foreground">agent@agentos:~$ </span>
            <span className="text-foreground">apt list --installed</span>
            <span className="text-muted-foreground"> 2&gt;/dev/null</span>
          </div>

          <div>
            {GROUPS.map((group) => (
              <div key={group.category}>
                <div
                  className="px-5 py-2 text-success/80 bg-[#0f1a0f] border-y border-border/60"
                  style={{ textShadow: "0 0 6px rgba(57,255,20,0.25)" }}
                >
                  ## {group.category}
                </div>
                {group.packages.map((p) => {
                  const i = rowIndex++;
                  return (
                    <div
                      key={p.name}
                      className="group grid grid-cols-[1fr_auto] gap-4 items-center px-5 py-2.5 border-b border-border/40 hover:bg-surface-elevated transition-colors"
                      style={{
                        opacity: shown ? 1 : 0,
                        transform: shown ? "translateY(0)" : "translateY(8px)",
                        transition: `opacity 350ms ease ${i * 50}ms, transform 350ms ease ${i * 50}ms, background-color 150ms`,
                      }}
                    >
                      <span className="text-foreground group-hover:text-primary group-hover:[text-shadow:0_0_8px_rgba(233,84,32,0.7)] transition-all truncate">
                        {p.name}
                      </span>
                      <span className="text-muted-foreground text-xs text-right">
                        {p.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="px-5 py-4 border-t border-border text-muted-foreground space-y-1">
            <div>{TOTAL} packages listed. All dependencies satisfied.</div>
            <div>
              <span>agent@agentos:~$ </span>
              <span className="blink text-primary">█</span>
            </div>
          </div>
        </div>
      </Window>
    </div>
  );
}
