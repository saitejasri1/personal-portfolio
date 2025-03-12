import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

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
      color: string;
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
      const colors = isDarkMode 
        ? ['hsla(220, 100%, 80%, 1)'] // Star color
        : [
            'hsla(20, 100%, 70%, 1)',  // Warm orange
            'hsla(340, 100%, 80%, 1)', // Pink
            'hsla(40, 100%, 80%, 1)',  // Golden
          ];

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: isDarkMode ? Math.random() * 2 : Math.random() * 4,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: isDarkMode ? 0 : Math.random() * 0.2 - 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random()
      };
    };

    const initParticles = () => {
      particles.length = 0;
      const density = isDarkMode ? 
        (canvas.width * canvas.height) / 8000 : 
        (canvas.width * canvas.height) / 15000;

      for (let i = 0; i < density; i++) {
        particles.push(createParticle());
      }
    };

    const drawParticle = (particle: typeof particles[0]) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color.replace('1)', `${particle.opacity})`);
      ctx.fill();
    };

    const updateParticle = (particle: typeof particles[0]) => {
      if (isDarkMode) {
        // Star twinkling effect
        particle.opacity += Math.sin(Date.now() * 0.001) * 0.01;
        particle.opacity = Math.max(0.2, Math.min(1, particle.opacity));
      } else {
        // Sunset particle movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Fade effect
        particle.opacity = 0.3 + Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.3;
      }
    };

    const animate = () => {
      ctx.fillStyle = isDarkMode ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)";
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
  }, [isDarkMode]);

  return (
    <div className="fixed inset-0 -z-10">
      {/* Light theme base gradient */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          !isDarkMode ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, 
                #ff7e5f 0%,
                #feb47b 25%,
                #ffedbc 50%,
                #ff9a9e 75%,
                #fad0c4 100%
              )
            `,
            opacity: 0.8,
            transition: 'opacity 1s ease-in-out'
          }}
        />
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