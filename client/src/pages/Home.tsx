import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ParticleBackground from "@/components/ParticleBackground";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative"
    >
      <ParticleBackground />
      
      <div className="text-center space-y-6 max-w-3xl mx-auto px-4">
        <motion.h1
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Sai Tejasri Yerramsetti
        </motion.h1>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground"
        >
          <TypeAnimation
            sequence={[
              "Data Scientist",
              1000,
              "AI Engineer",
              1000,
              "ML Enthusiast",
              1000,
            ]}
            repeat={Infinity}
          />
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Passionate about leveraging AI and machine learning to solve real-world problems.
          Experienced in developing innovative solutions using cutting-edge technologies.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/projects">
            <Button size="lg" className="text-lg">
              View My Work
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
