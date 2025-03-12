import { motion } from "framer-motion";
import TimelineItem from "@/components/TimelineItem";

const experiences = [
  {
    title: "All of Us Research Hub, SDSU, San Diego, USA",
    subtitle: "Research Assistant – Data Analysis",
    period: "Jun 2024 – Present",
    description: `Conducted extensive analysis of health data from 14,470 pregnant women, which encompassed demographics, sleep habits, and socio-economic variables. Engaged BigQuery, Python, and SQL to uncover correlations associated with Pregnancy Induced Hypertension (PIH).

Orchestrated PLINK to process and analyze 245,675 genomic data points, identifying gene variants linked to PIH in 2nd and 3rd trimester pregnancies.

Developed data visualizations using Plotly and generated actionable insights via Jupyter Notebook, improving maternal health outcomes by assessing PIH risks.`,
  },
  {
    title: "Zip Launchpad, San Diego, CA",
    subtitle: "Data Scientist",
    period: "Jan 2024 – June 2024",
    description: `• Developed and deployed NLP models to analyze open-ended survey responses at scale, improving program satisfaction by 20%.
• Automated data preprocessing pipelines using PySpark and Airflow, reducing manual effort by 40%.
• Built predictive models using ARIMA and Prophet, reducing underutilization by 25%.
• Designed interactive dashboards leveraging Etrack survey data (2020-2024), providing real-time insights for data-driven decision-making.`,
  },
  {
    title: "Digital Innovation Lab",
    subtitle: "AI Research Intern",
    period: "Jun 2023 – Aug 2023",
    description: `• Developed an LLM-powered mentor-mentee chatbot using TogetherAI API and RAG, increasing engagement by 40%.
• Fine-tuned Mistral 7B for summarization and sentiment analysis, improving accuracy by 18%.
• Built a real-time sentiment analysis pipeline using Spark and PyTorch, improving retention by 25%.
• Optimized LLM deployment on AWS, reducing model latency by 25%.
• Implemented continuous learning with cloud-stored embeddings, boosting response relevance by 15%.`,
  },
  {
    title: "Temenos, Hyderabad, India",
    subtitle: "Software Product Engineer",
    period: "Aug 2021 – Aug 2023",
    description: `• Resolved over 200 Jira tickets and debugged workflows for Transact and Infinity products.
• Architected front-end microservices using Visualizer, handling 100 concurrent transactions.
• Designed scalable microservices, reducing deployment time by 30%.
• Streamlined CI/CD pipelines, reducing deployment errors by 30%.
• Engineered API-driven solutions, increasing satisfaction scores by 12%.`,
  },
  {
    title: "Stanford d.school",
    subtitle: "University Innovation Fellow",
    period: "Jul 2019 - Aug 2021",
    description: `Participated in the prestigious Design Thinking Workshop as an apprentice, joining students from 330 colleges worldwide at the Silicon Valley meetup at Stanford University. Led initiatives as an organizer for the Center for Innovation and Entrepreneurship, fostering innovation and entrepreneurial mindset among students.`,
  },
  {
    title: "Knowledge Solutions India",
    subtitle: "Summer Intern",
    period: "Jul 2020 - Aug 2020",
    description: `Completed machine learning internship focusing on customer review sentiment analysis and user management project development.`,
  },
];

export default function Experience() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12 relative min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-12 text-center"
        >
          Professional Experience
        </motion.h1>

        {/* Timeline container */}
        <div className="relative">
          {/* Animated central line */}
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent -translate-x-1/2"
          />

          {/* Experience items */}
          <div className="relative">
            {experiences.map((experience, index) => (
              <TimelineItem
                key={experience.title}
                title={experience.title}
                subtitle={experience.subtitle}
                period={experience.period}
                description={experience.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}