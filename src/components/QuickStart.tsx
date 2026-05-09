import { useState } from "react";
import { Window } from "./Window";

const GITHUB_URL = "https://github.com/abdullah-kapadia/AgentOS";
const CLONE_CMD = `git clone ${GITHUB_URL}`;

export function QuickStart() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(CLONE_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Window title="agent@agentos:~$ cat QUICKSTART.md" glow>
      <div className="relative">
        <button
          onClick={copy}
          className="absolute top-3 right-3 z-10 px-3 py-1 text-[11px] font-mono border border-border bg-surface-elevated hover:border-primary hover:text-primary transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <pre className="font-mono text-[13px] p-5 leading-relaxed bg-[#0a0a0a] whitespace-pre-wrap">
{`agent@agentos:~$ `}<span className="text-foreground">{CLONE_CMD}</span>{`
`}<span className="text-muted-foreground">{`Cloning into 'agentos'...
remote: Enumerating objects: done.
remote: Counting objects: done.
Resolving deltas: done.
`}</span>{`
agent@agentos:~$ `}<span className="text-foreground">cd agentos</span>{`
agent@agentos:~/agentos$ `}<span className="blink text-primary">▋</span>
        </pre>
      </div>
    </Window>
  );
}
