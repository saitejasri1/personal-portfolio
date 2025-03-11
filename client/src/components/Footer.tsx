import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { SiMedium } from "react-icons/si";

const socialLinks = [
  {
    href: "https://github.com/saitejasri1",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/saitejasri",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "mailto:ysaitejasrigrad@gmail.com",
    icon: Mail,
    label: "Email",
  },
  {
    href: "https://medium.com/@saitejasri10",
    icon: SiMedium,
    label: "Medium",
  },
];

export default function Footer() {
  return (
    <footer className="py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex justify-center gap-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-accent transition-colors"
                whileHover={{ scale: 1.1 }}
                initial={{ scale: 1 }}
              >
                <link.icon className="h-6 w-6" />
                <span className="sr-only">{link.label}</span>
              </motion.a>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sai Tejasri Yerramsetti. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}