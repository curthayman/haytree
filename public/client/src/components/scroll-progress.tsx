import { useEffect, useState } from "react";
import { useScrollProgress } from "@/lib/scroll-utils";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const { getScrollProgress } = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setProgress(getScrollProgress());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [getScrollProgress]);

  return (
    <div 
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[var(--tree-green)] to-[var(--tree-blue)] z-50 transition-all duration-300 ease-out"
      style={{ width: `${progress}%` }}
      data-testid="scroll-progress-bar"
    />
  );
}
