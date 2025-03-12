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
    let lastTheme = isDarkMode;
    let transitionProgress = 0;
    let shootingStarTimer = 0;

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
      isShooting?: boolean;
      trail?: Array<{ x: number; y: number; opacity: number }>;
    }> = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const createStar = (burst = false, shooting = false) => {
      const x = burst ? canvas.width / 2 : Math.random() * canvas.width;
      const y = burst ? canvas.height / 2 : Math.random() * canvas.height;
      const angle = burst ? Math.random() * Math.PI * 2 : Math.random() * 0.5 - 0.25;
      const speed = burst ? Math.random() * 10 + 5 : Math.random() * 0.5 + 0.2;

      return {
        x,
        y,
        size: Math.random() * 3 + (shooting ? 3 : 1),
        speedX: shooting ? Math.cos(angle) * speed * 5 : Math.cos(angle) * speed,
        speedY: shooting ? Math.sin(angle) * speed * 5 : Math.sin(angle) * speed,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: `hsl(${Math.random() * 60 + 190}, 100%, ${shooting ? 90 : 80}%)`,
        opacity: 1,
        scale: burst ? 2 : 1,
        targetScale: 1,
        isShooting: shooting,
        trail: shooting ? [] : undefined
      };
    };

    const initStars = (burst = false) => {
      particles.length = 0;
      const density = (canvas.width * canvas.height) / (burst ? 3000 : 8000);

      for (let i = 0; i < density; i++) {
        particles.push(createStar(burst));
      }
    };

    const drawStar = (star: typeof particles[0]) => {
      ctx.save();
      ctx.translate(star.x, star.y);
      ctx.rotate(star.rotation);
      ctx.scale(star.scale, star.scale);

      // Draw star trail if it's a shooting star
      if (star.trail) {
        star.trail.forEach((point, index) => {
          const trailSize = star.size * (1 - index / star.trail.length);
          ctx.beginPath();
          ctx.arc(point.x - star.x, point.y - star.y, trailSize / 2, 0, Math.PI * 2);
          ctx.fillStyle = star.color.replace(')', `, ${point.opacity})`);
          ctx.fill();
        });
      }

      // Draw star
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        const radius = star.size * (i % 2 ? 0.5 : 1);
        if (i === 0) {
          ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        } else {
          ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        }
      }

      // Add glow effect
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, star.size * 2);
      gradient.addColorStop(0, star.color.replace(')', `, ${star.opacity})`));
      gradient.addColorStop(1, star.color.replace(')', ', 0)'));

      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
    };

    const updateStar = (star: typeof particles[0]) => {
      star.x += star.speedX;
      star.y += star.speedY;
      star.rotation += star.rotationSpeed;

      // Update trail for shooting stars
      if (star.isShooting && star.trail) {
        star.trail.unshift({ x: star.x, y: star.y, opacity: star.opacity });
        if (star.trail.length > 10) star.trail.pop();
        star.trail.forEach(point => point.opacity *= 0.9);
      }

      // Remove shooting stars when they exit the screen
      if (star.isShooting && (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height)) {
        const index = particles.indexOf(star);
        if (index > -1) particles.splice(index, 1);
        return;
      }

      // Wrap non-shooting stars around the screen
      if (!star.isShooting) {
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      }

      // Twinkling effect
      star.opacity = 0.3 + Math.sin(Date.now() * 0.001 + star.x * 0.01) * 0.7;
      star.scale += (star.targetScale - star.scale) * 0.1;
    };

    const animate = () => {
      ctx.fillStyle = isDarkMode ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Theme change burst effect
      if (lastTheme !== isDarkMode) {
        initStars(true);
        lastTheme = isDarkMode;
        transitionProgress = 0;
      }

      // Occasionally add shooting stars in dark mode
      if (isDarkMode) {
        shootingStarTimer++;
        if (shootingStarTimer > 60 && Math.random() < 0.1) {
          particles.push(createStar(false, true));
          shootingStarTimer = 0;
        }
      }

      // Update transition
      if (transitionProgress < 1) {
        transitionProgress += 0.02;
      }

      particles.forEach(star => {
        updateStar(star);
        drawStar(star);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resize();
      initStars();
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
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
          style={{
            backgroundImage: "url('/images/sunset-beach.jpg')",
            transform: !isDarkMode ? 'scale(1)' : 'scale(1.1)',
            opacity: 0.8
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
        />
      </div>

      {/* Dark theme base */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isDarkMode ? 'opacity-100' : 'opacity-0'
        } bg-black/90`}
      />

      {/* Star canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full transition-opacity duration-1000"
        style={{ opacity: 0.8 }}
      />
    </div>
  );
}