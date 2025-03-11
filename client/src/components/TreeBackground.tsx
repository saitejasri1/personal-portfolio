import { motion } from "framer-motion";

export default function TreeBackground() {
  return (
    <div className="fixed inset-0 -z-5 pointer-events-none overflow-hidden">
      <motion.svg
        viewBox="0 0 400 600"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[80vh] w-auto opacity-20"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1 }}
      >
        {/* Tree trunk */}
        <path
          d="M180 550 Q190 400 200 300 Q210 400 220 550"
          fill="hsl(30, 40%, 30%)"
        />
        
        {/* Tree base roots */}
        <path
          d="M160 550 Q180 540 200 550 Q220 540 240 550"
          fill="hsl(30, 40%, 25%)"
        />
        
        {/* Tree branches and leaves - multiple layers for depth */}
        <g fill="hsl(150, 40%, 30%)">
          {/* Bottom layer */}
          <path d="M100 400 Q200 200 300 400 Q200 350 100 400" />
          {/* Middle layer */}
          <path d="M120 300 Q200 100 280 300 Q200 250 120 300" />
          {/* Top layer */}
          <path d="M140 200 Q200 50 260 200 Q200 150 140 200" />
        </g>
        
        {/* Decorative elements */}
        <g fill="hsl(150, 40%, 40%)" opacity="0.7">
          <circle cx="180" cy="250" r="10" />
          <circle cx="220" cy="280" r="12" />
          <circle cx="190" cy="180" r="8" />
          <circle cx="240" cy="350" r="15" />
          <circle cx="160" cy="320" r="13" />
        </g>
      </motion.svg>
    </div>
  );
}
