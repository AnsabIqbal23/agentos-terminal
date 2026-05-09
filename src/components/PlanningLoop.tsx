import { useEffect, useState } from "react";

const STEPS = [
  { num: "01", title: "CAPTURE", desc: "Screenshot + OCR + AT-SPI tree snapshot" },
  { num: "02", title: "PLAN", desc: "Claude Vision API reasons about screen state" },
  { num: "03", title: "SAFETY GATE", desc: "Risk level: SAFE / CAUTION / DESTRUCTIVE" },
  { num: "04", title: "EXECUTE", desc: "xdotool / nut.js / AT-SPI adapter fires" },
  { num: "05", title: "VERIFY", desc: "OCR / image match / stability confirmed" },
  { num: "06", title: "LOOP OR DONE", desc: "Repeat up to 30 iterations or exit" },
];

export function PlanningLoop() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-3 md:gap-2 relative">
      {STEPS.map((s, i) => {
        const isActive = i === active;
        return (
          <div key={s.num} className="relative">
            <div
              className={`p-4 border h-full transition-all duration-300 ${
                isActive
                  ? "border-primary bg-surface-elevated"
                  : "border-border bg-surface"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-muted-foreground">{s.num}</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    isActive ? "bg-primary glow-orange" : "bg-border"
                  }`}
                  style={isActive ? { boxShadow: "0 0 8px #e95420" } : undefined}
                />
              </div>
              <div
                className={`font-bold text-sm mb-1 tracking-wide ${
                  isActive ? "text-primary glow-orange" : "text-foreground"
                }`}
              >
                {s.title}
              </div>
              <div className="font-mono text-[11px] text-muted-foreground leading-relaxed">
                {s.desc}
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-1 w-2 h-px bg-border z-10">
                <div
                  className={`h-px transition-all duration-300 ${
                    i === active ? "bg-primary w-full" : "w-0"
                  }`}
                  style={i === active ? { boxShadow: "0 0 6px #e95420" } : undefined}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
