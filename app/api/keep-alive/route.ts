import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

/**
 * Keep-alive ping.
 *
 * Supabase free-tier projects auto-pause after ~7 days with no activity,
 * which silently breaks the contact form and the admin dashboard. A Vercel
 * Cron Job hits this route a couple of times a week (see vercel.json) to run
 * one trivial query and keep the database awake.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("contact_submissions")
      .select("id", { count: "exact", head: true });

    if (error) {
      console.error("[keep-alive] query failed:", error.message);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, ts: new Date().toISOString() });
  } catch (err) {
    console.error("[keep-alive] unexpected:", err);
    return NextResponse.json(
      { ok: false, error: "Supabase unreachable or unconfigured." },
      { status: 500 }
    );
  }
}
