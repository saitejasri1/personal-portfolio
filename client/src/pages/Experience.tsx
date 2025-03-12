import { motion } from "framer-motion";
import TimelineItem from "@/components/TimelineItem";
import SkillBadge from "@/components/SkillBadge";
import {
  SiPython, SiR, SiRust, SiTensorflow, SiPytorch,
  SiScikitlearn, SiKeras, SiPandas, SiNumpy,
  SiTableau, SiFlask, SiPostman,
  SiMysql, SiPostgresql, SiMongodb, 
  SiApachespark, SiApachehadoop,
  SiGooglecloud, SiDocker, SiStreamlit,
  SiGit, SiGithub, SiJenkins
} from "react-icons/si";
import { TbBrandOpenai, TbChartBar, TbChartLine } from "react-icons/tb";
import { BsDatabaseFill } from "react-icons/bs";
import { FaDatabase, FaChartBar, FaChartLine, FaCloud, FaAws, FaMicrosoft } from "react-icons/fa";

const skillCategories = [
  {
    title: "Programming and Frameworks",
    skills: [
      { name: "Python", icon: SiPython },
      { name: "R", icon: SiR },
      { name: "SQL", icon: BsDatabaseFill },
      { name: "Rust", icon: SiRust },
      { name: "TensorFlow", icon: SiTensorflow },
      { name: "PyTorch", icon: SiPytorch },
      { name: "scikit-learn", icon: SiScikitlearn },
      { name: "Keras", icon: SiKeras },
    ],
  },
  {
    title: "Data Visualization and Backend Development",
    skills: [
      { name: "Pandas", icon: SiPandas },
      { name: "NumPy", icon: SiNumpy },
      { name: "Matplotlib", icon: FaChartLine },
      { name: "Seaborn", icon: FaChartBar },
      { name: "Tableau", icon: SiTableau },
      { name: "Power BI", icon: TbChartBar },
      { name: "RESTful APIs", icon: SiPostman },
      { name: "Flask", icon: SiFlask },
      { name: "Microservices", icon: FaDatabase },
      { name: "MySQL", icon: SiMysql },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Spark", icon: SiApachespark },
      { name: "Hadoop", icon: SiApachehadoop },
    ],
  },
  {
    title: "Cloud and Deployment",
    skills: [
      { name: "AWS", icon: FaAws },
      { name: "Azure", icon: FaMicrosoft },
      { name: "GCP", icon: SiGooglecloud },
      { name: "Flask", icon: SiFlask },
      { name: "Docker", icon: SiDocker },
      { name: "Streamlit", icon: SiStreamlit },
      { name: "Dash", icon: TbChartBar },
    ],
  },
  {
    title: "Other",
    skills: [
      { name: "LLM Optimization", icon: TbBrandOpenai },
      { name: "NLP", icon: TbBrandOpenai },
      { name: "Database Management", icon: FaDatabase },
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "CI/CD (Jenkins)", icon: SiJenkins },
    ],
  },
];

const experiences = [
  {
    title: "All of Us Research Hub, SDSU, San Diego, USA",
    subtitle: "Research Assistant – Data Analysis",
    period: "Jun 2024 – Present",
    description: "• Led analysis of health data from 14,470 pregnant women using BigQuery and Python\n• Processed 245,675 genomic data points with PLINK for PIH research\n• Created data visualizations and insights using Plotly and Jupyter",
  },
  {
    title: "Zip Launchpad, San Diego, CA",
    subtitle: "Data Scientist",
    period: "Jan 2024 – June 2024",
    description: "• Improved program satisfaction by 20% using NLP for survey analysis\n• Reduced manual effort by 40% with PySpark and Airflow pipelines\n• Built predictive models reducing underutilization by 25%",
  },
  {
    title: "Digital Innovation Lab",
    subtitle: "AI Research Intern",
    period: "Jun 2023 – Aug 2023",
    description: "• Built LLM-powered mentor-mentee chatbot increasing engagement by 40%\n• Fine-tuned Mistral 7B improving accuracy by 18%\n• Optimized LLM deployment reducing latency by 25%",
  },
  {
    title: "Temenos, Hyderabad, India",
    subtitle: "Software Product Engineer",
    period: "Aug 2021 – Aug 2023",
    description: "• Resolved 200+ Jira tickets for Transact and Infinity products\n• Built front-end microservices handling 100 concurrent transactions\n• Streamlined CI/CD reducing deployment errors by 30%",
  },
  {
    title: "Knowledge Solutions India",
    subtitle: "Summer Intern",
    period: "Jul 2020 - Aug 2020",
    description: "• Completed ML internship focusing on sentiment analysis\n• Developed user management system with Python and SQL\n• Implemented data preprocessing pipelines",
  },
  {
    title: "Stanford d.school",
    subtitle: "University Innovation Fellow",
    period: "Jul 2019 - Aug 2021",
    description: "• Selected as Design Thinking Workshop apprentice among 330 colleges\n• Led innovation initiatives at Center for Innovation and Entrepreneurship\n• Organized Silicon Valley meetup at Stanford University",
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
          Professional Experience & Skills
        </motion.h1>

        {/* Skills Section */}
        <section className="mb-16">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {skillCategories.map((category, categoryIndex) => (
              <div key={category.title} className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBadge
                      key={skill.name}
                      name={skill.name}
                      icon={skill.icon}
                      index={categoryIndex * 10 + skillIndex}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </section>

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