"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, createSession, destroySession } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    return { error: "Incorrect password." };
  }
  await createSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin");
}

export async function setStatus(
  id: string,
  status: "new" | "read" | "archived"
): Promise<void> {
  const supabase = getSupabaseAdmin();
  await supabase.from("contact_submissions").update({ status }).eq("id", id);
  revalidatePath("/admin");
}
