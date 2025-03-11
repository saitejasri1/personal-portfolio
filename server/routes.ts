import type { Express } from "express";
import { createServer, type Server } from "http";
import { contactFormSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const data = contactFormSchema.parse(req.body);
      // In a real app, we would send the email here
      res.json({ message: "Message sent successfully!" });
    } catch (error) {
      res.status(400).json({ message: "Invalid form data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}