import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "Ripl Hackathon Challenge - Neo4j Matching App",
    description: "Developed a full-stack MVP web app using Replit and Neo4j for matching users based on survey data for technical meetups. Integrated LinkedIn, GitHub, and OpenAI APIs for enhanced matching logic.",
    technologies: ["Neo4j", "React", "Node.js", "OpenAI API", "LinkedIn API", "GitHub API"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1"
  },
  {
    title: "Sharp Hospital Audio Feedback System",
    description: "Led development of a hospital feedback platform integrating speech-to-text, sentiment analysis, and text summarization. Reduced manual analysis time by 70% with real-time processing.",
    technologies: ["Flask", "React", "Python", "WebSockets", "PyTorch", "NLP"],
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1/medev"
  },
  {
    title: "COPD Regression Analysis",
    description: "Comprehensive analysis of COPD dataset to uncover variables associated with emphysema severity. Used univariable and multivariable regression with advanced data visualization.",
    technologies: ["Python", "Regression Analysis", "Data Visualization", "Statistical Analysis"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1/-Investigating-Emphysema-Severity-in-COPD-A-Regression-Approach-"
  },
  {
    title: "Credit Card Fraud Detection",
    description: "Developed fraud detection system using Gradient Boosting algorithms to identify fraudulent transactions in an imbalanced dataset.",
    technologies: ["Python", "Machine Learning", "Gradient Boosting", "Data Analysis"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1/credit-card-fraud-detection"
  },
  {
    title: "Restaurant Reviews Sentiment Analysis",
    description: "Built sentiment analysis system for restaurant reviews using SVM and PCA. Implemented NLP techniques for text preprocessing and feature extraction.",
    technologies: ["Python", "NLP", "SVM", "PCA", "Text Classification"],
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1/Sentiment-Analysis-on-Restaurant-Reviews"
  },
  {
    title: "Human Emotion Classification",
    description: "Developed emotion classification system using EEG readings and advanced ML techniques including RNN and KNN to predict emotional states.",
    technologies: ["Python", "RNN", "KNN", "EEG Analysis", "Machine Learning"],
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1/Human-Emotion-Classification"
  },
  {
    title: "California Housing Price Prediction",
    description: "Analyzed and predicted housing prices using California Census Data, implementing regression models based on population and income features.",
    technologies: ["Python", "Regression", "Data Analysis", "Feature Engineering"],
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1/100-days-of-Data-Science-Code/tree/main/Day%202%20California%20Census%20Price%20"
  },
  {
    title: "PIXEL TO PLATE: Recipe Discovery",
    description: "Built an innovative recipe generation system using ML and computer vision. Features include recipe scraping, NLP-based categorization, and personalized recommendations.",
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