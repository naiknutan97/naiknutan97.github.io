"use client";

import { useEffect, useState } from "react";

interface SkillBarProps {
  name: string;
  level: number;
  index?: number;
}

export default function SkillBar({ name, level, index = 0 }: SkillBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(level), 600 + index * 100);
    return () => clearTimeout(timer);
  }, [level, index]);

  return (
    <div className="group relative">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400">
          {name}
        </span>
        <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
          {level}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
        <div
          className="h-full rounded-full bg-[rgb(var(--accent))] transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
