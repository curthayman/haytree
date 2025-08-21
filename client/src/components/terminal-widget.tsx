import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export function TerminalWidget() {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const commands = [
    "$ npm create haytree-app",
    "$ git init && git add .",
    "$ npm run deploy",
    "$ curl -X GET /api/status",
    "$ docker build -t webapp .",
    "$ npm test --coverage",
  ];

  useEffect(() => {
    const command = commands[currentCommand];
    let currentIndex = 0;

    const typeCommand = () => {
      if (currentIndex <= command.length) {
        setDisplayText(command.substring(0, currentIndex));
        currentIndex++;
        setTimeout(typeCommand, 100);
      } else {
        setTimeout(() => {
          setCurrentCommand((prev) => (prev + 1) % commands.length);
          setDisplayText("");
        }, 2000);
      }
    };

    typeCommand();
  }, [currentCommand]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <motion.div 
      className="fixed bottom-8 right-8 z-40 hidden lg:block"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      data-testid="terminal-widget"
    >
      <div className="code-block w-80 max-w-sm">
        <div className="flex items-center mb-2 text-[var(--tree-green)]">
          <Terminal size={16} className="mr-2" />
          <span className="text-sm">haytree@terminal</span>
        </div>
        <div className="text-[var(--tree-green)] text-sm font-mono">
          {displayText}
          <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span>
        </div>
      </div>
    </motion.div>
  );
}