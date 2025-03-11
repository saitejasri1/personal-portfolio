import { motion, useScroll, useTransform } from "framer-motion";

export default function TreeBranches() {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.svg
      className="absolute left-1/2 top-0 h-full -translate-x-1/2 w-40"
      style={{
        opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]),
      }}
      viewBox="0 0 100 1000"
    >
      <motion.path
        d="M50,0 Q50,500 50,1000"
        fill="none"
        stroke="hsl(var(--primary) / 0.2)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        style={{
          pathLength: scrollYProgress,
        }}
      />
      
      {/* Branches for each timeline item */}
      {[0, 1, 2, 3, 4, 5].map((index) => {
        const isEven = index % 2 === 0;
        const y = (index + 1) * 150;
        const branchPath = isEven
          ? `M50,${y} Q30,${y} 0,${y - 20}`
          : `M50,${y} Q70,${y} 100,${y - 20}`;

        return (
          <motion.path
            key={index}
            d={branchPath}
            fill="none"
            stroke="hsl(var(--primary) / 0.2)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            style={{
              pathLength: useTransform(
                scrollYProgress,
                [index / 6, (index + 1) / 6],
                [0, 1]
              ),
            }}
          />
        );
      })}
    </motion.svg>
  );
}
