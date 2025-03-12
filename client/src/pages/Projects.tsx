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
    title: "PIXEL TO PLATE: Recipe Discovery",
    description: "Built an innovative recipe generation system using ML and computer vision. Features include recipe scraping, NLP-based categorization, and personalized recommendations.",
    technologies: ["Python", "OpenCV", "Deep Learning", "NLP", "Web Scraping"],
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1/Shared-ML-project"
  },
  {
    title: "Virtual Consultation Chrome Extension",
    description: "Developed a Chrome extension for virtual medical consultations with real-time emotion detection and LLM-generated medical summaries.",
    technologies: ["WebRTC", "TensorFlow.js", "OpenAI GPT-4", "MongoDB", "Langchain"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1"
  },
  {
    title: "Chicago Crime Analysis & Prediction",
    description: "Built an interactive crime prediction system using time series modeling and machine learning, featuring real-time predictions and trend analysis.",
    technologies: ["Python", "Time Series Analysis", "Streamlit", "Machine Learning"],
    image: "https://images.unsplash.com/photo-1575916167835-51cc0f6d966f?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1/Chicago-Crime-Analysis"
  },
  {
    title: "Global Terrorism Analysis Dashboard",
    description: "Created a comprehensive dashboard for analyzing global terrorism data with interactive visualizations across multiple dimensions.",
    technologies: ["Streamlit", "Plotly", "Pandas", "Data Analysis"],
    image: "https://images.unsplash.com/photo-1553484771-047a44eee27a?auto=format&fit=crop&q=80",
    github: "https://github.com/saitejasri1/Globalterror"
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