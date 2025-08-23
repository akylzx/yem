-- Create audit logs table for security tracking
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  action text not null,
  resource_type text,
  resource_id text,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  session_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.audit_logs enable row level security;

-- Users can only see their own audit logs
create policy "audit_logs_select_own"
  on public.audit_logs for select
  using (auth.uid() = user_id);

-- Only system can insert audit logs (via service role)
create policy "audit_logs_insert_system"
  on public.audit_logs for insert
  with check (false); -- Will be handled by triggers/functions

-- Admin can view all audit logs
create policy "audit_logs_admin_select_all"
  on public.audit_logs for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
