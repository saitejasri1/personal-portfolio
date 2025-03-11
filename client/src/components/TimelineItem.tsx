import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TimelineItemProps {
  company: string;
  position: string;
  period: string;
  description: string;
  index: number;
}

export default function TimelineItem({
  company,
  position,
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
      className={`relative mb-8 ${isEven ? 'ml-0 mr-[50%]' : 'ml-[50%] mr-0'} before:absolute before:top-0 before:h-full before:w-[2px] before:bg-border ${
        isEven ? 'before:right-0' : 'before:left-0'
      }`}
    >
      <div className={`absolute top-6 h-3 w-3 rounded-full bg-primary ${
        isEven ? '-right-[5px]' : '-left-[5px]'
      }`} />
      <Card className={`relative ${isEven ? 'pr-8' : 'pl-8'}`}>
        <CardHeader>
          <CardTitle>{company}</CardTitle>
          <div className="text-sm text-muted-foreground">
            {position} | {period}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground whitespace-pre-line">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}