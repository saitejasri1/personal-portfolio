import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function OceanBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const bubbles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
    }> = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const createBubble = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 20,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 1.5 + 1,
    });

    const initBubbles = () => {
      bubbles.length = 0;
      const density = (canvas.width * canvas.height) / 8000;
      for (let i = 0; i < density; i++) {
        bubbles.push(createBubble());
      }
    };

    const drawBubble = (bubble: typeof bubbles[0]) => {
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(bubble.x - bubble.size/3, bubble.y - bubble.size/3, bubble.size/4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.fill();
    };

    const updateBubble = (bubble: typeof bubbles[0]) => {
      bubble.y -= bubble.speed;
      bubble.x += Math.sin(bubble.y * 0.03) * 0.5;

      if (bubble.y < -20) {
        Object.assign(bubble, createBubble());
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 20, 40, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((bubble) => {
        updateBubble(bubble);
        drawBubble(bubble);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resize();
      initBubbles();
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
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-cyan-600 via-blue-800 to-blue-900">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />

      {/* Large Fish */}
      <motion.div
        className="absolute w-16 h-16"
        initial={{ x: "-10%", y: "20%" }}
        animate={{
          x: ["0%", "100%", "0%"],
          y: ["20%", "60%", "20%"],
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full filter blur-[0.5px] text-amber-400">
          <path
            d="M70 50 C85 35, 85 65, 70 50 L30 30 C40 50, 40 50, 30 70 Z"
            fill="currentColor"
          />
          <circle cx="75" cy="50" r="3" fill="white" />
        </svg>
      </motion.div>

      {/* School of Fish */}
      <motion.div
        className="absolute w-32 h-32 opacity-80"
        initial={{ x: "50%", y: "30%" }}
        animate={{
          x: ["50%", "20%", "80%", "50%"],
          y: ["30%", "70%", "50%", "30%"],
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${i * 6}px`,
              top: `${i * 4}px`,
            }}
            animate={{
              x: [0, 5, 0],
              y: [0, 3, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          >
            <svg viewBox="0 0 50 50" className="w-4 h-4 text-teal-300">
              <path
                d="M35 25 C42 20, 42 30, 35 25 L15 20 C20 25, 20 25, 15 30 Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        ))}
      </motion.div>

      {/* Seaweed */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0"
          style={{
            left: `${15 + i * 20}%`,
            height: '120px',
            width: '20px',
          }}
          animate={{
            skewX: [-15, 15, -15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <div className="w-1 h-full bg-gradient-to-t from-green-700 to-teal-500 rounded-full" />
        </motion.div>
      ))}
    </div>
  );
}