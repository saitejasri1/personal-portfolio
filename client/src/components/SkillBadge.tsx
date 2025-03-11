import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface SkillBadgeProps {
  skill: string;
  index: number;
}

export default function SkillBadge({ skill, index }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <Badge
        variant="outline"
        className="text-sm py-1 px-3 hover:bg-accent transition-colors"
      >
        {skill}
      </Badge>
    </motion.div>
  );
}
