"use server";

import { contactSchema } from "@/lib/validation";
import { getSupabaseAdmin } from "@/lib/supabase";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message" | "topic", string>>;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    topic: formData.get("topic") ?? "",
    message: formData.get("message"),
    company: formData.get("company") ?? "", // honeypot
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "name" || key === "email" || key === "message" || key === "topic") {
        errors[key] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
    };
  }

  // Silently accept honeypot hits so bots don't learn anything.
  if (parsed.data.company) {
    return { status: "success" };
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      topic: parsed.data.topic || null,
      message: parsed.data.message,
    });

    if (error) {
      console.error("[contact] insert failed:", error.message);
      return {
        status: "error",
        message:
          "Something went wrong on our end. Email hello@cev.studio and we'll fix it.",
      };
    }
  } catch (err) {
    console.error("[contact] unexpected:", err);
    return {
      status: "error",
      message:
        "Something went wrong on our end. Email hello@cev.studio and we'll fix it.",
    };
  }

  return { status: "success" };
}
