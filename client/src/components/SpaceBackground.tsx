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
    let lastTheme = isDarkMode;
    let transitionProgress = 0;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      opacity: number;
      scale: number;
      targetScale: number;
    }> = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const createParticle = (burst = false) => {
      const x = burst ? canvas.width / 2 : Math.random() * canvas.width;
      const y = burst ? canvas.height / 2 : Math.random() * canvas.height;
      const angle = burst ? Math.random() * Math.PI * 2 : 0;
      const speed = burst ? Math.random() * 10 + 5 : Math.random() * 2 + 1;

      const colors = isDarkMode 
        ? ['hsla(220, 100%, 80%, 1)'] // Star color
        : [
            'hsla(335, 100%, 95%, 1)',  // Light pink (cherry blossom)
            'hsla(335, 90%, 90%, 1)',   // Soft pink
            'hsla(335, 80%, 85%, 1)',   // Dusty pink
          ];

      return {
        x,
        y,
        size: isDarkMode ? Math.random() * 2 : Math.random() * 4,
        speedX: burst ? Math.cos(angle) * speed : (Math.random() - 0.5) * 0.5,
        speedY: burst ? Math.sin(angle) * speed : Math.random() * 0.2 - 0.1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random(),
        scale: burst ? 2 : 1,
        targetScale: 1
      };
    };

    const initParticles = (burst = false) => {
      particles.length = 0;
      const density = (canvas.width * canvas.height) / (burst ? 3000 : 15000);

      for (let i = 0; i < density; i++) {
        particles.push(createParticle(burst));
      }
    };

    const drawParticle = (particle: typeof particles[0]) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.scale(particle.scale, particle.scale);

      ctx.beginPath();
      if (isDarkMode) {
        // Star shape
        for (let i = 0; i < 5; i++) {
          const angle = (i * Math.PI * 2) / 5;
          const radius = particle.size * (i % 2 ? 0.5 : 1);
          if (i === 0) {
            ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
          } else {
            ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
          }
        }
      } else {
        // Cherry blossom petal shape
        ctx.moveTo(0, -particle.size);
        ctx.bezierCurveTo(
          particle.size * 0.5, -particle.size,
          particle.size, -particle.size * 0.5,
          particle.size, 0
        );
        ctx.bezierCurveTo(
          particle.size, particle.size * 0.5,
          particle.size * 0.5, particle.size,
          0, particle.size
        );
        ctx.bezierCurveTo(
          -particle.size * 0.5, particle.size,
          -particle.size, particle.size * 0.5,
          -particle.size, 0
        );
        ctx.bezierCurveTo(
          -particle.size, -particle.size * 0.5,
          -particle.size * 0.5, -particle.size,
          0, -particle.size
        );
      }

      ctx.fillStyle = particle.color.replace('1)', `${particle.opacity})`);
      ctx.fill();
      ctx.restore();
    };

    const updateParticle = (particle: typeof particles[0]) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.rotation += particle.rotationSpeed;

      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      particle.scale += (particle.targetScale - particle.scale) * 0.1;

      if (isDarkMode) {
        // Star twinkling
        particle.opacity = 0.3 + Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.7;
      } else {
        // Floating petal effect
        particle.speedY = Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.2;
        particle.opacity = 0.5 + Math.sin(Date.now() * 0.002 + particle.y * 0.01) * 0.3;
      }
    };

    const animate = () => {
      ctx.fillStyle = isDarkMode ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Theme change burst effect
      if (lastTheme !== isDarkMode) {
        initParticles(true);
        lastTheme = isDarkMode;
        transitionProgress = 0;
      }

      // Update transition
      if (transitionProgress < 1) {
        transitionProgress += 0.02;
      }

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
      {/* Light theme background with growing tree branches */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          !isDarkMode ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ 
            scale: !isDarkMode ? 1 : 1.1,
            opacity: !isDarkMode ? 1 : 0
          }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-pink-100"
        />
        <div className="absolute inset-0 opacity-20">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Decorative tree branches pattern */}
            <pattern
              id="branch-pattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0,10 Q10,0 20,10 M10,0 Q10,10 10,20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-pink-200"
              />
            </pattern>
            <rect width="100" height="100" fill="url(#branch-pattern)" />
          </svg>
        </div>
      </div>

      {/* Dark theme base */}
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