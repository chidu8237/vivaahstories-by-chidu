# Supabase Setup — VivaahStories.ByChidu

Follow these steps in order to fix the `bookings` table error, enable auth emails, and power the admin gallery.

## 1. Create project & env vars

Copy `.env.example` to `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Restart the dev server after any env change.

## 2. Run database schema

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project → **SQL Editor**
2. Paste the full contents of `supabase/schema.sql`
3. Click **Run**

This creates:

- `profiles`, `admins`, `bookings`, `gallery_categories`, `galleries`, `contacts`
- RLS policies, storage bucket `gallery`, seed categories
- `get_unavailable_dates()` for the booking calendar

## 3. Promote your account to admin

After you register once with `vivaahstoriesbychidu@gmail.com`, run in SQL Editor:

```sql
update public.profiles set role = 'admin'
where email = 'vivaahstoriesbychidu@gmail.com';

insert into public.admins (user_id, email)
select id, email from auth.users
where email = 'vivaahstoriesbychidu@gmail.com'
on conflict (user_id) do nothing;
```

## 4. Authentication URL configuration

**Authentication → URL Configuration**

| Setting | Value |
|--------|--------|
| Site URL | `http://localhost:3000` (or production URL) |
| Redirect URLs | `http://localhost:3000/auth/callback` |
| | `http://localhost:3000/**` |
| | `https://your-domain.com/auth/callback` |
| | `https://your-domain.com/**` |

**Authentication → Providers → Email**

- Enable Email provider
- Turn **Confirm email** ON for production (recommended)
- Set minimum password length to 8

## 5. Fix emails not arriving

Supabase’s built-in SMTP is rate-limited and often lands in spam. For reliable delivery:

### Option A — Custom SMTP (recommended)

**Project Settings → Authentication → SMTP Settings**

Use one of:

- [Resend](https://resend.com) — `smtp.resend.com`, port 465, your API key as password
- [SendGrid](https://sendgrid.com)
- Gmail App Password (testing only)

Set **Sender email** to `vivaahstoriesbychidu@gmail.com` (or a verified domain).

### Option B — Resend via Supabase integration

Use Resend’s Supabase docs to connect API keys.

### After SMTP is configured

1. **Authentication → Email Templates** — ensure “Confirm signup” link uses `{{ .ConfirmationURL }}`
2. Test signup → check inbox and spam
3. Use **Resend verification email** on the register page if needed

## 6. Storage

Schema creates public bucket `gallery`. Verify under **Storage → gallery** that it exists and is **public**.

## 7. Test the full flow

1. `npm run dev`
2. Register → verify email → land on `/`
3. Login → `/dashboard` (admin only)
4. **Uploads** → upload image → **Publish** → open `/portfolio` (image appears)
5. **Categories** → add/reorder categories
6. **Bookings** → submit form on `/booking`
7. **Contacts** → submit `/contact` form

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `bookings` table not found | Re-run `schema.sql` |
| Dashboard redirects to home | Set `profiles.role = 'admin'` |
| Upload fails | Check storage bucket + admin role |
| Images not on portfolio | Click **Publish** on upload |
| Emails not sent | Configure custom SMTP |
| Invalid redirect path | Match Site URL + Redirect URLs exactly |
