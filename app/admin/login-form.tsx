"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginState } from "./actions";

const initial: LoginState = {};

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-lime mt-2 inline-flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold disabled:opacity-70"
    >
      {pending ? "Checking…" : "Enter"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(login, initial);

  return (
    <form
      action={formAction}
      className="w-full max-w-sm rounded-2xl border border-line bg-paper-card p-8 shadow-[var(--shadow-card)]"
    >
      <div className="mb-6">
        <span className="dot text-3xl leading-none">.</span>
        <h1 className="mt-3 font-display text-3xl text-ink">Studio admin</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Enter the password to view contact submissions.
        </p>
      </div>

      <label htmlFor="password" className="label block">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoFocus
        autoComplete="current-password"
        className="mt-2 w-full rounded-xl border border-line bg-paper/60 px-4 py-3 text-sm text-ink transition-colors focus:border-ink/40 focus:bg-paper-card focus:outline-none"
      />
      {state.error && (
        <p className="mt-2 font-mono text-[0.72rem] text-accent-ink">
          {state.error}
        </p>
      )}
      <Submit />
    </form>
  );
}
