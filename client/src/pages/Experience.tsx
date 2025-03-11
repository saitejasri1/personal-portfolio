import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import TimelineItem from "@/components/TimelineItem";
import { Rocket } from "lucide-react";

const experiences = [
  {
    company: "All of Us Research Hub, SDSU",
    position: "Research Assistant – Data Analysis",
    period: "June 2023 – Present",
    description: "Conducted extensive analysis of health data from 14,470 pregnant women, encompassing demographics, sleep habits, and socio-economic variables. Used BigQuery, Python, and SQL to uncover correlations associated with Pregnancy Induced Hypertension (PIH). Orchestrated PLINK for analyzing 245,675 genomic data points and developed visualizations using Plotly.",
  },
  {
    company: "Zip Launchpad",
    position: "Data Scientist",
    period: "Jan 2024 – June 2024",
    description: "Developed NLP models for text analysis, automated data pipelines, and built predictive models for business insights.",
  },
  {
    company: "Digital Innovation Lab",
    position: "AI Research Intern",
    period: "Jun 2023 – Aug 2023",
    description: "Created LLM-powered chatbots for customer service and optimized AI models for improved performance.",
  },
  {
    company: "Temenos",
    position: "Software Engineer",
    period: "Aug 2021 – Aug 2023",
    description: "Debugged complex workflows, built microservices, and improved CI/CD pipelines for faster deployment.",
  },
];

export default function Experience() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Use useTransform instead of interpolate
  const rocketX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Professional Experience</h1>

        {/* Progress bar */}
        <motion.div 
          className="fixed top-16 left-0 right-0 h-1 bg-primary/20"
          style={{ scaleX }}
        />

        {/* Rocket indicator */}
        <motion.div
          className="fixed top-14 left-0"
          style={{ x: rocketX }}
        >
          <Rocket className="h-6 w-6 text-primary transform -rotate-90" />
        </motion.div>

        <div className="space-y-4">
          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.company}
              {...experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}