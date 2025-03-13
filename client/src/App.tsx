import { Switch, Route, useLocation } from "wouter";  
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import SpaceBackground from "@/components/SpaceBackground";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Experience from "@/pages/Experience";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  // ✅ Fix: Move useLocation inside the Router function
  const [location] = useLocation();
  const basePath = "/personal-portfolio";

  const customRoute = (path: string): string =>
    location.startsWith(basePath) ? path.replace(basePath, "") : path;

  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path={customRoute("/")} component={Home} />
        <Route path={customRoute("/about")} component={About} />
        <Route path={customRoute("/experience")} component={Experience} />
        <Route path={customRoute("/projects")} component={Projects} />
        <Route path={customRoute("/contact")} component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen bg-background/5 text-foreground relative flex flex-col">
          <SpaceBackground />
          <Navbar />
          <main className="container mx-auto px-4 pt-16 relative flex-grow z-10">
            <Router />
          </main>
          <Footer />
          <Toaster />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
