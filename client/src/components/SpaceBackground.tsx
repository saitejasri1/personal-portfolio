import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
    }> = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.002 + 0.002,
        opacity: Math.random(),
      };
    };

    const initParticles = () => {
      particles.length = 0;
      const density = (canvas.width * canvas.height) / 8000;
      for (let i = 0; i < density; i++) {
        particles.push(createParticle());
      }
    };

    const drawParticle = (particle: typeof particles[0]) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(220, 100%, 80%, ${particle.opacity})`;
      ctx.fill();
    };

    const updateParticle = (particle: typeof particles[0]) => {
      // Twinkling effect
      particle.opacity += Math.sin(Date.now() * particle.speed) * 0.01;
      particle.opacity = Math.max(0.1, Math.min(1, particle.opacity));
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        updateParticle(particle);
        drawParticle(particle);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resize();
      initParticles();
    };

    handleResize();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-black/90" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.8 }}
      />
    </div>
  );
}