import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import type { IconType } from "react-icons";

interface SkillBadgeProps {
  name: string;
  icon: IconType;
  index: number;
}

export default function SkillBadge({ name, icon: Icon, index }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="group p-4 hover:bg-accent transition-colors flex flex-col items-center justify-center gap-2 min-w-[120px] aspect-square">
        <Icon className="w-8 h-8 text-primary group-hover:text-primary/80 transition-colors" />
        <span className="text-sm text-center font-medium">{name}</span>
      </Card>
    </motion.div>
  );
}