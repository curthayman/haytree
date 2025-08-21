import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface CodeLine {
  id: string;
  content: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
}

export function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const codeSnippets = [
    "const app = express();",
    "npm install react",
    "git commit -m 'feat: new feature'",
    "SELECT * FROM users;",
    "function handleClick() {",
    "import { useState } from 'react';",
    "docker build -t app .",
    "curl -X POST /api/data",
    "const [state, setState] = useState();",
    "npm run build",
    "git push origin main",
    "console.log('Hello World');",
    "<div className='container'>",
    "padding: 1rem;",
    "background: linear-gradient();",
    "transform: scale(1.1);",
    "margin: 0 auto;",
    "width: 100%;",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const lines: CodeLine[] = [];
    
    // Initialize code lines
    for (let i = 0; i < 8; i++) {
      lines.push({
        id: `line-${i}`,
        content: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.2 + Math.random() * 0.3,
        opacity: 0.1 + Math.random() * 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      lines.forEach((line) => {
        ctx.font = "14px 'JetBrains Mono', monospace";
        ctx.fillStyle = `rgba(109, 179, 63, ${line.opacity})`;
        ctx.fillText(line.content, line.x, line.y);
        
        // Move line slowly
        line.y += line.speed;
        line.x += line.speed * 0.2;
        
        // Reset position when off screen
        if (line.y > canvas.height + 20) {
          line.y = -20;
          line.x = Math.random() * canvas.width;
          line.content = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        }
        if (line.x > canvas.width + 200) {
          line.x = -200;
        }
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
      data-testid="tech-background"
    />
  );
}

export function MatrixRain() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]|<>";
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const columns = Math.floor(window.innerWidth / 20);
    const drops: number[] = new Array(columns).fill(1);

    const animate = () => {
      // Clear previous content
      container.innerHTML = '';

      for (let i = 0; i < drops.length; i++) {
        const char = characters[Math.floor(Math.random() * characters.length)];
        const div = document.createElement('div');
        div.textContent = char;
        div.style.position = 'absolute';
        div.style.left = `${i * 20}px`;
        div.style.top = `${drops[i] * 20}px`;
        div.style.color = '#6db33f';
        div.style.fontSize = '14px';
        div.style.fontFamily = 'monospace';
        div.style.opacity = Math.random().toString();
        div.style.pointerEvents = 'none';
        
        container.appendChild(div);

        if (drops[i] * 20 > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(animate, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
      data-testid="matrix-rain"
    />
  );
}

export function TechCircuits() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-30" data-testid="tech-circuits">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <motion.path
              d="M 10 10 L 90 10 L 90 50 L 10 50 Z"
              stroke="#6db33f"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="10"
              cy="10"
              r="2"
              fill="#6db33f"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            <motion.circle
              cx="90"
              cy="50"
              r="2"
              fill="#6db33f"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 2 }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  );
}