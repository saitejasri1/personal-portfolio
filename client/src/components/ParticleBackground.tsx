import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { stiffness: 300, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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
    const petals: Array<{
      x: number;
      y: number;
      size: number;
      rotation: number;
      color: string;
      speed: number;
    }> = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const createPetal = () => ({
      x: Math.random() * canvas.width,
      y: -20,
      size: Math.random() * 4 + 2,
      rotation: Math.random() * Math.PI,
      color: `hsl(${Math.random() * 40 + 330}, 70%, 85%)`, // Cherry blossom colors
      speed: Math.random() * 1 + 0.5,
    });

    const initPetals = () => {
      petals.length = 0;
      const density = (canvas.width * canvas.height) / 20000;
      for (let i = 0; i < density; i++) {
        petals.push(createPetal());
      }
    };

    const drawPetal = (petal: typeof petals[0]) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);

      // Draw a flower petal shape
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(petal.size * 2, -petal.size, 0, petal.size * 3);
      ctx.quadraticCurveTo(-petal.size * 2, -petal.size, 0, 0);
      ctx.fillStyle = petal.color;
      ctx.fill();

      ctx.restore();
    };

    const updatePetal = (petal: typeof petals[0]) => {
      petal.y += petal.speed;
      petal.x += Math.sin(petal.y * 0.03) * 0.5;
      petal.rotation += 0.01;

      if (petal.y > canvas.height + 20) {
        Object.assign(petal, createPetal());
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      petals.forEach((petal) => {
        updatePetal(petal);
        drawPetal(petal);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resize();
      initPetals();
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
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-rose-50 via-slate-50 to-indigo-50">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
      />

      {/* Bird Cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          x: springX,
          y: springY,
        }}
      >
        <motion.svg 
          width="40" 
          height="40" 
          viewBox="0 0 100 100"
          className="fill-primary/80"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M50,20 Q65,20 75,35 T80,50 Q80,65 50,80 Q20,65 20,50 T25,35 Q35,20 50,20" />
          <circle cx="40" cy="40" r="4" className="fill-white" />
          <path d="M55,45 Q60,45 65,40" className="stroke-white stroke-2 fill-none" />
        </motion.svg>
      </motion.div>

      {/* Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    </div>
  );
}