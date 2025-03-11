import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import SkillBadge from "@/components/SkillBadge";

const skills = [
  "Python",
  "R",
  "SQL",
  "Rust",
  "TensorFlow",
  "PyTorch",
  "scikit-learn",
  "AWS",
  "NLP",
  "Data Visualization",
];

const hobbies = [
  { title: "Cooking", description: "Exploring world cuisines and experimenting with new recipes" },
  { title: "Traveling", description: "Discovering new cultures and capturing memories" },
  { title: "Blogging", description: "Sharing insights about AI and technology" },
];

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Profile Section */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-accent/5">
            <img
              src="/20241002_113439.jpg"
              alt="Sai Tejasri Yerramsetti"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">About Me</h1>
            <p className="text-muted-foreground">
              I'm a passionate Data Scientist and AI Engineer with a strong foundation
              in machine learning and software development. I love tackling complex
              problems and turning data into actionable insights.
            </p>
            <Button asChild>
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>
        </section>

        {/* Skills Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <SkillBadge key={skill} skill={skill} index={index} />
            ))}
          </div>
        </section>

        {/* Hobbies Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Hobbies</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {hobbies.map((hobby, index) => (
              <motion.div
                key={hobby.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg bg-card"
              >
                <h3 className="font-semibold mb-2">{hobby.title}</h3>
                <p className="text-sm text-muted-foreground">{hobby.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}