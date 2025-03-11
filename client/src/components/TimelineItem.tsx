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
    >
      <Card>
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