import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code, Shield, Smartphone, Zap, Database, Globe } from "lucide-react";

export function AnimatedTree() {
  const [isVisible, setIsVisible] = useState(false);
  const treeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-start animation for hero section
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (treeRef.current) {
      observer.observe(treeRef.current);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const techIcons = [
    { Icon: Code, color: "text-[var(--tree-green)]", position: { top: "10%", left: "10%" } },
    { Icon: Shield, color: "text-[var(--tree-blue)]", position: { top: "20%", right: "10%" } },
    { Icon: Smartphone, color: "text-[var(--accent-green)]", position: { bottom: "30%", left: "15%" } },
    { Icon: Zap, color: "text-[var(--tree-green)]", position: { top: "40%", right: "20%" } },
    { Icon: Database, color: "text-[var(--tree-blue)]", position: { bottom: "20%", right: "15%" } },
    { Icon: Globe, color: "text-[var(--accent-green)]", position: { top: "60%", left: "20%" } },
  ];

  return (
    <div ref={treeRef} className="relative flex justify-center items-center" data-testid="animated-tree">
      <div className="relative w-96 h-96 flex items-center justify-center">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Tree trunk */}
          <motion.rect
            x="190"
            y="200"
            width="20"
            height="200"
            fill="var(--tree-blue)"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isVisible ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ transformOrigin: "bottom" }}
          />

          {/* Main branches */}
          <motion.line
            x1="200"
            y1="200"
            x2="150"
            y2="150"
            stroke="var(--tree-blue)"
            strokeWidth="8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
          <motion.line
            x1="200"
            y1="200"
            x2="250"
            y2="150"
            stroke="var(--tree-blue)"
            strokeWidth="8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          />
          <motion.line
            x1="200"
            y1="180"
            x2="120"
            y2="120"
            stroke="var(--tree-blue)"
            strokeWidth="6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
          />
          <motion.line
            x1="200"
            y1="180"
            x2="280"
            y2="120"
            stroke="var(--tree-blue)"
            strokeWidth="6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.1 }}
          />

          {/* Tech nodes/leaves */}
          <motion.circle
            cx="150"
            cy="150"
            r="15"
            fill="var(--tree-green)"
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.3 }}
          />
          <motion.circle
            cx="250"
            cy="150"
            r="15"
            fill="var(--tree-green)"
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.5 }}
          />
          <motion.circle
            cx="120"
            cy="120"
            r="12"
            fill="var(--accent-green)"
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.7 }}
          />
          <motion.circle
            cx="280"
            cy="120"
            r="12"
            fill="var(--accent-green)"
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.9 }}
          />

          {/* Circuit patterns */}
          <motion.path
            d="M 150 150 L 170 130 L 190 150 L 210 130 L 250 150"
            stroke="var(--tree-green)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 2.1 }}
          />
        </svg>

        {/* Floating tech icons */}
        {techIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute glass-effect rounded-lg p-3 ${item.color}`}
            style={item.position}
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 2.3 + index * 0.2 }}
            whileHover={{ scale: 1.1 }}
            data-testid={`tech-icon-${index}`}
          >
            <item.Icon size={24} className="animate-pulse-slow" />
          </motion.div>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        data-testid="scroll-indicator"
      >
        <div className="w-6 h-10 border-2 border-[var(--tree-green)] rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-[var(--tree-green)] rounded-full mt-2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}
