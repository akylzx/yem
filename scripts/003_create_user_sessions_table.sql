-- Create user sessions table for session management
create table if not exists public.user_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  session_token text unique not null,
  device_info jsonb,
  ip_address inet,
  location jsonb,
  is_active boolean default true,
  last_activity timestamp with time zone default timezone('utc'::text, now()),
  expires_at timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.user_sessions enable row level security;

-- Users can only see their own sessions
create policy "user_sessions_select_own"
  on public.user_sessions for select
  using (auth.uid() = user_id);

-- Users can update their own sessions (for logout)
create policy "user_sessions_update_own"
  on public.user_sessions for update
  using (auth.uid() = user_id);

-- Admin can view all sessions
create policy "user_sessions_admin_select_all"
  on public.user_sessions for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
