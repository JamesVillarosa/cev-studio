-- ============================================================
--  cev.studio — database schema
--  Run once in the Supabase SQL Editor (Dashboard → SQL → New query).
-- ============================================================

create extension if not exists "pgcrypto";

create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  topic       text,
  message     text not null,
  status      text not null default 'new'
              check (status in ('new', 'read', 'archived'))
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

-- Row Level Security: lock the table down completely.
-- No anon/authenticated access. All reads and writes happen on the server
-- through the service_role key, which bypasses RLS. The browser never
-- touches this table directly.
alter table public.contact_submissions enable row level security;

-- (No policies are created on purpose — with RLS on and no policies,
--  anon and authenticated roles are fully denied.)
