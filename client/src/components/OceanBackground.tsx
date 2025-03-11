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
      size: Math.random() * 6 + 2, // Increased bubble size
      speed: Math.random() * 2 + 1, // Increased bubble speed
    });

    const initBubbles = () => {
      bubbles.length = 0;
      const density = (canvas.width * canvas.height) / 10000; // Increased bubble density
      for (let i = 0; i < density; i++) {
        bubbles.push(createBubble());
      }
    };

    const drawBubble = (bubble: typeof bubbles[0]) => {
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)"; // Made bubbles more visible
      ctx.fill();
      // Add shine effect to bubbles
      ctx.beginPath();
      ctx.arc(bubble.x - bubble.size/3, bubble.y - bubble.size/3, bubble.size/4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.fill();
    };

    const updateBubble = (bubble: typeof bubbles[0]) => {
      bubble.y -= bubble.speed;
      bubble.x += Math.sin(bubble.y * 0.03) * 0.8; // More pronounced sideways movement

      if (bubble.y < -20) {
        Object.assign(bubble, createBubble());
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 40, 80, 0.1)";
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
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-blue-400 to-blue-900">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-50"
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
          duration: 10, // Faster animation
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full filter blur-[0.5px] text-orange-500">
          <path
            d="M70 50 C85 35, 85 65, 70 50 L30 30 C40 50, 40 50, 30 70 Z"
            fill="currentColor"
          />
          <circle cx="75" cy="50" r="3" fill="white" />
        </svg>
      </motion.div>

      {/* Medium Fish */}
      <motion.div
        className="absolute w-12 h-12"
        initial={{ x: "110%", y: "40%" }}
        animate={{
          x: ["100%", "0%", "100%"],
          y: ["40%", "80%", "40%"],
        }}
        transition={{
          duration: 12, // Faster animation
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full filter blur-[0.5px] text-yellow-500">
          <path
            d="M30 50 C15 35, 15 65, 30 50 L70 30 C60 50, 60 50, 70 70 Z"
            fill="currentColor"
          />
          <circle cx="25" cy="50" r="3" fill="white" />
        </svg>
      </motion.div>

      {/* School of Small Fish */}
      <motion.div
        className="absolute w-32 h-32 opacity-70"
        initial={{ x: "50%", y: "30%" }}
        animate={{
          x: ["50%", "20%", "80%", "50%"],
          y: ["30%", "70%", "50%", "30%"],
        }}
        transition={{
          duration: 15, // Faster animation
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        {[...Array(8)].map((_, i) => ( // Added more fish to the school
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${i * 8}px`,
              top: `${i * 6}px`,
            }}
            animate={{
              x: [0, 5, 0],
              y: [0, 3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          >
            <svg viewBox="0 0 50 50" className="w-6 h-6 text-blue-300">
              <path
                d="M35 25 C42 20, 42 30, 35 25 L15 20 C20 25, 20 25, 15 30 Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}