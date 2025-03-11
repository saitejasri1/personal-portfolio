import { z } from "zod";

// User schema for authentication
export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  password: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const insertUserSchema = userSchema.omit({ id: true });
export type InsertUser = z.infer<typeof insertUserSchema>;

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export type ContactForm = z.infer<typeof contactFormSchema>;