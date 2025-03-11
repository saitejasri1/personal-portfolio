import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "Pixel to Plate",
    description: "A deep learning-powered recipe discovery platform that generates recipes from food images using computer vision and NLP.",
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    image: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8",
    github: "https://github.com/yourusername/pixel-to-plate",
  },
  {
    title: "Audio Feedback Processing Platform",
    description: "Platform for analyzing customer feedback audio using speech-to-text and sentiment analysis.",
    technologies: ["Python", "PyTorch", "NLP", "AWS"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    github: "https://github.com/yourusername/audio-feedback",
  },
  {
    title: "Crime Type Prediction App",
    description: "Machine learning application built with Streamlit for predicting crime types based on various features.",
    technologies: ["Python", "scikit-learn", "Streamlit", "Pandas"],
    image: "https://images.unsplash.com/photo-1739514984003-330f7c1d2007",
    github: "https://github.com/yourusername/crime-prediction",
  },
];

export default function Projects() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12"
    >
      <div className="max-w-6xl mx-auto">
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
