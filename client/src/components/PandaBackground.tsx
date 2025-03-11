import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function PandaBackground() {
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
    const leaves: Array<{
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

    const createLeaf = () => ({
      x: Math.random() * canvas.width,
      y: -20,
      size: Math.random() * 4 + 2,
      rotation: Math.random() * Math.PI,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`, // Random vibrant colors
      speed: Math.random() * 1 + 0.5,
    });

    const initLeaves = () => {
      leaves.length = 0;
      const density = (canvas.width * canvas.height) / 15000;
      for (let i = 0; i < density; i++) {
        leaves.push(createLeaf());
      }
    };

    const drawLeaf = (leaf: typeof leaves[0]) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);

      // Draw a leaf shape
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        leaf.size * 2, -leaf.size,
        leaf.size * 2, leaf.size,
        0, leaf.size * 3
      );
      ctx.bezierCurveTo(
        -leaf.size * 2, leaf.size,
        -leaf.size * 2, -leaf.size,
        0, 0
      );
      ctx.fillStyle = leaf.color;
      ctx.fill();

      ctx.restore();
    };

    const updateLeaf = (leaf: typeof leaves[0]) => {
      leaf.y += leaf.speed;
      leaf.x += Math.sin(leaf.y * 0.03) * 0.5;
      leaf.rotation += 0.02;

      if (leaf.y > canvas.height + 20) {
        Object.assign(leaf, createLeaf());
      }
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
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-blue-100 via-green-50 to-emerald-100 overflow-hidden">
      {/* Grass Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(0deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />

      {/* Magical Tree */}
      <div className="absolute left-1/4 bottom-0 w-96 h-[600px]">
        {/* Tree Trunk */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-96 bg-gradient-to-t from-amber-800 to-amber-700 rounded-t-full"
          animate={{
            skewX: [-2, 2, -2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Tree Branches */}
        <motion.div
          className="absolute bottom-48 left-1/2 -translate-x-1/2"
          animate={{
            rotate: [-1, 1, -1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="relative"
              style={{
                transform: `rotate(${(i * 72) - 36}deg)`,
              }}
            >
              <div className="absolute w-48 h-8 origin-left bg-gradient-to-r from-amber-800 to-amber-700 rounded-full" />
            </div>
          ))}
        </motion.div>

        {/* Tree Foliage */}
        <motion.div
          className="absolute bottom-48 left-1/2 -translate-x-1/2"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: -200 + i * 50,
                left: -200 + i * 25,
                width: 400 - i * 50,
                height: 400 - i * 50,
              }}
              animate={{
                rotate: [0, i % 2 === 0 ? 5 : -5, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className={`w-full h-full rounded-full bg-gradient-radial from-green-400/80 to-green-600/80`} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Falling Leaves Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
      />

      {/* Rolling Panda */}
      <motion.div
        className="absolute w-32 h-32"
        initial={{ x: "-20%", y: "60%" }}
        animate={{
          x: ["0%", "80%", "0%"],
          y: ["60%", "70%", "60%"],
          rotate: [0, 360 * 3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Panda Body */}
          <circle cx="50" cy="50" r="40" fill="white" />
          {/* Black Patches */}
          <circle cx="35" cy="40" r="10" fill="black" />
          <circle cx="65" cy="40" r="10" fill="black" />
          <circle cx="50" cy="60" r="8" fill="black" />
          <circle cx="30" cy="65" r="12" fill="black" />
          <circle cx="70" cy="65" r="12" fill="black" />
          {/* White Eyes */}
          <circle cx="35" cy="38" r="3" fill="white" />
          <circle cx="65" cy="38" r="3" fill="white" />
          {/* Cute Expression */}
          <path d="M45,65 Q50,70 55,65" stroke="black" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

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
          className="fill-rose-400"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path d="M50,20 Q65,20 75,35 T80,50 Q80,65 50,80 Q20,65 20,50 T25,35 Q35,20 50,20" />
          <circle cx="40" cy="40" r="4" className="fill-white" />
          <path d="M55,45 Q60,45 65,40" className="stroke-white stroke-2 fill-none" />
        </motion.svg>
      </motion.div>
    </div>
  );
}