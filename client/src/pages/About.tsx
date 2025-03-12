import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import ImageCarousel from "@/components/ImageCarousel";

const cookingImages = [
  { src: "/images/20250130_203805.jpg", alt: "Grilling spicy chicken on a barbecue" },
  { src: "/images/IMG-20231111-WA0021.jpg", alt: "Colorful Indian street food platter" },
  { src: "/images/IMG-20240318_WA0016.jpg", alt: "Homemade manchurian dish" },
  { src: "/images/IMG-20240704-WA0010.jpeg", alt: "Delicious spicy food creation" },
];

const travelImages = [
  { src: "/images/WhatsApp Image 2025-03-11 at 16.16.22.jpeg", alt: "Serene temple architecture" },
  { src: "/images/WhatsApp Image 2025-03-11 at 16.16.23 (1).jpeg", alt: "Beautiful sunset at the beach" },
  { src: "/images/WhatsApp Image 2025-03-11 at 16.16.23.jpeg", alt: "Peaceful pilgrimage destination" },
];

const hobbies = [
  {
    title: "Blogging",
    description: "Recently started sharing my technical insights on Medium, focusing on topics like Rust programming, AI, and technology. Writing helps me document my learning journey and connect with the tech community.",
    showCarousel: false,
    images: [],
  },
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

                  {hobby.showCarousel && hobby.images && (
                    <div className="mt-6">
                      <ImageCarousel images={hobby.images} />
                    </div>
                  )}

                  {hobby.title === "Blogging" && (
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        asChild
                        className="hover:bg-primary/10"
                      >
                        <a
                          href="https://medium.com/@saitejasri10"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit My Medium Blog
                        </a>
                      </Button>
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