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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-border"
    >
      <div className="absolute left-0 top-6 h-3 w-3 -translate-x-[5px] rounded-full bg-primary" />
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{company}</CardTitle>
          <div className="text-sm text-muted-foreground">
            {position} | {period}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
