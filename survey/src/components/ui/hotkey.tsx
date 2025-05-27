import React from "react";

type Props = { children: React.ReactNode; prefix?: string };

export default function KeyboardHotkey({ children, prefix }: Props) {
  return (
    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
      {prefix ? <span className="text-xs">{prefix}</span> : null} {children}
    </kbd>
  );
}
