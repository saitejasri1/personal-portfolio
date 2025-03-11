import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import TimelineItem from "@/components/TimelineItem";
import { Rocket } from "lucide-react";

const experiences = [
  {
    company: "All of Us Research Hub, SDSU, San Diego, USA",
    position: "Research Assistant – Data Analysis",
    period: "June 2023 – Present",
    description: `Conducted extensive analysis of health data from 14,470 pregnant women, which encompassed demographics, sleep habits, and socio-economic variables. Engaged BigQuery, Python, and SQL to uncover correlations associated with Pregnancy Induced Hypertension (PIH).

Orchestrated PLINK to process and analyze 245,675 genomic data points, identifying gene variants linked to PIH in 2nd and 3rd trimester pregnancies.

Developed data visualizations using Plotly and generated actionable insights via Jupyter Notebook, improving maternal health outcomes by assessing PIH risks.`,
  },
  {
    company: "Zip Launchpad, San Diego, CA",
    position: "Data Scientist",
    period: "Jan 2024 – June 2024",
    description: `• Developed and deployed NLP models to analyze open-ended survey responses at scale, improving program satisfaction by 20%.
• Automated data preprocessing pipelines using PySpark and Airflow, reducing manual effort by 40%.
• Built predictive models using ARIMA and Prophet, reducing underutilization by 25%.
• Designed interactive dashboards leveraging Etrack survey data (2020-2024), providing real-time insights for data-driven decision-making.`,
  },
  {
    company: "Digital Innovation Lab",
    position: "AI Research Intern",
    period: "Jun 2023 – Aug 2023",
    description: `• Developed an LLM-powered mentor-mentee chatbot using TogetherAI API and RAG, increasing engagement by 40%.
• Fine-tuned Mistral 7B for summarization and sentiment analysis, improving accuracy by 18%.
• Built a real-time sentiment analysis pipeline using Spark and PyTorch, improving retention by 25%.
• Optimized LLM deployment on AWS, reducing model latency by 25%.
• Implemented continuous learning with cloud-stored embeddings, boosting response relevance by 15%.`,
  },
  {
    company: "Temenos, Hyderabad, India",
    position: "Software Product Engineer",
    period: "Aug 2021 – Aug 2023",
    description: `• Resolved over 200 Jira tickets and debugged workflows for Transact and Infinity products.
• Architected front-end microservices using Visualizer, handling 100 concurrent transactions.
• Designed scalable microservices, reducing deployment time by 30%.
• Streamlined CI/CD pipelines, reducing deployment errors by 30%.
• Engineered API-driven solutions, increasing satisfaction scores by 12%.`,
  },
  {
    company: "Stanford d.school",
    position: "University Innovation Fellow",
    period: "Jul 2019 - Aug 2021",
    description: `Participated in the prestigious Design Thinking Workshop as an apprentice, joining students from 330 colleges worldwide at the Silicon Valley meetup at Stanford University. Led initiatives as an organizer for the Center for Innovation and Entrepreneurship, fostering innovation and entrepreneurial mindset among students.`,
  },
  {
    company: "Knowledge Solutions India",
    position: "Summer Intern",
    period: "Jul 2020 - Aug 2020",
    description: `Completed machine learning internship focusing on customer review sentiment analysis and user management project development.`,
  },
];

export default function Experience() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const rocketY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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

        {/* Timeline container */}
        <div className="relative pl-8">
          {/* Continuous timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-primary/20" />

          {/* Rocket indicator */}
          <motion.div
            className="absolute left-0 -translate-x-[5px]"
            style={{ 
              y: rocketY,
              scale: useSpring(scrollYProgress, {
                stiffness: 200,
                damping: 20,
                restDelta: 0.001
              })
            }}
          >
            <Rocket 
              className="h-6 w-6 text-primary transform rotate-90" 
            />
            {/* Rocket trail effect */}
            <motion.div 
              className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2"
              style={{
                background: "radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)",
                filter: "blur(4px)"
              }}
            />
          </motion.div>

          {/* Experience items */}
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