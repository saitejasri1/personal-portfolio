import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import TreeBranches from "./TreeBranches";

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
      speedX: number;
      speedY: number;
      rotation: number;
      opacity: number;
      scale: number;
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
        y: isDarkMode ? Math.random() * canvas.height : canvas.height + 10,
        size: isDarkMode ? Math.random() * 2 : Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 2,
        speedY: isDarkMode ? 0 : -Math.random() * 2 - 1,
        rotation: Math.random() * Math.PI * 2,
        opacity: Math.random(),
        scale: 1
      };
    };

    const initParticles = () => {
      particles.length = 0;
      const count = isDarkMode ? 200 : 50;
      for (let i = 0; i < count; i++) {
        particles.push(createParticle());
      }
    };

    const drawParticle = (particle: typeof particles[0]) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.scale(particle.scale, particle.scale);

      if (isDarkMode) {
        // Star
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * Math.PI * 2) / 5;
          const radius = particle.size * (i % 2 ? 0.5 : 1);
          if (i === 0) {
            ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
          } else {
            ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
          }
        }
        ctx.fillStyle = `hsla(220, 100%, 80%, ${particle.opacity})`;
      } else {
        // Cherry blossom petal
        ctx.beginPath();
        ctx.moveTo(0, -particle.size / 2);
        ctx.quadraticCurveTo(
          particle.size / 2, -particle.size / 2,
          particle.size / 2, 0
        );
        ctx.quadraticCurveTo(
          particle.size / 2, particle.size / 2,
          0, particle.size / 2
        );
        ctx.quadraticCurveTo(
          -particle.size / 2, particle.size / 2,
          -particle.size / 2, 0
        );
        ctx.quadraticCurveTo(
          -particle.size / 2, -particle.size / 2,
          0, -particle.size / 2
        );
        ctx.fillStyle = `hsla(335, 80%, 90%, ${particle.opacity})`;
      }

      ctx.fill();
      ctx.restore();
    };

    const updateParticle = (particle: typeof particles[0]) => {
      if (isDarkMode) {
        // Twinkling stars
        particle.opacity = 0.3 + Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.7;
      } else {
        // Falling petals with swaying motion
        particle.x += Math.sin(Date.now() * 0.001 + particle.y * 0.01) * 0.5;
        particle.y += particle.speedY;
        particle.rotation += 0.02;
        particle.opacity = 0.7 + Math.sin(Date.now() * 0.002 + particle.y * 0.01) * 0.3;

        // Reset when petal goes off screen
        if (particle.y < -50) {
          particle.y = canvas.height + 50;
          particle.x = Math.random() * canvas.width;
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
  }, [isDarkMode]);

  return (
    <div className="fixed inset-0 -z-10">
      {/* Light theme background */}
      <motion.div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          !isDarkMode ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-pink-100"
        />
        <TreeBranches />
      </motion.div>

      {/* Dark theme background */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isDarkMode ? 'opacity-100' : 'opacity-0'
        } bg-black/90`}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full transition-opacity duration-1000"
        style={{ opacity: 0.8 }}
      />
    </div>
  );
}