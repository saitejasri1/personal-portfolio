import { motion } from "framer-motion";

export default function TreeBranches() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main trunk */}
      <motion.svg
        className="absolute left-1/2 h-full w-40 -translate-x-1/2"
        viewBox="0 0 100 1000"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Main trunk with animation */}
        <motion.path
          d="M50,0 Q50,500 50,1000"
          fill="none"
          stroke="hsl(335, 30%, 40%)"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Generate branches with sequential animation */}
        {Array.from({ length: 8 }).map((_, index) => {
          const y = (index + 1) * 120;
          const isRight = index % 2 === 0;
          const branchPath = isRight
            ? `M50,${y} Q70,${y} 100,${y - 20}`
            : `M50,${y} Q30,${y} 0,${y - 20}`;

          return (
            <motion.path
              key={`branch-${index}`}
              d={branchPath}
              fill="none"
              stroke="hsl(335, 30%, 40%)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                delay: 1 + index * 0.2,
                duration: 1.5,
                ease: "easeInOut"
              }}
            />
          );
        })}

        {/* Add blossoms with staggered animation */}
        {Array.from({ length: 12 }).map((_, index) => {
          const x = Math.sin(index) * 30 + 50;
          const y = index * 80 + 100;

          return (
            <motion.g key={`blossom-${index}`}>
              <motion.circle
                cx={x}
                cy={y}
                r="4"
                fill="hsl(335, 80%, 85%)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1],
                  opacity: 1
                }}
                transition={{
                  delay: 2 + index * 0.1,
                  duration: 0.5,
                  ease: "easeOut"
                }}
              />
              <motion.circle
                cx={x}
                cy={y}
                r="6"
                fill="none"
                stroke="hsl(335, 80%, 85%)"
                strokeWidth="1"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.5, 1],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  delay: 2 + index * 0.1,
                  duration: 1,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
            </motion.g>
          );
        })}
      </motion.svg>
    </div>
  );
}