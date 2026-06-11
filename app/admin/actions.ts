"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, createSession, destroySession, isAuthed } from "@/lib/auth";
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

const STATUSES = ["new", "read", "archived"] as const;
type Status = (typeof STATUSES)[number];

/** Form-driven status update (id + status come from hidden inputs). */
export async function changeStatus(formData: FormData): Promise<void> {
  if (!(await isAuthed())) return;

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !STATUSES.includes(status as Status)) return;

  const supabase = getSupabaseAdmin();
  await supabase
    .from("contact_submissions")
    .update({ status })
    .eq("id", id);

  revalidatePath("/admin");
}
