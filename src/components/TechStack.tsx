import { useState } from "react";
import { Window } from "./Window";

type Tool = {
  name: string;
  logo?: string;
  fallback?: "tesseract" | "whisper";
};

const SI = (slug: string) => `https://cdn.simpleicons.org/${slug}/ffffff`;
const SIC = (slug: string, color: string) => `https://cdn.simpleicons.org/${slug}/${color}`;

const TOOLS: Tool[] = [
  { name: "TypeScript", logo: SIC("typescript", "3178C6") },
  { name: "Node.js", logo: SIC("nodedotjs", "5FA04E") },
  { name: "Electron", logo: SIC("electron", "47848F") },
  { name: "Claude API", logo: SIC("anthropic", "E95420") },
  { name: "PostgreSQL", logo: SIC("postgresql", "4169E1") },
  { name: "Docker", logo: SIC("docker", "2496ED") },
  {
    name: "Tesseract",
    logo: "https://raw.githubusercontent.com/tesseract-ocr/tesseract/main/doc/images/tesseract.png",
    fallback: "tesseract",
  },
  { name: "Vitest", logo: SIC("vitest", "6E9F18") },
  {
    name: "Whisper",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png",
    fallback: "whisper",
  },
  { name: "X11 / xdotool", logo: SIC("x", "ffffff") },
  { name: "AT-SPI", logo: SIC("gnome", "4A86CF") },
  { name: "Zod", logo: SIC("zod", "3E67B1") },
  { name: "sharp", logo: SI("sharp") },
  { name: "nut.js", logo: SIC("nodedotjs", "E95420") },
];

const TOTAL = TOOLS.length;

function FallbackVisual({ kind }: { kind: "tesseract" | "whisper" }) {
  if (kind === "tesseract") {
    return (
      <div
        className="flex items-center justify-center"
        style={{
          width: 40,
          height: 40,
          background: "#0D3349",
          borderRadius: 2,
        }}
      >
        <span
          style={{
            fontFamily: '"Ubuntu Mono", ui-monospace, monospace',
            color: "#fff",
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          OCR
        </span>
      </div>
    );
  }
  return (
    <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

function Card({ tool }: { tool: Tool }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className="group shrink-0 mx-2 flex flex-col items-center justify-center gap-2 w-[100px] h-[100px] bg-[#1A1A1A] border border-[#333] hover:border-primary transition-all duration-200"
      style={{ borderRadius: 2 }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 0 12px rgba(233,84,32,0.45)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {failed && tool.fallback ? (
        <FallbackVisual kind={tool.fallback} />
      ) : (
        <img
          src={tool.logo}
          alt={tool.name}
          width={40}
          height={40}
          loading="lazy"
          className="object-contain"
          style={{ width: 40, height: 40 }}
          onError={() => {
            if (tool.fallback) setFailed(true);
          }}
        />
      )}
      <span
        className="text-[11px] text-muted-foreground text-center px-1 truncate w-full"
        style={{ fontFamily: '"Ubuntu Mono", ui-monospace, monospace' }}
      >
        {tool.name}
      </span>
    </div>
  );
}

function Row({ direction, duration }: { direction: "left" | "right"; duration: number }) {
  const animation =
    direction === "left" ? "agent-marquee-left" : "agent-marquee-right";
  return (
    <div className="overflow-hidden py-2">
      <div
        className="flex w-max marquee-track"
        style={{
          animation: `${animation} ${duration}s linear infinite`,
        }}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex" aria-hidden={dup === 1}>
            {TOOLS.map((t) => (
              <Card key={`${dup}-${t.name}`} tool={t} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <Window title="apt — Installed Packages" glow>
      <div className="bg-[#0a0a0a] font-mono text-[13px]">
        <div className="px-5 py-4 border-b border-border">
          <span className="text-muted-foreground">agent@agentos:~$ </span>
          <span className="text-foreground">apt list --installed</span>
          <span className="text-muted-foreground"> 2&gt;/dev/null</span>
        </div>

        <div className="marquee-area py-4">
          <Row direction="left" duration={30} />
          <Row direction="right" duration={25} />
        </div>

        <div className="px-5 py-4 border-t border-border text-muted-foreground space-y-1">
          <div>{TOTAL} packages listed. All dependencies satisfied.</div>
          <div>
            <span>agent@agentos:~$ </span>
            <span className="blink text-primary">█</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes agent-marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes agent-marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-area:hover .marquee-track {
          animation-play-state: paused !important;
        }
      `}</style>
    </Window>
  );
}
