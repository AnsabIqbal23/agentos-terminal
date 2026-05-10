import { useEffect, useState } from "react";

export function StatusBar() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-7 bg-[#111] border-b border-border flex items-center px-3 font-mono text-[12px] text-muted-foreground select-none">
      <div className="flex-1 flex items-center gap-2">
        <span className="text-primary">⬡</span>
        <span style={{ fontFamily: '"Ubuntu", system-ui, sans-serif', fontWeight: 700 }}>
          <span style={{ color: "#F0F0F0" }}>Agent</span>
          <span style={{ color: "#E95420", textShadow: "0 0 8px rgba(233,84,32,0.55)" }}>OS</span>
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center gap-2">
        <span>agent@desktop:~$</span>
        <span className="text-foreground">[AI ACTIVE</span>
        <span className="w-2 h-2 rounded-full bg-success pulse-dot inline-block" />
        <span className="text-foreground">]</span>
      </div>
      <div className="flex-1 text-right tabular-nums">{time}</div>
    </div>
  );
}
