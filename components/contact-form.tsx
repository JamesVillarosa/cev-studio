"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/app/actions";
import { PROJECT_TOPICS } from "@/lib/validation";

const initial: ContactState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-lime group relative mt-2 inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl text-[0.95rem] font-semibold disabled:cursor-not-allowed disabled:opacity-70"
    >
      <span
        className={`flex items-center gap-2 transition-all duration-300 ${
          pending ? "opacity-0" : "opacity-100"
        }`}
      >
        Send message
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </span>
      {pending && (
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-[#1d1d1d]">
          <Spinner />
          Sending
        </span>
      )}
    </button>
  );
}

function Spinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-[1.5px] border-[#1d1d1d]/30 border-t-[#1d1d1d]" />
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 font-mono text-[0.7rem] text-accent-ink">{msg}</p>;
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initial);
  const [topic, setTopic] = useState<string>("");

  if (state.status === "success") {
    return (
      <div className="flex min-h-[28rem] flex-col items-start justify-center gap-5 rounded-2xl border border-line bg-paper-card p-8 shadow-[var(--shadow-card)] sm:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line">
          <span className="dot text-3xl leading-none">.</span>
        </span>
        <div>
          <h3 className="font-display text-3xl text-ink">Message received.</h3>
          <p className="mt-3 max-w-sm text-ink-muted">
            Thanks for reaching out. We read everything ourselves and reply
            within one business day — usually sooner. Keep an eye on your inbox.
          </p>
        </div>
        <a
          href="#top"
          className="link-underline mt-2 text-sm font-medium text-ink"
        >
          Back to top
        </a>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      className="rounded-2xl border border-line bg-paper-card p-6 shadow-[var(--shadow-card)] transition-shadow duration-500 hover:shadow-[var(--shadow-card-hover)] sm:p-8"
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-display text-2xl text-ink sm:text-[1.7rem]">
          Start a project
        </h3>
        <span className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-faint">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Open Q3
        </span>
      </div>

      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Name"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            error={state.errors?.name}
          />
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            error={state.errors?.email}
          />
        </div>

        <div>
          <span className="label">What's it about?</span>
          <input type="hidden" name="topic" value={topic} />
          <div className="mt-2 flex flex-wrap gap-2">
            {PROJECT_TOPICS.map((t) => {
              const active = topic === t;
              return (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTopic(active ? "" : t)}
                  className={`rounded-full border px-3 py-1.5 text-[0.8rem] transition-all duration-200 ${
                    active
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-transparent text-ink-muted hover:border-line-strong hover:text-ink"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="label block"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="A few lines on what you're building, your timeline, and roughly the budget you have in mind."
            className="mt-2 w-full resize-none rounded-xl border border-line bg-paper/60 px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-faint/70 transition-colors duration-200 focus:border-ink/40 focus:bg-paper-card focus:outline-none"
          />
          <FieldError msg={state.errors?.message} />
        </div>

        {/* Honeypot — visually hidden, off-screen, not announced */}
        <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label>
            Company
            <input name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <SubmitButton />

        {state.status === "error" && state.message && (
          <p className="text-center font-mono text-[0.72rem] text-accent-ink">
            {state.message}
          </p>
        )}

        <p className="text-center text-[0.72rem] text-ink-faint">
          Prefer email?{" "}
          <a href="mailto:hello@cev.studio" className="link-underline text-ink-muted">
            hello@cev.studio
          </a>
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="label block">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-xl border border-line bg-paper/60 px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-faint/70 transition-colors duration-200 focus:border-ink/40 focus:bg-paper-card focus:outline-none"
      />
      <FieldError msg={error} />
    </div>
  );
}
