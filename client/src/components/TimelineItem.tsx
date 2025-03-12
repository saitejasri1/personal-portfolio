import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  period: string;
  index: number;
}

export default function TimelineItem({
  title,
  subtitle,
  period,
  index,
}: TimelineItemProps) {
  const isEven = index % 2 === 0;

  // Extract year and month from period
  const dateMatch = period.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})/);
  const month = dateMatch?.[1];
  const year = dateMatch?.[2];

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
      }}
      className={`relative mb-16 ${isEven ? 'ml-0 mr-[50%]' : 'ml-[50%] mr-0'}`}
    >
      {/* Horizontal connecting line with animation */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "2rem" }}
        transition={{ 
          duration: 0.3,
          delay: index * 0.2 + 0.3,
          type: "spring"
        }}
        className={`absolute top-6 h-[2px] bg-primary/20 ${
          isEven ? 'right-0' : 'left-0'
        }`}
      />

      {/* Date marker */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          duration: 0.3,
          delay: index * 0.2 + 0.2,
          type: "spring",
          stiffness: 200
        }}
        className={`absolute top-4 ${isEven ? '-right-16' : '-left-16'} flex flex-col items-center`}
      >
        <span className="text-sm font-medium text-primary">{year}</span>
        <span className="text-xs text-muted-foreground">{month}</span>
      </motion.div>

      {/* Glowing dot with pulse animation */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          duration: 0.3,
          delay: index * 0.2 + 0.2
        }}
        className={`absolute top-5 h-4 w-4 rounded-full bg-primary ${
          isEven ? '-right-[8px]' : '-left-[8px]'
        }`}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full bg-primary/50"
        />
      </motion.div>

      {/* Card with hover effect */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <Card className={`relative ${isEven ? 'mr-8' : 'ml-8'} backdrop-blur-sm bg-background/80 border-primary/20 hover:border-primary/40 transition-colors`}>
          <CardHeader>
            <CardTitle className="text-primary">{title}</CardTitle>
            <div className="text-sm text-muted-foreground">
              {subtitle} | {period}
            </div>
          </CardHeader>
        </Card>
      </motion.div>
    </motion.div>
  );
}