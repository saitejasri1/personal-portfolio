import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function DanceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      alpha: Math.random(),
      speed: Math.random() * 0.002 + 0.002,
    });

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
      ctx.fillStyle = `hsla(32, 100%, 50%, ${particle.alpha * 0.3})`;
      ctx.fill();
    };

    const updateParticle = (particle: typeof particles[0]) => {
      particle.alpha += Math.sin(Date.now() * particle.speed) * 0.01;
      particle.alpha = Math.max(0.1, Math.min(1, particle.alpha));
      return particle;
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
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-red-900 via-orange-800 to-amber-900">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />

      {/* Dancer silhouette 1 */}
      <motion.div
        className="absolute w-32 h-32 opacity-60"
        initial={{ x: "-10%", y: "20%" }}
        animate={{
          x: ["-10%", "70%", "-10%"],
          y: ["20%", "60%", "20%"],
          rotate: [0, 360, 0],
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full filter blur-[1px] text-amber-400">
          <path
            d="M50,20 Q60,20 65,30 T70,50 Q70,70 50,80 Q30,70 30,50 T35,30 Q40,20 50,20"
            fill="currentColor"
          />
        </svg>
      </motion.div>

      {/* Rangoli patterns */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
            width: '100px',
            height: '100px',
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: i * 2,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500/30">
            <path
              d="M50,10 L90,50 L50,90 L10,50 Z M50,20 L80,50 L50,80 L20,50 Z"
              fill="currentColor"
            />
            <circle cx="50" cy="50" r="10" fill="currentColor" />
          </svg>
        </motion.div>
      ))}

      {/* Flowing ribbons */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${30 + i * 20}%`,
            bottom: '0',
            width: '4px',
            height: '200px',
            background: `linear-gradient(to bottom, transparent, ${
              i === 0 ? '#f59e0b' : i === 1 ? '#b45309' : '#92400e'
            })`,
            transformOrigin: 'bottom',
          }}
          animate={{
            skewX: [-15, 15, -15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
