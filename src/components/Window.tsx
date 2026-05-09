import { ReactNode } from "react";

interface WindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  glow?: boolean;
  bodyClassName?: string;
}

export function Window({ title, children, className = "", glow, bodyClassName = "" }: WindowProps) {
  return (
    <div
      className={`bg-surface border border-border ${glow ? "border-glow-blue" : ""} ${className}`}
    >
      <div className="flex items-center gap-2 px-3 py-2 bg-[#161616] border-b border-border">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-win-close" />
          <span className="w-3 h-3 rounded-full bg-win-min" />
          <span className="w-3 h-3 rounded-full bg-win-max" />
        </div>
        <div className="flex-1 text-center font-mono text-xs text-muted-foreground truncate">
          {title}
        </div>
        <div className="w-12" />
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
