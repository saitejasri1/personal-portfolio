import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Star background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      fadeDirection: number;
    }> = [];

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    const createStar = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        fadeDirection: Math.random() > 0.5 ? 0.005 : -0.005,
      };
    };

    const init = () => {
      resize();
      // Create stars
      for (let i = 0; i < 150; i++) {
        stars.push(createStar());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and animate stars
      stars.forEach((star) => {
        star.alpha += star.fadeDirection;

        if (star.alpha <= 0 || star.alpha >= 1) {
          star.fadeDirection *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(220, 100%, 90%, ${star.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black/20">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Earth */}
      <motion.div
        className="absolute w-32 h-32"
        initial={{ x: "0%", y: "0%" }}
        animate={{
          x: ["0%", "70%", "0%"],
          y: ["0%", "40%", "0%"],
        }}
        transition={{
          duration: 40,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-40">
          <circle cx="50" cy="50" r="45" fill="hsl(200, 70%, 50%)" />
          <path
            d="M30,50 Q50,30 70,50 Q50,70 30,50"
            fill="hsl(120, 60%, 50%)"
            opacity="0.6"
          />
        </svg>
      </motion.div>

      {/* Moon */}
      <motion.div
        className="absolute w-16 h-16"
        initial={{ x: "100%", y: "30%" }}
        animate={{
          x: ["100%", "30%", "100%"],
          y: ["30%", "60%", "30%"],
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-40">
          <circle cx="50" cy="50" r="45" fill="hsl(60, 10%, 90%)" />
          <circle cx="35" cy="35" r="10" fill="hsl(60, 10%, 80%)" opacity="0.5" />
          <circle cx="60" cy="60" r="12" fill="hsl(60, 10%, 80%)" opacity="0.5" />
        </svg>
      </motion.div>
    </div>
  );
}