import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      alpha: number;
      speed: number;
    }> = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const createStar = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      alpha: Math.random(),
      speed: Math.random() * 0.002 + 0.002,
    });

    const initStars = () => {
      stars.length = 0;
      const density = (canvas.width * canvas.height) / 8000;
      for (let i = 0; i < density; i++) {
        stars.push(createStar());
      }
    };

    const drawStar = (star: typeof stars[0]) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(220, 100%, 80%, ${star.alpha})`;
      ctx.fill();
    };

    const updateStar = (star: typeof stars[0]) => {
      star.alpha += Math.sin(Date.now() * star.speed) * 0.01;
      star.alpha = Math.max(0.1, Math.min(1, star.alpha));
      return star;
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
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
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Earth */}
      <motion.div
        className="absolute w-24 h-24 opacity-60"
        initial={{ x: "-10%", y: "10%" }}
        animate={{
          x: ["-10%", "70%", "-10%"],
          y: ["10%", "60%", "10%"],
        }}
        transition={{
          duration: 60,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full filter blur-[1px]">
          <circle cx="50" cy="50" r="48" fill="hsl(200, 80%, 40%)" />
          <path
            d="M25,50 Q50,20 75,50 Q50,80 25,50"
            fill="hsl(130, 70%, 40%)"
            opacity="0.7"
          />
        </svg>
      </motion.div>

      {/* Moon */}
      <motion.div
        className="absolute w-12 h-12 opacity-60"
        initial={{ x: "90%", y: "20%" }}
        animate={{
          x: ["90%", "20%", "90%"],
          y: ["20%", "70%", "20%"],
        }}
        transition={{
          duration: 45,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full filter blur-[1px]">
          <circle cx="50" cy="50" r="48" fill="hsl(60, 20%, 95%)" />
          <circle cx="35" cy="35" r="12" fill="hsl(60, 20%, 85%)" opacity="0.5" />
          <circle cx="65" cy="65" r="15" fill="hsl(60, 20%, 85%)" opacity="0.5" />
        </svg>
      </motion.div>
    </div>
  );
}