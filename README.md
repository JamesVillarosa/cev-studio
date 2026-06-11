# cev.studio

A one-page landing site for a fictional digital agency — **cev.studio** — built as a focused, production-quality demo. The contact form is the hero: an elevated card sitting beside the headline, above the fold, backed by Supabase. A password-gated `/admin` dashboard lists and triages submissions.

**Live:** _(Vercel URL)_ · **Admin:** `/admin`

---

## Design

Light editorial direction — warm paper, near-black ink, one restrained accent.

- **The Dot.** The period in `cev.studio` is the brand's signature mark: a single accent-colored dot, reused as the availability indicator, list markers, focus states, and the favicon. Everything else stays ink-on-paper.
- **Type.** Instrument Serif (display) paired with Geist Sans (UI) and Geist Mono (labels, numerals, captions) for a Swiss/editorial feel.
- **Details.** Hairline rules, a subtle paper grain, scroll-reveal animations, an infinite marquee of disciplines, and a sticky header — all `prefers-reduced-motion` aware.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` tokens)
- **Supabase** (Postgres) for contact submissions
- **Zod** for shared client/server validation
- Deployed on **Vercel**

## How it works

```
Browser ──▶ Server Action (submitContact) ──▶ Supabase (service_role)
                     │
                     ├─ Zod validation (shared schema)
                     └─ Honeypot field for spam
```

- The contact form posts to a **Server Action** ([`app/actions.ts`](app/actions.ts)) — no public API route.
- Writes go through a **server-only** `service_role` client ([`lib/supabase.ts`](lib/supabase.ts)). The key never reaches the browser.
- The `contact_submissions` table is **fully RLS-locked** with no policies, so anon/authenticated roles are denied entirely. Only the server touches the data.
- `/admin` sits behind an **HMAC-signed session cookie** ([`lib/auth.ts`](lib/auth.ts)) — a single shared password, no session table.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev                  # http://localhost:3000
```

### 1. Supabase

Create a project, then run [`supabase/schema.sql`](supabase/schema.sql) in the **SQL Editor**. Copy the keys from **Project Settings → API** into `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### 2. Admin

```
ADMIN_PASSWORD=...                       # password for /admin
ADMIN_SESSION_SECRET=...                 # openssl rand -hex 32
```

## Project structure

```
app/
  page.tsx            Landing page composition
  actions.ts          Contact-form server action
  layout.tsx          Fonts + metadata
  globals.css         Design tokens + base styles
  icon.svg            Favicon ("the dot")
  admin/              Password-gated submissions dashboard
components/           Header, hero+form, services, approach, studio, CTA, footer
lib/
  supabase.ts         Server-only service_role client
  auth.ts             Signed-cookie admin session
  validation.ts       Shared Zod schema
supabase/schema.sql   Database schema (run once)
```

## Notes & trade-offs

- Auth is intentionally lightweight (shared password). A real deployment would use Supabase Auth with per-user roles.
- Submissions are read live (`force-dynamic`); at volume this would move to pagination + a search index.
- Social links and case studies are placeholders — the brief provided no assets, so copy and identity are written from scratch.
