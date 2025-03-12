import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  index: number;
}

export default function TimelineItem({
  title,
  subtitle,
  period,
  description,
  index,
}: TimelineItemProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative mb-8 ${isEven ? 'ml-0 mr-[50%]' : 'ml-[50%] mr-0'}`}
    >
      {/* Horizontal connecting line */}
      <div 
        className={`absolute top-6 h-[2px] bg-primary/20 ${
          isEven ? 'right-0 w-8' : 'left-0 w-8'
        }`}
      />

      {/* Glowing dot */}
      <div 
        className={`absolute top-5 h-4 w-4 rounded-full bg-primary shadow-[0_0_10px_2px_hsl(var(--primary))] ${
          isEven ? '-right-[8px]' : '-left-[8px]'
        }`}
      />

      <Card className={`relative ${isEven ? 'mr-8' : 'ml-8'} backdrop-blur-sm bg-background/80 border-primary/20`}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <div className="text-sm text-muted-foreground">
            {subtitle} | {period}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground whitespace-pre-line">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}