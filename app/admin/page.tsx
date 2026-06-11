import type { Metadata } from "next";
import Link from "next/link";
import { isAuthed } from "@/lib/auth";
import { getSupabaseAdmin, type ContactSubmission } from "@/lib/supabase";
import { LoginForm } from "./login-form";
import { changeStatus, logout } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Always render fresh — this is an internal dashboard.
export const dynamic = "force-dynamic";

type Filter = "all" | "new" | "read" | "archived";
const FILTERS: Filter[] = ["all", "new", "read", "archived"];

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  if (!(await isAuthed())) {
    return (
      <main className="relative z-10 flex min-h-dvh items-center justify-center px-6 py-20">
        <LoginForm />
      </main>
    );
  }

  const { status } = await searchParams;
  const filter: Filter = FILTERS.includes(status as Filter)
    ? (status as Filter)
    : "all";

  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });
  if (filter !== "all") query = query.eq("status", filter);

  const { data, error } = await query;
  const rows = (data ?? []) as ContactSubmission[];

  // Counts for the filter tabs (separate lightweight query).
  const { data: allRows } = await supabase
    .from("contact_submissions")
    .select("status");
  const counts = {
    all: allRows?.length ?? 0,
    new: allRows?.filter((r) => r.status === "new").length ?? 0,
    read: allRows?.filter((r) => r.status === "read").length ?? 0,
    archived: allRows?.filter((r) => r.status === "archived").length ?? 0,
  };

  return (
    <main className="relative z-10 mx-auto min-h-dvh max-w-6xl px-6 py-10 lg:px-10">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <Link
            href="/"
            className="label transition-colors hover:text-ink"
          >
            ← cev<span className="dot">.</span>studio
          </Link>
          <h1 className="mt-2 font-display text-4xl text-ink">Submissions</h1>
        </div>
        <form action={logout}>
          <button className="rounded-full border border-line px-4 py-2 text-sm text-ink-muted transition-colors hover:border-line-strong hover:text-ink">
            Sign out
          </button>
        </form>
      </header>

      {error ? (
        <SetupNotice message={error.message} />
      ) : (
        <>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => (
              <Link
                key={f}
                href={f === "all" ? "/admin" : `/admin?status=${f}`}
                className={`rounded-full border px-4 py-1.5 text-sm capitalize transition-colors ${
                  filter === f
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink-muted hover:border-line-strong hover:text-ink"
                }`}
              >
                {f}{" "}
                <span
                  className={
                    filter === f ? "text-paper/60" : "text-ink-faint"
                  }
                >
                  {counts[f]}
                </span>
              </Link>
            ))}
          </div>

          {rows.length === 0 ? (
            <p className="mt-16 text-center font-mono text-sm text-ink-faint">
              No {filter === "all" ? "" : filter} submissions yet.
            </p>
          ) : (
            <ul className="mt-6 space-y-3">
              {rows.map((row) => (
                <SubmissionCard key={row.id} row={row} />
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}

function SubmissionCard({ row }: { row: ContactSubmission }) {
  const date = new Date(row.created_at).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <li className="rounded-2xl border border-line bg-paper-card p-6 transition-shadow hover:shadow-[var(--shadow-card)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-medium text-ink">{row.name}</h2>
            <StatusPill status={row.status} />
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.72rem] text-ink-faint">
            <a
              href={`mailto:${row.email}`}
              className="link-underline text-ink-muted"
            >
              {row.email}
            </a>
            {row.topic && (
              <>
                <span aria-hidden>·</span>
                <span className="dot">{row.topic}</span>
              </>
            )}
            <span aria-hidden>·</span>
            <span>{date}</span>
          </div>
        </div>

        <div className="flex gap-1.5">
          <StatusButton id={row.id} to="read" current={row.status} label="Read" />
          <StatusButton
            id={row.id}
            to="archived"
            current={row.status}
            label="Archive"
          />
          <StatusButton id={row.id} to="new" current={row.status} label="Reopen" />
        </div>
      </div>

      <p className="mt-4 whitespace-pre-wrap text-[0.95rem] leading-relaxed text-ink-muted">
        {row.message}
      </p>
    </li>
  );
}

function StatusButton({
  id,
  to,
  current,
  label,
}: {
  id: string;
  to: ContactSubmission["status"];
  current: ContactSubmission["status"];
  label: string;
}) {
  if (current === to) return null;
  return (
    <form action={changeStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={to} />
      <button className="rounded-full border border-line px-3 py-1 font-mono text-[0.68rem] uppercase tracking-wide text-ink-faint transition-colors hover:border-ink/40 hover:text-ink">
        {label}
      </button>
    </form>
  );
}

function StatusPill({ status }: { status: ContactSubmission["status"] }) {
  const styles: Record<ContactSubmission["status"], string> = {
    new: "border-accent/40 text-accent-ink",
    read: "border-line-strong text-ink-muted",
    archived: "border-line text-ink-faint",
  };
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function SetupNotice({ message }: { message: string }) {
  return (
    <div className="mt-10 rounded-2xl border border-accent/30 bg-accent/5 p-8">
      <h2 className="font-display text-2xl text-ink">Database not set up yet</h2>
      <p className="mt-3 max-w-xl text-sm text-ink-muted">
        The <code className="font-mono">contact_submissions</code> table
        couldn&apos;t be reached. Run{" "}
        <code className="font-mono">supabase/schema.sql</code> in the Supabase
        SQL Editor, then refresh.
      </p>
      <p className="mt-3 font-mono text-[0.72rem] text-ink-faint">{message}</p>
    </div>
  );
}
