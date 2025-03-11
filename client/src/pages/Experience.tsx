import { motion } from "framer-motion";
import TimelineItem from "@/components/TimelineItem";

const experiences = [
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Professional Experience</h1>
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
