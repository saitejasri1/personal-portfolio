import { motion, useScroll, useTransform } from "framer-motion";

export default function TreeBranches() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main trunk */}
      <motion.svg
        className="absolute left-1/2 h-full w-40 -translate-x-1/2"
        viewBox="0 0 100 1000"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.path
          d="M50,0 Q50,500 50,1000"
          fill="none"
          stroke="hsl(335, 30%, 40%)"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          style={{ pathLength: scrollYProgress }}
        />

        {/* Generate branches */}
        {Array.from({ length: 8 }).map((_, index) => {
          const y = (index + 1) * 120;
          const isRight = index % 2 === 0;
          const branchPath = isRight
            ? `M50,${y} Q70,${y} 100,${y - 20}`
            : `M50,${y} Q30,${y} 0,${y - 20}`;

          return (
            <motion.path
              key={index}
              d={branchPath}
              fill="none"
              stroke="hsl(335, 30%, 40%)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              style={{
                pathLength: useTransform(
                  scrollYProgress,
                  [index / 8, (index + 1) / 8],
                  [0, 1]
                ),
              }}
            />
          );
        })}

        {/* Add blossoms */}
        {Array.from({ length: 12 }).map((_, index) => {
          const x = Math.sin(index) * 30 + 50;
          const y = index * 80 + 100;

          return (
            <motion.circle
              key={`blossom-${index}`}
              cx={x}
              cy={y}
              r="4"
              fill="hsl(335, 80%, 85%)"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: "easeOut"
              }}
            />
          );
        })}
      </motion.svg>
    </div>
  );
}