export function SectionHeading({ command }: { command: string }) {
  return (
    <div
      className="mb-6 font-mono"
      style={{
        fontFamily: '"Ubuntu Mono", ui-monospace, monospace',
        fontSize: "clamp(20px, 2.4vw, 28px)",
      }}
    >
      <span style={{ color: "#A0A0A0" }}>agent@agentos:~$ </span>
      <span
        style={{
          color: "#E95420",
          fontWeight: 700,
          textShadow: "0 0 10px rgba(233,84,32,0.5)",
        }}
      >
        {command}
      </span>
      <span className="blink" style={{ color: "#E95420", marginLeft: 4 }}>▋</span>
    </div>
  );
}

export function Wordmark({
  size = 22,
  letterSpacing = 0,
  glow = false,
}: {
  size?: number;
  letterSpacing?: number;
  glow?: boolean;
}) {
  return (
    <span
      style={{
        fontFamily: '"Ubuntu", system-ui, sans-serif',
        fontSize: size,
        fontWeight: 700,
        letterSpacing,
        lineHeight: 1,
      }}
    >
      <span style={{ color: "#F0F0F0" }}>Agent</span>
      <span
        style={{
          color: "#E95420",
          textShadow: glow ? "0 0 20px rgba(233, 84, 32, 0.6)" : "0 0 6px rgba(233,84,32,0.45)",
        }}
      >
        OS
      </span>
    </span>
  );
}
