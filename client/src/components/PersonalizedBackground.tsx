import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function PersonalizedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Smooth spring animation for the bird cursor
  const springX = useSpring(cursorX, { stiffness: 300, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
      color: string;
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
      color: `hsl(${Math.random() * 60 + 320}, 70%, 80%)`,
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
      ctx.fillStyle = `${leaf.color}${Math.floor(leaf.alpha * 255).toString(16).padStart(2, '0')}`;
      ctx.moveTo(leaf.x, leaf.y);
      ctx.bezierCurveTo(
        leaf.x + leaf.size, leaf.y - leaf.size,
        leaf.x + leaf.size * 2, leaf.y + leaf.size,
        leaf.x, leaf.y + leaf.size * 2
      );
      ctx.fill();
    };

    const updateLeaf = (leaf: typeof leaves[0]) => {
      leaf.y += Math.sin(Date.now() * 0.001) * leaf.speed;
      leaf.x += Math.cos(Date.now() * 0.001) * leaf.speed;
      leaf.alpha = Math.sin(Date.now() * 0.001) * 0.3 + 0.7;

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
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 dark:from-pink-950 dark:via-purple-900 dark:to-blue-950">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />

      {/* Flappy Bird Cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          x: springX,
          y: springY,
          rotate: useMotionValue(0)
        }}
        animate={{
          rotate: [-10, 10, -10],
          y: springY.get() + [-5, 5, -5]
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: 1
          },
          y: {
            repeat: Infinity,
            duration: 1.2
          }
        }}
      >
        <svg width="40" height="40" viewBox="0 0 100 100" className="fill-pink-400">
          <path d="M50,20 Q65,20 75,35 T80,50 Q80,65 50,80 Q20,65 20,50 T25,35 Q35,20 50,20" />
          <circle cx="40" cy="40" r="5" className="fill-white" />
          <path d="M55,45 Q60,45 65,40" stroke="white" strokeWidth="3" fill="none" />
        </svg>
      </motion.div>

      {/* Lucky Plant */}
      <motion.div
        className="absolute bottom-0 left-[10%] w-32 h-64"
        animate={{
          skewX: [-3, 3, -3],
          y: [0, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg viewBox="0 0 100 200" className="w-full h-full text-green-400">
          <motion.path
            d="M50,200 Q30,150 50,100 T50,0"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            animate={{
              d: [
                "M50,200 Q30,150 50,100 T50,0",
                "M50,200 Q70,150 50,100 T50,0",
                "M50,200 Q30,150 50,100 T50,0"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {[...Array(5)].map((_, i) => (
            <motion.path
              key={i}
              d={`M50,${180 - i * 40} Q${70 + i * 5},${160 - i * 40} ${90 + i * 2},${170 - i * 40}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              animate={{
                d: [
                  `M50,${180 - i * 40} Q${70 + i * 5},${160 - i * 40} ${90 + i * 2},${170 - i * 40}`,
                  `M50,${180 - i * 40} Q${80 + i * 5},${150 - i * 40} ${95 + i * 2},${165 - i * 40}`,
                  `M50,${180 - i * 40} Q${70 + i * 5},${160 - i * 40} ${90 + i * 2},${170 - i * 40}`
                ]
              }}
              transition={{
                duration: 6,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Cute Squirrel */}
      <motion.div
        className="absolute w-16 h-16"
        initial={{ x: "80%", y: "40%" }}
        animate={{
          x: ["80%", "20%", "80%"],
          y: ["40%", "60%", "40%"],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400">
          <path d="M60,50 C80,30 80,70 60,50 L30,30 C40,50 40,50 30,70 Z" />
          <circle cx="65" cy="45" r="3" className="fill-white" />
          <path d="M70,40 Q75,35 80,40" className="stroke-amber-600 fill-none stroke-2" />
        </svg>
      </motion.div>

      {/* Flying Birds */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8"
          style={{
            left: `${20 + i * 30}%`,
            top: `${10 + i * 15}%`
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 30, 0],
            rotate: [-10, 10, -10]
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-pink-400">
            <motion.path
              d="M50,50 Q75,25 100,50 M50,50 Q25,25 0,50"
              stroke="currentColor"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}