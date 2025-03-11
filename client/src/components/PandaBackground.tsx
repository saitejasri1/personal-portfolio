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

  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-sky-100 via-pink-50 to-emerald-50 overflow-hidden">
      {/* Grass Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-[linear-gradient(0deg,rgba(52,211,153,0.2)_1px,transparent_1px)] bg-[length:30px_30px]" />

      {/* Sunshine Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-yellow-200/20 to-transparent" />

      {/* Cloud Decorations */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${10 + i * 15}%`,
            left: '-20%',
          }}
          animate={{
            left: ['120%', '-20%'],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * -7,
          }}
        >
          <div className="relative w-32 h-16">
            <div className="absolute inset-0 bg-white rounded-full filter blur-sm opacity-80" />
            <div className="absolute top-1/2 left-1/4 w-16 h-12 bg-white rounded-full filter blur-sm opacity-80" />
            <div className="absolute top-1/2 right-1/4 w-16 h-12 bg-white rounded-full filter blur-sm opacity-80" />
          </div>
        </motion.div>
      ))}

      {/* Rolling Panda */}
      <motion.div
        className="absolute w-40 h-40"
        initial={{ x: "-20%", y: "60%" }}
        animate={{
          x: ["0%", "80%", "0%"],
          y: ["60%", "70%", "60%"],
          rotate: [0, 360 * 3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Panda Body */}
          <circle cx="50" cy="50" r="40" fill="white" />
          {/* Black Patches */}
          <circle cx="35" cy="40" r="12" fill="black" />
          <circle cx="65" cy="40" r="12" fill="black" />
          <circle cx="50" cy="60" r="8" fill="black" />
          <ellipse cx="30" cy="65" rx="14" ry="12" fill="black" />
          <ellipse cx="70" cy="65" rx="14" ry="12" fill="black" />
          {/* White Eyes */}
          <circle cx="35" cy="38" r="4" fill="white" />
          <circle cx="65" cy="38" r="4" fill="white" />
          {/* Blush */}
          <circle cx="28" cy="50" r="6" fill="pink" opacity="0.3" />
          <circle cx="72" cy="50" r="6" fill="pink" opacity="0.3" />
          {/* Cute Expression */}
          <path d="M45,65 Q50,68 55,65" stroke="black" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      {/* Floating Hearts */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${20 + i * 15}%`,
            bottom: '-20px',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" className="fill-pink-400">
            <path d="M10,4 C10,0 0,0 0,7 C0,14 10,18 10,18 C10,18 20,14 20,7 C20,0 10,0 10,4 Z" />
          </svg>
        </motion.div>
      ))}

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
          className="fill-pink-400"
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