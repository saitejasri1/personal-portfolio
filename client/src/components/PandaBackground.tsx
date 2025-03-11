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
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-blue-100 via-green-50 to-emerald-100 overflow-hidden">
      {/* Grass Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(0deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />

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
          <circle cx="35" cy="40" r="10" fill="black" /> {/* Left Eye Patch */}
          <circle cx="65" cy="40" r="10" fill="black" /> {/* Right Eye Patch */}
          <circle cx="50" cy="60" r="8" fill="black" /> {/* Nose */}
          <circle cx="30" cy="65" r="12" fill="black" /> {/* Left Ear */}
          <circle cx="70" cy="65" r="12" fill="black" /> {/* Right Ear */}
          {/* White Eyes */}
          <circle cx="35" cy="38" r="3" fill="white" />
          <circle cx="65" cy="38" r="3" fill="white" />
          {/* Cute Expression */}
          <path d="M45,65 Q50,70 55,65" stroke="black" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      {/* Butterflies */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-6 h-6"
          style={{
            left: `${20 + i * 15}%`,
            top: `${20 + (i % 3) * 15}%`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            rotate: [-10, 10, -10],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full text-pink-400">
            <path
              d="M12,2 L16,8 L12,14 L8,8 Z"
              fill="currentColor"
              opacity="0.8"
            />
            <path
              d="M12,14 L16,20 L12,22 L8,20 Z"
              fill="currentColor"
              opacity="0.6"
            />
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

      {/* Flowers */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0"
          style={{
            left: `${10 + i * 12}%`,
            width: '20px',
            height: '40px',
          }}
          animate={{
            y: [0, -5, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 2 + i % 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          <div className="w-1 h-full bg-green-500 rounded-full" />
          <motion.div
            className="absolute -top-4 left-1/2 -translate-x-1/2"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...Array(5)].map((_, j) => (
              <div
                key={j}
                className="absolute w-3 h-3"
                style={{
                  transform: `rotate(${j * 72}deg) translateY(-6px)`,
                }}
              >
                <div className="w-full h-full rounded-full bg-pink-300" />
              </div>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
