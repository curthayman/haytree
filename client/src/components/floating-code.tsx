import { motion } from "framer-motion";
import { Code, Terminal, Database, Server, Cpu, HardDrive } from "lucide-react";

export function FloatingCode() {
  const techElements = [
    { icon: Code, delay: 0, x: "10%", y: "20%" },
    { icon: Terminal, delay: 1, x: "80%", y: "15%" },
    { icon: Database, delay: 2, x: "15%", y: "70%" },
    { icon: Server, delay: 3, x: "75%", y: "65%" },
    { icon: Cpu, delay: 4, x: "50%", y: "25%" },
    { icon: HardDrive, delay: 5, x: "25%", y: "45%" },
  ];

  const codeBlocks = [
    { code: "function deploy() {", x: "5%", y: "30%", delay: 0.5 },
    { code: "npm run build", x: "70%", y: "40%", delay: 1.5 },
    { code: "git push origin", x: "20%", y: "80%", delay: 2.5 },
    { code: "docker run -p", x: "80%", y: "75%", delay: 3.5 },
    { code: "SELECT * FROM", x: "60%", y: "20%", delay: 4.5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" data-testid="floating-code">
      {/* Floating tech icons */}
      {techElements.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            y: [0, -50, -100]
          }}
          transition={{
            duration: 8,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
        >
          <div className="glass-effect rounded-lg p-3 text-[var(--tree-green)]">
            <item.icon size={24} />
          </div>
        </motion.div>
      ))}

      {/* Floating code snippets */}
      {codeBlocks.map((block, index) => (
        <motion.div
          key={index}
          className="absolute font-mono text-sm text-[var(--tree-green)]"
          style={{ left: block.x, top: block.y }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ 
            opacity: [0, 0.8, 0],
            x: [-20, 0, 20]
          }}
          transition={{
            duration: 6,
            delay: block.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="glass-effect px-3 py-2 rounded">
            {block.code}
          </div>
        </motion.div>
      ))}

      {/* Binary rain effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[var(--tree-green)] font-mono text-xs opacity-30"
            style={{ left: `${(i * 5) + 2}%` }}
            initial={{ y: -100 }}
            animate={{ y: "100vh" }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </motion.div>
        ))}
      </div>
    </div>
  );
}