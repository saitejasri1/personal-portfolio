import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sai Tejasri Yerramsetti. All rights reserved.
        </div>
      </div>
    </footer>
  );
}