import { z } from "zod";

/** Shared contact-form schema — used by the client form and the server action. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is a little long."),
  email: z
    .string()
    .trim()
    .min(1, "An email lets us reply.")
    .email("That email doesn't look right."),
  // Optional context chip — what the project is about.
  topic: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least a sentence.")
    .max(4000, "That's a lot. Trim it to the essentials and we'll talk."),
  // Honeypot — must stay empty. Bots fill it.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const PROJECT_TOPICS = [
  "Web Development",
  "Mobile App",
  "Brand Identity",
  "3D Modelling",
  "Not sure yet",
] as const;
