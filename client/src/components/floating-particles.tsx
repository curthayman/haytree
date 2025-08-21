import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  delay: number;
}

export function FloatingParticles() {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const particles: Particle[] = [
      { x: 10, y: 20, delay: 0 },
      { x: 30, y: 80, delay: 1 },
      { x: 60, y: 10, delay: 2 },
      { x: 80, y: 70, delay: 3 },
      { x: 20, y: 60, delay: 4 },
      { x: 70, y: 30, delay: 5 },
      { x: 90, y: 50, delay: 6 },
    ];

    if (particlesRef.current) {
      particles.forEach((particle, index) => {
        const element = document.createElement('div');
        element.className = 'particle animate-float';
        element.style.left = `${particle.x}%`;
        element.style.top = `${particle.y}%`;
        element.style.animationDelay = `${particle.delay}s`;
        particlesRef.current?.appendChild(element);
      });
    }

    return () => {
      if (particlesRef.current) {
        particlesRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
      ref={particlesRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      data-testid="floating-particles"
    />
  );
}
