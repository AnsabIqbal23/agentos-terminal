import { useEffect, useState } from "react";

interface Line {
  text: string;
  status?: "loading" | "ok" | "done";
  label?: string;
}

const SCRIPT: Line[] = [
  { text: "agent@agentos:~$ ./agentos --init" },
  { text: "Initializing AgentOS v1.0.0...", status: "loading", label: "●" },
  { text: "Loading Claude Vision API............. OK", status: "ok", label: "●" },
  { text: "AT-SPI accessibility bridge........... OK", status: "ok", label: "●" },
  { text: "Mounting X11 display :0............... OK", status: "ok", label: "●" },
  { text: "Safety policy engine.................. OK", status: "ok", label: "●" },
  { text: "MCP server (port 8765)................ OK", status: "ok", label: "●" },
  { text: "Streaming API (port 3000)............. OK", status: "ok", label: "●" },
  { text: "AgentOS is ready. Awaiting command.", status: "done", label: "✓" },
  { text: "" },
  { text: "agent@agentos:~$ " },
];

export function BootTerminal() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (lineIdx >= SCRIPT.length) return;
    const current = SCRIPT[lineIdx].text;
    if (charIdx < current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 18);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, 180);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx]);

  const done = lineIdx >= SCRIPT.length;

  return (
    <pre className="font-mono text-[13px] leading-relaxed p-5 min-h-[420px] whitespace-pre-wrap text-foreground bg-[#0a0a0a]">
      {SCRIPT.slice(0, lineIdx).map((line, i) => (
        <div key={i}>
          <LineRender line={line} text={line.text} />
        </div>
      ))}
      {lineIdx < SCRIPT.length && (
        <div>
          <LineRender line={SCRIPT[lineIdx]} text={SCRIPT[lineIdx].text.slice(0, charIdx)} typing />
          <span className="blink text-primary">▋</span>
        </div>
      )}
      {done && <span className="blink text-primary">▋</span>}
    </pre>
  );
}

function LineRender({ line, text, typing }: { line: Line; text: string; typing?: boolean }) {
  if (line.status === "ok") {
    return (
      <span>
        <span className="text-success">[●]</span>{" "}
        <span className="text-muted-foreground">{text}</span>
      </span>
    );
  }
  if (line.status === "loading") {
    return (
      <span>
        <span className={typing ? "text-primary" : "text-success"}>[●]</span>{" "}
        <span className="text-muted-foreground">{text}</span>
      </span>
    );
  }
  if (line.status === "done") {
    return (
      <span className="text-success glow-green">
        [✓] {text}
      </span>
    );
  }
  return <span className="text-foreground">{text}</span>;
}
