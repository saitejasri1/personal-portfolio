import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import SkillBadge from "@/components/SkillBadge";
import ImageCarousel from "@/components/ImageCarousel";

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

const cookingImages = [
  { src: "/images/cooking1.jpg", alt: "Grilling spicy chicken on a barbecue" },
  { src: "/images/cooking2.jpg", alt: "Colorful Indian street food platter" },
  { src: "/images/cooking3.jpg", alt: "Homemade manchurian dish" },
  { src: "/images/cooking4.jpg", alt: "Delicious spicy food creation" },
];

const travelImages = [
  { src: "/images/travel/travel1.jpg", alt: "Serene temple architecture" },
  { src: "/images/travel/travel2.jpg", alt: "Beautiful sunset at the beach" },
  { src: "/images/travel/travel3.jpg", alt: "Peaceful pilgrimage destination" },
];

const hobbies = [
  {
    title: "Cooking",
    description: "Exploring world cuisines and experimenting with new recipes. I love creating both traditional dishes and fusion experiments. My specialties include Indian street food, Asian cuisine, and barbecue.",
    showCarousel: true,
    images: cookingImages,
  },
  {
    title: "Traveling",
    description: "I have a deep appreciation for nature's beauty and spiritual places. I love spending time at beaches watching sunrises and sunsets, visiting ancient temples, and going on pilgrimages. These journeys help me connect with both nature and culture.",
    showCarousel: true,
    images: travelImages,
  },
  {
    title: "Blogging",
    description: "Sharing insights about AI and technology, and documenting my learning journey in data science and machine learning.",
  },
];

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12"
    >
      <div className="max-w-4xl mx-auto space-y-12 px-4">
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
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = '/resume.pdf';
                    link.download = 'Sai_Tejasri_Resume.pdf';
                    link.click();
                  }, 100);
                }}
              >
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
        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Hobbies & Interests</h2>
          <div className="space-y-8">
            {hobbies.map((hobby, index) => (
              <motion.div
                key={hobby.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-4"
              >
                <div className="p-6 rounded-lg bg-card">
                  <h3 className="text-xl font-semibold mb-3">{hobby.title}</h3>
                  <p className="text-muted-foreground">{hobby.description}</p>

                  {hobby.showCarousel && (
                    <div className="mt-6">
                      <ImageCarousel images={hobby.images} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}