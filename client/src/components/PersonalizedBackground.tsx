import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function PersonalizedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const leaves: Array<{
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

    const createLeaf = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      alpha: Math.random(),
      speed: Math.random() * 0.5 + 0.2,
    });

    const initLeaves = () => {
      leaves.length = 0;
      const density = (canvas.width * canvas.height) / 10000;
      for (let i = 0; i < density; i++) {
        leaves.push(createLeaf());
      }
    };

    const drawLeaf = (leaf: typeof leaves[0]) => {
      ctx.beginPath();
      ctx.fillStyle = `hsla(120, 40%, 50%, ${leaf.alpha * 0.3})`;
      ctx.ellipse(leaf.x, leaf.y, leaf.size * 2, leaf.size, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    };

    const updateLeaf = (leaf: typeof leaves[0]) => {
      leaf.y += Math.sin(Date.now() * 0.001) * leaf.speed;
      leaf.x += Math.cos(Date.now() * 0.001) * leaf.speed;
      leaf.alpha = Math.sin(Date.now() * 0.001) * 0.5 + 0.5;

      if (leaf.x < 0) leaf.x = canvas.width;
      if (leaf.x > canvas.width) leaf.x = 0;
      if (leaf.y < 0) leaf.y = canvas.height;
      if (leaf.y > canvas.height) leaf.y = 0;
    };

    const animate = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      leaves.forEach((leaf) => {
        updateLeaf(leaf);
        drawLeaf(leaf);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resize();
      initLeaves();
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
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-rose-100 via-emerald-50 to-teal-100 dark:from-rose-950 dark:via-emerald-900 dark:to-teal-950">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />

      {/* Lucky Plant */}
      <motion.div
        className="absolute bottom-0 left-[10%] w-32 h-64"
        animate={{
          skewX: [-5, 5, -5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 100 200" className="w-full h-full text-emerald-600">
          <path
            d="M50,200 Q30,150 50,100 T50,0"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />
          {[...Array(5)].map((_, i) => (
            <path
              key={i}
              d={`M50,${180 - i * 40} Q${70 + i * 5},${160 - i * 40} ${90 + i * 2},${170 - i * 40}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          ))}
        </svg>
      </motion.div>

      {/* Classical Dancer Silhouette */}
      <motion.div
        className="absolute w-48 h-48 opacity-40"
        initial={{ x: "10%", y: "20%" }}
        animate={{
          x: ["10%", "70%", "10%"],
          y: ["20%", "50%", "20%"],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-rose-600">
          <path
            d="M50,10 C60,10 70,20 70,30 C70,40 60,45 50,45 C40,45 30,40 30,30 C30,20 40,10 50,10"
            fill="currentColor"
          />
          <path
            d="M50,45 C70,45 80,60 80,75 C80,90 70,95 50,95 C30,95 20,90 20,75 C20,60 30,45 50,45"
            fill="currentColor"
          />
        </svg>
      </motion.div>

      {/* Squirrel */}
      <motion.div
        className="absolute w-16 h-16"
        initial={{ x: "80%", y: "40%" }}
        animate={{
          x: ["80%", "20%", "80%"],
          y: ["40%", "60%", "40%"],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-700">
          <path
            d="M70,50 C85,35 85,65 70,50 L30,30 C40,50 40,50 30,70 Z"
            fill="currentColor"
          />
          <circle cx="75" cy="45" r="3" fill="currentColor" />
        </svg>
      </motion.div>

      {/* Birds */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8"
          style={{
            left: `${20 + i * 30}%`,
            top: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 30, 0],
            rotate: [-10, 10, -10],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-gray-700">
            <path
              d="M50,50 Q75,25 100,50 M50,50 Q25,25 0,50"
              stroke="currentColor"
              fill="none"
              strokeWidth="8"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
