-- =============================================================================
-- VivaahStories.ByChidu — Full Supabase Schema
-- Run this entire file in: Supabase Dashboard → SQL Editor → Run
-- =============================================================================

-- Extensions
create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
-- Helper: admin check (profiles.role = admin OR admins table)
-- -----------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
  or exists (
    select 1 from public.admins a
    where a.user_id = auth.uid()
  );
$$;

-- -----------------------------------------------------------------------------
-- Profiles (extends auth.users)
-- -----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- Admins (explicit allowlist; sync with profiles.role = 'admin')
-- -----------------------------------------------------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- Bookings
-- -----------------------------------------------------------------------------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text not null,
  event_type text not null,
  event_date date not null,
  location text not null,
  message text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  user_id uuid references auth.users (id) on delete set null
);

create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_event_date_idx on public.bookings (event_date);
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);

-- -----------------------------------------------------------------------------
-- Gallery categories
-- -----------------------------------------------------------------------------
create table if not exists public.gallery_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- Galleries (portfolio images)
-- -----------------------------------------------------------------------------
create table if not exists public.galleries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  description text,
  alt_text text,
  image_url text not null,
  storage_path text,
  category_id uuid references public.gallery_categories (id) on delete set null,
  published boolean not null default false,
  featured boolean not null default false,
  sort_order int not null default 0,
  span text default 'default' check (span in ('default', 'tall', 'wide')),
  uploaded_by uuid references auth.users (id) on delete set null
);

create index if not exists galleries_published_idx on public.galleries (published);
create index if not exists galleries_category_idx on public.galleries (category_id);
create index if not exists galleries_sort_idx on public.galleries (sort_order);

-- -----------------------------------------------------------------------------
-- Contact inquiries
-- -----------------------------------------------------------------------------
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'replied', 'archived'))
);

create index if not exists contacts_status_idx on public.contacts (status);

-- -----------------------------------------------------------------------------
-- Updated_at trigger
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists bookings_updated_at on public.bookings;
create trigger bookings_updated_at
  before update on public.bookings
  for each row execute procedure public.set_updated_at();

drop trigger if exists gallery_categories_updated_at on public.gallery_categories;
create trigger gallery_categories_updated_at
  before update on public.gallery_categories
  for each row execute procedure public.set_updated_at();

drop trigger if exists galleries_updated_at on public.galleries;
create trigger galleries_updated_at
  before update on public.galleries
  for each row execute procedure public.set_updated_at();

-- -----------------------------------------------------------------------------
-- Auto-create profile on signup
-- -----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'user')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- -----------------------------------------------------------------------------
-- Seed gallery categories
-- -----------------------------------------------------------------------------
insert into public.gallery_categories (slug, name, sort_order) values
  ('wedding', 'Wedding', 1),
  ('pre-wedding', 'Pre Wedding', 2),
  ('engagement', 'Engagement', 3),
  ('maternity', 'Maternity', 4),
  ('baby-shower', 'Baby Shower', 5),
  ('baby-shoot', 'Baby Shoot', 6),
  ('birthday', 'Birthday', 7),
  ('traditional', 'Traditional', 8),
  ('cinematic', 'Cinematic', 9)
on conflict (slug) do nothing;

-- -----------------------------------------------------------------------------
-- Row Level Security
-- -----------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.admins enable row level security;
alter table public.bookings enable row level security;
alter table public.gallery_categories enable row level security;
alter table public.galleries enable row level security;
alter table public.contacts enable row level security;

-- Drop old policies if re-running
drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "bookings_insert_public" on public.bookings;
drop policy if exists "bookings_select_authenticated" on public.bookings;
drop policy if exists "bookings_update_admin" on public.bookings;
drop policy if exists "portfolio_admin_all" on public.portfolio_uploads;

-- Profiles
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id or public.is_admin());
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Admins (admin only)
create policy "admins_select_admin" on public.admins
  for select using (public.is_admin());
create policy "admins_insert_admin" on public.admins
  for insert with check (public.is_admin());
create policy "admins_delete_admin" on public.admins
  for delete using (public.is_admin());

-- Bookings: public insert; admin read/update
create policy "bookings_insert_public" on public.bookings
  for insert with check (true);
create policy "bookings_select_admin" on public.bookings
  for select using (public.is_admin());
create policy "bookings_update_admin" on public.bookings
  for update using (public.is_admin());
create policy "bookings_delete_admin" on public.bookings
  for delete using (public.is_admin());

-- Gallery categories: public read; admin write
create policy "categories_select_public" on public.gallery_categories
  for select using (true);
create policy "categories_insert_admin" on public.gallery_categories
  for insert with check (public.is_admin());
create policy "categories_update_admin" on public.gallery_categories
  for update using (public.is_admin());
create policy "categories_delete_admin" on public.gallery_categories
  for delete using (public.is_admin());

-- Galleries: public read published; admin full access
create policy "galleries_select_published" on public.galleries
  for select using (published = true or public.is_admin());
create policy "galleries_insert_admin" on public.galleries
  for insert with check (public.is_admin());
create policy "galleries_update_admin" on public.galleries
  for update using (public.is_admin());
create policy "galleries_delete_admin" on public.galleries
  for delete using (public.is_admin());

-- Contacts: public insert; admin read/update
create policy "contacts_insert_public" on public.contacts
  for insert with check (true);
create policy "contacts_select_admin" on public.contacts
  for select using (public.is_admin());
create policy "contacts_update_admin" on public.contacts
  for update using (public.is_admin());

-- -----------------------------------------------------------------------------
-- Storage bucket: gallery
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'gallery',
  'gallery',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- Storage policies
drop policy if exists "gallery_public_read" on storage.objects;
drop policy if exists "gallery_admin_insert" on storage.objects;
drop policy if exists "gallery_admin_update" on storage.objects;
drop policy if exists "gallery_admin_delete" on storage.objects;

create policy "gallery_public_read" on storage.objects
  for select using (bucket_id = 'gallery');

create policy "gallery_admin_insert" on storage.objects
  for insert with check (bucket_id = 'gallery' and public.is_admin());

create policy "gallery_admin_update" on storage.objects
  for update using (bucket_id = 'gallery' and public.is_admin());

create policy "gallery_admin_delete" on storage.objects
  for delete using (bucket_id = 'gallery' and public.is_admin());

-- Public: booked dates for calendar (no PII exposed)
create or replace function public.get_unavailable_dates()
returns setof date
language sql
stable
security definer
set search_path = public
as $$
  select distinct event_date from public.bookings
  where status in ('pending', 'confirmed')
    and event_date >= current_date;
$$;

grant execute on function public.get_unavailable_dates() to anon, authenticated;

-- -----------------------------------------------------------------------------
-- PROMOTE YOUR ACCOUNT TO ADMIN (replace email after signup):
-- update public.profiles set role = 'admin' where email = 'vivaahstoriesbychidu@gmail.com';
-- insert into public.admins (user_id, email)
-- select id, email from auth.users where email = 'vivaahstoriesbychidu@gmail.com'
-- on conflict do nothing;
