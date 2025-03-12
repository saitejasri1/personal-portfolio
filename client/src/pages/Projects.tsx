import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "Global Terrorism Analysis Dashboard",
    description: "Comprehensive dashboard analyzing terrorism data with interactive visualizations for temporal trends, geospatial patterns, and attack characteristics.",
    technologies: ["Streamlit", "Plotly", "Python", "Geospatial Analysis", "Data Visualization"],
    image: "https://images.unsplash.com/photo-1553484771-047a44eee27a?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1/Globalterror"
  },
  {
    title: "COPD Severity Analysis",
    description: "Comprehensive regression analysis of COPD dataset to uncover variables affecting emphysema severity. Implements advanced statistical methods and visualization techniques.",
    technologies: ["Python", "Statistical Analysis", "Data Visualization", "Regression Models"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1/-Investigating-Emphysema-Severity-in-COPD-A-Regression-Approach-"
  },
  {
    title: "Restaurant Reviews Sentiment Analysis",
    description: "Advanced sentiment analysis system analyzing 1000+ restaurant reviews using SVM and PCA. Features NLP preprocessing, feature extraction, and binary sentiment classification.",
    technologies: ["Python", "NLP", "SVM", "PCA", "Text Classification"],
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1/Sentiment-Analysis-on-Restaurant-Reviews"
  },
  {
    title: "California Housing Price Prediction",
    description: "Analyzed California Census housing data to predict prices using regression models. Features population, income, and location-based analysis for districts with 600-3000 residents.",
    technologies: ["Python", "Regression", "Census Data", "Feature Engineering"],
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1/100-days-of-Data-Science-Code/tree/main/Day%202%20California%20Census%20Price%20"
  },
  {
    title: "Physics Quiz Generator",
    description: "Advanced quiz generation system for physics TAs, featuring PDF equation conversion, customizable difficulty levels, and automated grading with feedback.",
    technologies: ["FastAPI", "Claude AI", "Python", "LLM", "PDF Processing"],
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1"
  },
  {
    title: "Portfolio Generator",
    description: "BDA 600 capstone project for automatically generating professional portfolio websites from resume data. Currently in development.",
    technologies: ["React", "TypeScript", "AI/ML", "Web Development"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1/PortResumes"
  },
  {
    title: "Ripl Hackathon - Neo4j Matching App",
    description: "Full-stack MVP web app using Replit and Neo4j for matching users based on survey data for technical meetups. Integrated with LinkedIn, GitHub, and OpenAI APIs.",
    technologies: ["Neo4j", "React", "Node.js", "OpenAI API", "LinkedIn API"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1"
  },
  {
    title: "Sharp Hospital Audio Feedback",
    description: "Led development of a hospital feedback platform integrating speech-to-text, sentiment analysis, and text summarization. Reduced manual analysis time by 70%.",
    technologies: ["Flask", "React", "Python", "WebSockets", "PyTorch"],
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1/medev"
  },
  {
    title: "Credit Card Fraud Detection",
    description: "Advanced fraud detection system using Gradient Boosting algorithms to identify fraudulent transactions in highly imbalanced datasets.",
    technologies: ["Python", "Machine Learning", "Gradient Boosting", "Data Analysis"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1/credit-card-fraud-detection"
  },
  {
    title: "PIXEL TO PLATE: Recipe Discovery",
    description: "Innovative recipe generation system using ML and computer vision. Features recipe scraping, NLP-based categorization, and personalized recommendations.",
    technologies: ["Python", "OpenCV", "Deep Learning", "NLP", "Web Scraping"],
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1/Shared-ML-project"
  }
];

export default function Projects() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Projects</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}